# NJ Node API

## Setup

I recommend using [Insomnia](https://insomnia.rest/) to handle your rest API calls.

### Initial Setup

1. Run `npm install`
1. Run `cp .env.example .env`
1. Running the app uses `npm` for the app itself, and docker for the database.
   1. Create a folder in the root directory called 'postgres-data' (`mkdir postgres-data`)
   1. Run `docker-compose up` to build the postgresql connection.
   1. Run the migrations (see below).
   1. Run `npm run dev` to start the app.
   1. Go to `http://localhost:3002` to see the app.
       1. The credentials from docker are the ones filled in in the `.env.example`, so the database connection should work immediately.
1. Import the insomnia_endpoints.yaml into Insomnia for a list of endpoints.
   1. Update the environment with the bearer token obtained by the login endpoint.

### Migrations

1. Run `npx knex migrate:latest` to migrate the database tables.
1. Run `npx knex seed:run` to obtain users and movies.

### Authentication

1. _Ensure migrations have been run!_
1. Go to the login endpoint (`/api/login`) with the body:

   ```json
   {
     "email": "nj1@test.com",
     "password": "123456"
   }
   ```

1. Copy the returned JWT and use this as your Bearer token for any queries requiring authentication.
