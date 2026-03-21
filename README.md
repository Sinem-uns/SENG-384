# SENG 384 Docker Assignment

A full-stack web application built using React, Express.js, and PostgreSQL, fully containerized using Docker and Docker Compose.

## Architecture

This project consists of 3 Docker containers running the following technologies:
- **Frontend**: React (Vite) served via Nginx (Port 3000)
- **Backend**: Express.js REST API with Node.js (Port 5000)
- **Database**: PostgreSQL 15 Database (Port 5432)

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop).

## How to Run the Project

1. Clone this repository to your local machine:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd <PROJECT_FOLDER>
   ```

2. Bring up the entire system with a single command:
   ```bash
   docker compose up --build
   ```
   > Note: The `--build` flag ensures that the latest code changes are built into the images. If you run it again later without changes, you can just use `docker compose up`.

3. Access the Application:
   - **Frontend**: Open `http://localhost:3000` in your web browser.
   - **Backend API**: View the raw JSON data at `http://localhost:5000/api/users`.

4. Stopping the system:
   Press `Ctrl+C` in the terminal where it is running, or run:
   ```bash
   docker compose down
   ```

## Screenshots

> *Student Note: Add your screenshot images here before submission (e.g., `![Frontend View](screenshots/frontend.png)`).*

- **Frontend UI showing connected users**: 
  *(Replace this text with a screenshot of localhost:3000)*

- **Terminal showing containers running**:
  *(Replace this text with a screenshot of the output from `docker compose ps`)*

## Notes for Evaluator

- The PostgreSQL database is automatically seeded using the `init.sql` script on the first run.
- The React frontend uses a multi-stage Dockerfile to build static assets and serve them via Nginx for optimal performance.
- The Express backend awaits for the PostgreSQL container to pass health checks before starting up fully, ensuring no connection crashes upon startup.
