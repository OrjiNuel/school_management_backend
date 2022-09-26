# school_management_backend

Backend api service for a school management system

## Tech Stack

**Server:** Node (V16 recommended), Express

**Language:** Typescript

**Database:** PostgreSql

**EndPoint Type:** REST

**ORM:** TypeOrm cli

**Package Manager:** Yarn


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DATABASE_URL`

`JWT_SECRET`

`NODE_ENV`

`CORS_ORIGIN`


## Installation

- Install dependencies with yarn by running the command below

```bash
  yarn
```

- Set up your postgres database if you haven't. Steps are in the link below
    https://www.postgresql.org/docs/

-   Create a database schema preferrably for consistency sake with the name `picondb_local`
-   Input your database url in your env file as 
    DATABASE_URL= `postgresql://<username>:<password>@localhost:5432/<database_schema_name>`
    
    Note: Postgres default port is 5432 and username is postgres, so if any of this are changed in your machine, make due adjustments.

-   Now open a terminal and run the following command to watch your codebase for changes then compile the typescript code into a javascript distributable.
    ```bash
        yarn watch
    ```

-   Now open another terminal and run the following command to run your code
    ```bash
        yarn dev
    ```
-   Also for code consistency install the following vscode extensions
    -   ESLint
    -   Prettier ESLint
    -   Prettier

#### Note: There is a precommit check for code quality via Husky so make sure those extensions are available
