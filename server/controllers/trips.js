import { pool } from '../config/database.js'

const TripsController = {
  getTrips: async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM trips ORDER BY id')
      res.json(result.rows)
    } catch (error) {
      console.error('⚠️ error fetching trips', error)
      res.status(500).json({ error: 'Failed to fetch trips' })
    }
  },

  getTrip: async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM trips WHERE id = $1', [req.params.id])

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Trip not found' })
      }

      res.json(result.rows[0])
    } catch (error) {
      console.error('⚠️ error fetching trip', error)
      res.status(500).json({ error: 'Failed to fetch trip' })
    }
  },

  createTrip: async (req, res) => {
    try {
      const { title, description, img_url, num_days, start_date, end_date, total_cost, username } = req.body

      const result = await pool.query(
        `INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [title, description, img_url, num_days, start_date, end_date, total_cost]
      )

      const tripUser = await pool.query(
        `INSERT INTO users_trips (trip_id, username)
         VALUES($1, $2)
         RETURNING *`,
        [result.rows[0].id, username]
      )

      res.status(201).json(result.rows[0])
    } catch (error) {
      console.error('⚠️ error creating trip', error)
      res.status(500).json({ error: 'Failed to create trip' })
    }
  },

  deleteTrip: async (req, res) => {
    try {
      const id = req.params.id

      const activity_deletion = await pool.query(
        'DELETE FROM activities WHERE trip_id = $1',
        [id]
      )

      const user_removal = await pool.query(
        'DELETE FROM users_trips WHERE trip_id = $1',
        [id]
      )

      const destination_removal = await pool.query(
        'DELETE FROM trips_destinations WHERE trip_id = $1',
        [id]
      )

      const result = await pool.query('DELETE FROM trips WHERE id = $1 RETURNING *', [req.params.id])

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Trip not found' })
      }

      res.json({ message: 'Trip deleted successfully' })
    } catch (error) {
      console.error('⚠️ error deleting trip', error)
      res.status(500).json({ error: 'Failed to delete trip' })
    }
  },

  updateTrip: async (req, res) => {
    try {
      const { title, description, img_url, num_days, start_date, end_date, total_cost } = req.body

      const result = await pool.query(
        `UPDATE trips
         SET title = COALESCE($1, title),
             description = COALESCE($2, description),
             img_url = COALESCE($3, img_url),
             num_days = COALESCE($4, num_days),
             start_date = COALESCE($5, start_date),
             end_date = COALESCE($6, end_date),
             total_cost = COALESCE($7, total_cost)
         WHERE id = $8
         RETURNING *`,
        [title, description, img_url, num_days, start_date, end_date, total_cost, req.params.id]
      )

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Trip not found' })
      }

      res.json(result.rows[0])
    } catch (error) {
      console.error('⚠️ error updating trip', error)
      res.status(500).json({ error: 'Failed to update trip' })
    }
  }
}

export default TripsController
