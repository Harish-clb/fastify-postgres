# Fastify Postgres

This project is a Fastify application that uses Prisma and Postgres as the database. It includes two tables: `users` and `jokes`. The data is seeded using Prisma and the application can be run using Docker Compose.

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js https://nodejs.org/en
- Docker https://www.docker.com/
- Docker Compose https://docs.docker.com/compose/

If you don't have these installed, please refer to their respective documentation for installation instructions.

## Installation

1. Clone the repository.
2. Install the dependencies using `npm install`.

## Usage

1. Make sure that the docker is running & start the Postgres and Fastify app using Docker 


The Fastify application depends on a Postgres database, which is managed using Docker Compose. Docker Compose allows you to define and run multi-container Docker applications.

The `docker-compose.yml` file in the project root directory defines the services and their configurations. It includes the `postgres` service for the database and the `app` service for the Fastify application.

By using Docker Compose, you can easily start and stop the entire application stack with a single command. Additionally, Docker Compose volumes are used to persist the data, ensuring that it is not lost when the containers are stopped/removed or restarted.

To start both postgres and fastify app, you can run the following command:

```
docker-compose up --build -d
```

Without --build, if image already exists, it won't get rebuilt. So in such cases where you dont want image to be rebulit as you have no changes, you can just use the following command omitting build

```
docker-compose up -d
```

This will build the images and runs the containers in detached mode (in the background).

Once the containers are up and running, you should be able to access via port forwarding specified in docker-compose.

`http://localhost:5000`.

Please note that if you are facing issues accessing the application via `localhost` on a Mac, you can uncomment the line in the `main.ts` file that sets the host to `0.0.0.0`.

To stop and remove the containers, run below command

```
docker-compose down
```

Above command will preserve volume, but if you want to remove volumes too, use below command

```
docker-compose down -v
```

2. Access the API documentation at `http://localhost:5000/docs`.

## Project Structure

- `schemas`: Contains the database schema files.
- `routes`: Contains the route handlers for the API endpoints.
- `models`: Contains the types for routes.
- `prisma`: Contains the prisma models, migration scripts and seed data.

## Prisma migrations

Whenever you have changes in prisma schema.ts file, run

```
npx prisma migrate
```

This command ensures that your database structure is synchronized with the prisma schema. This creates a new migration file in `migrations` directory and applies it your DB.

Make sure to update `seed.ts` file too if neccessary !

## API Endpoints

- `GET /users`: Retrieves all users.
- `GET /users/:id`: Retrieves a user record by ID.
- `GET /jokes`: Retrieves all jokes.
- `GET /jokes/:id`: Retrieves a joke record by ID.

## Environment Variables

Make sure to update the environment variables in the `.env` file to match your configuration.

Copy .env.template to .env and update the environment variables

## Run only fastify app from local

Run the Postgres service alone using Docker Compose: 

`docker-compose up -d postgres`

Update the DATABASE_URL environment variable in the .env file to use `localhost` as the host.

Start the Fastify app in development mode using 
`npm run seed:dev` 
to seed the data and then start the application.

To access the application, open your web browser or api client of your choice

`http://localhost:5000`.

I have just kept GET endpoints, feel free to try out other CRUD operations and explore the functionality!

## Screenshots

Here are some screenshots:

**Screenshot 1: Docker Desktop**

![Docker-Desktop](/screenshots/docker-desktop.png)

**Screenshot 2: API Documentation**

![Docs](/screenshots/docs.png)

**Screenshot 3: Get all Jokes**

![Get all Jokes](/screenshots/jokes.png)
