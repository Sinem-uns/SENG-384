# SENG 384 Docker Assignment: Team Dashboard
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
