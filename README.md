## NJ Node API

_Note: This repository is a work in progress._

1. Run `npm install`
1. Run `cp .env.example .env`
1. Running the app uses `npm` for the app itself, and docker for the database.
    1. Create a folder in the root directory called 'postgres-data' (`mkdir postgres-data`)
    1. Run `docker-compose up` to build the postgresql connection.
    1. Create a database called `nathanjms_api`.
    1. Run the migrations (see below).
    1. Go to `http://localhost:3002` to see the app.
    1. The credentials from docker are the ones filled in in the `.env.example`, so the database connection should work immediately.

I recommend using [Insomnia](https://insomnia.rest/) to handle your rest API calls.

### Migrations [WIP]

- Run `npx knex migrate:up` to migrate the database.
- TODO: DB seeding with `npx knex seed:run`
    - See: [Guide](https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261)