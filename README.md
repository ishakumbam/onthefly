# OnTheFly

A simple Express + PostgreSQL API for trip data.

<div>
    <a href="https://www.loom.com/share/c0618b2c9c504e6a90d0d388628951ed">
      <p>Lab 5 Walkthrough  - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/c0618b2c9c504e6a90d0d388628951ed">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/c0618b2c9c504e6a90d0d388628951ed-7ff5614bbf74e734-full-play.gif#t=0.1">
    </a>
  </div>

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
