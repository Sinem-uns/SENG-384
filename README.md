# SENG 384 Docker Assignment: Team Dashboard

## Project Description
This project implements the required person management CRUD system and extends it with an optional `role` field to create a **Team Dashboard**. It allows you to register, view, update, and delete team members. 

The application architecture relies on:
- **Frontend**: React (Vite) with React Router, offering dedicated Form (`/`) and List (`/people`) pages.
- **Backend**: Express.js REST API with Node.js featuring robust validation (e.g. email regex).
- **Database**: PostgreSQL 15 Database managing state and constraints.

Everything is fully containerized using Docker and Docker Compose for easy deployment and testing.

> **Design Choice (Update Flow):** 
> The application uses a unified editing flow. Clicking the *Edit* button on the People List redirects the user to the Form page with the selected record's values prefilled. This ensures a consistent interface for creating and updating data.

## Screenshots
Please refer to the `screenshot` folder in this repository to view images of the application in action. Ensure your folder contains screenshots demonstrating:
1. The **Create Member** form and success message.
2. The **People List** table.
3. The **Update** functionality with pre-filled forms / changed records.
4. The **Delete Confirmation** popup and the list updating afterward.
5. The **Docker Desktop** running containers.

## Architecture

This project consists of 3 Docker containers running the following technologies:
- **Frontend**: React (Vite) served via Nginx. (Mapped to external port `3000`)
- **Backend**: Express.js REST API with Node.js. (Mapped to external port `5001`)
- **Database**: PostgreSQL 15 Database. (Mapped to external port `5433`)

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/).

## How to Run the Project

1. Clone this repository:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd <PROJECT_FOLDER>
   ```

2. Configure Environment Variables:
   Copy the `.env.example` file to create your local `.env` configuration file. Do NOT commit the `.env` file to your repository.
   ```bash
   cp .env.example .env
   ```

3. Start the Application:
   Run the following command in the root directory:
   ```bash
   docker compose up --build -d
   ```
   > The `--build` flag ensures your latest configuration and codebase changes are utilized.

4. Access the Application Ports:
   - **Frontend UI**: `http://localhost:3000`
   - **Backend API Base Path**: `http://localhost:5001/api`

5. Stopping the system:
   ```bash
   docker compose down
   ```

## API Endpoint Documentation

The Backend Express API handles CRUD operations internally at base path `/api`.

| Method | Endpoint | Description | Status Statuses |
|--------|----------|-------------|-----------------|
| **GET** | `/api/people` | Retrieves a list of all team members. | `200 OK`, `500 Internal Error` |
| **GET** | `/api/people/:id` | Retrieves a single specific team member by ID. | `200 OK`, `404 Not Found` |
| **POST** | `/api/people` | Creates a new team member. Requires valid `full_name` and regex-validated `email`. | `201 Created`, `400 Bad Request`, `409 Conflict` |
| **PUT** | `/api/people/:id` | Updates an existing member. Requires valid `full_name` and regex-validated `email`. | `200 OK`, `400 Bad Request`, `404 Not Found`, `409 Conflict` |
| **DELETE**| `/api/people/:id` | Deletes the team member with the specified ID. | `204 No Content`, `404 Not Found` |

### Error Response Example
When validation fails or a resource is not found, the API returns a structured JSON error:
```json
{
  "error": "Valid full name and email are required"
}
```
