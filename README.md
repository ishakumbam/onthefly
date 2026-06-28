# OnTheFly

A simple Express + PostgreSQL API for trip data.

## Features
- REST endpoints for trips
- PostgreSQL connection with environment-based configuration
- Reset script to recreate the database tables and seed trip data

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create an environment file:
   ```bash
   cp server/.env.example server/.env
   ```
   Then update the values for your PostgreSQL database.

## Run
- Start the server:
  ```bash
  npm start
  ```
- Reset the database tables and seed trips:
  ```bash
  npm run reset
  ```

## Environment variables
The app expects the following variables in `server/.env`:
- `PGHOST`
- `PGPORT`
- `PGUSER`
- `PGPASSWORD`
- `PGDATABASE`
- `PGSSL` (optional)
