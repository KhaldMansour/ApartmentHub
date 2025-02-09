# ApartmentHub

This is a full-stack application that allows users to view a list of apartments, see details about each apartment, and add new apartments. The application is built using Node.js (NestJs)(TypeScript) for the backend and Next.js for the frontend, with a relational database (MySql) to store the apartment data. The application is containerized with Docker and Docker Compose for easy deployment.

## Features
- **Backend API** (NestJS):
  - `GET /api/v1/apartments`: List all apartments.
  - `GET /api/v1/apartments/{id}`: Get details of a specific apartment.
  - `POST /api/v1/apartments`: Add a new apartment.
  - `PUT /api/v1/apartments/{id}`: Update an apartment.
  - **Swagger Documentation**: Interactive API documentation generated with Swagger for easy exploration of API endpoints  at `http://localhost:4000/api/docs`.

- **Frontend Application** (Next.js):
  - `Apartment Listing Page`: Displays a list of apartments at `http://localhost:3000/apartments`.
  - `Apartment Details Page`: Shows detailed information about a specific apartment at `http://localhost:3000/apartments/{id}`.

- **Search & Filter Functionality** (Bonus Task):
  - Search apartments by name, unit number, or project on the listing page.

- **Database**:
  - **MySQL** as the relational database.
  - **Indexing**: Added indexing to the columns frequently used in search queries to improve performance (e.g., `name`, `number`, and `project`).
  - **Seeder**: A database seeder is included to populate the database with sample apartment data for easier testing and development.

- **Code Quality**:
  - **Linting**: Static code analysis using ESLint has been integrated into the project to enforce clean and maintainable code.

## Requirements
- Docker and Docker Compose must be installed on your system.

## Installation

### 1. Clone the repository
Clone the repository to your local machine:

```bash
git clone git@github.com:KhaldMansour/ApartmentHub.git
```

```bash
cd apartment-hub
```

### 2. Docker Setup
For both backend and frontend, run the following:

# Run Docker compose
```
docker-compose up --build
```

This command will:
- Build the Docker images for both the frontend and backend.
- Set up the database as configured.
- Start all services.

#### Access the Application
- **Frontend**: Open your browser and go to `http://localhost:3000` to view the apartment listing page.
- **Backend**: The backend API will be accessible at `http://localhost:4000`.

## Bonus Task: Search and Filter
On the apartment listing page, users can search by:
- Apartment Name
- Apartment Number
- Project Name

The search functionality allows users to filter apartments based on the specified criteria.


