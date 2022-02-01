## NJ Node API

_Note: This repository is a work in progress._

1. Run `npm install`
1. Run `cp .env.example .env`
1. Running the app can be done two different ways, Docker or npm. Both ways currently initially require npm on your system to do the initial install step (but this could potentially also be done with a node container on docker).
    - Docker (Recommended)
        1. Create a folder in the root directory called 'postgres-data' (`mkdir postgres-data`)
        1. Run `docker-compose up` to build the postgresql connection, as well as running the node on port 80.
        1. Create a database called `nathanjms_api`.
        1. Run the `base_new.sql` file in this database.
        1. Go to `http://localhost` to see the app.
        1. The credentials from docker are the ones filled in in the `.env.example`, so the database connection should work immediately.
    - NPM
        1. Create a postgresql connection (via DBngin \[Mac\], or otherwise)
        1. Create a database called `nathanjms_api`.
        1. Run the `base_new.sql` file in this database.
        1. Run `npm start` to start the app on port 3000 (by default).
        1. Go to `http://localhost:3000` to see the app.
        1. Add the database credentials to the `.env` file

I recommend using [Insomnia](https://insomnia.rest/) to handle your rest API calls.