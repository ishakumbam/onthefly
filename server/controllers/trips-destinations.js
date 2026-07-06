import { pool } from '../config/database.js'

const TripsDestinationsController = {
  getTripsDestinations: async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM trips_destinations ORDER BY trip_id')
      res.json(result.rows)
    } catch (error) {
      console.error('⚠️ error fetching trips_destinations', error)
      res.status(500).json({ error: 'Failed to fetch trips_destinations' })
    }
  },

  getAllTrips: async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT t.* FROM trips_destinations td
         JOIN trips t ON td.trip_id = t.id
         WHERE td.destination_id = $1`,
        [req.params.destination_id]
      )
      res.json(result.rows)
    } catch (error) {
      console.error('⚠️ error fetching trips for destination', error)
      res.status(500).json({ error: 'Failed to fetch trips for destination' })
    }
  },

  getAllDestinations: async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT d.* FROM trips_destinations td
         JOIN destinations d ON td.destination_id = d.id
         WHERE td.trip_id = $1`,
        [req.params.trip_id]
      )
      res.json(result.rows)
    } catch (error) {
      console.error('⚠️ error fetching destinations for trip', error)
      res.status(500).json({ error: 'Failed to fetch destinations for trip' })
    }
  },

  createTripDestination: async (req, res) => {
    try {
      const { trip_id, destination_id } = req.body

      const result = await pool.query(
        `INSERT INTO trips_destinations (trip_id, destination_id)
         VALUES ($1, $2)
         RETURNING *`,
        [trip_id, destination_id]
      )

      res.status(201).json(result.rows[0])
    } catch (error) {
      console.error('⚠️ error creating trip destination', error)
      res.status(500).json({ error: 'Failed to create trip destination' })
    }
  }
}

export default TripsDestinationsController
