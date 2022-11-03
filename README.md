# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
# Environment Variables

It belongs to .env file of project

> - PORT=3000
> - PGHOST=localhost
> - PGUSER=DB_user_name
> - PGPASSWORD=lol
> - PGDATABASE=storefront
> - PGDATABASE_TEST=storefront_test
> - PEPER=my_last_and_only_chance_that_i_can_get
> - SALT=12
> - JWT_SECRET=my-super-secret-password-and-dont
> - EXPIRES_IN=30d
> - ENV=dev

# Database Setup

### Create Database

we shell create the dev and test database

- Connect to default postgres database as server's root user psql -U postgres
- In psql run the following command to create the user
- - create user samaksh with password 'lol' login;
- In psql run the following command to create the databases
- - create database storefront;
- - create database storefront_test;
- Grant all privileges on created databases to user samaksh with the following command
- - grant all privileges on database storefront to samaksh;
- - grant all privileges on database storefront_test to samaksh;

# Running the app

### Install all npm packages

- npm install or yarn add

### After that run the following command to start app in development mode

- npm run watch
# Running the migrations
## Run the following command to create tables described in the migrations
- npx db-migrate up

## Ports
The application runs on port `3000` with database on `5432`. 

## Running the unit tests

Use the following command to run the unit tests:
```bash
npm test
```

## Endpoint Access
All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file.