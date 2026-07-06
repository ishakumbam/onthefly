import { pool } from '../config/database.js'

const ActivitiesController = {
  getActivities: async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM activities ORDER BY id')
      res.json(result.rows)
    } catch (error) {
      console.error('⚠️ error fetching activities', error)
      res.status(500).json({ error: 'Failed to fetch activities' })
    }
  },

  getTripActivities: async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM activities WHERE trip_id = $1 ORDER BY id', [req.params.trip_id])
      res.json(result.rows)
    } catch (error) {
      console.error('⚠️ error fetching trip activities', error)
      res.status(500).json({ error: 'Failed to fetch trip activities' })
    }
  },

  createActivity: async (req, res) => {
    try {
      const { activity } = req.body
      const trip_id = req.params.trip_id

      const result = await pool.query(
        `INSERT INTO activities (activity, trip_id)
         VALUES ($1, $2)
         RETURNING *`,
        [activity, trip_id]
      )

      res.status(201).json(result.rows[0])
    } catch (error) {
      console.error('⚠️ error creating activity', error)
      res.status(500).json({ error: 'Failed to create activity' })
    }
  },

  updateActivityLikes: async (req, res) => {
    try {
      const { num_votes } = req.body

      const result = await pool.query(
        `UPDATE activities
         SET num_votes = $1
         WHERE id = $2
         RETURNING *`,
        [num_votes, req.params.id]
      )

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Activity not found' })
      }

      res.json(result.rows[0])
    } catch (error) {
      console.error('⚠️ error updating activity votes', error)
      res.status(500).json({ error: 'Failed to update activity votes' })
    }
  },

  deleteActivity: async (req, res) => {
    try {
      const result = await pool.query('DELETE FROM activities WHERE id = $1 RETURNING *', [req.params.id])

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Activity not found' })
      }

      res.json({ message: 'Activity deleted successfully' })
    } catch (error) {
      console.error('⚠️ error deleting activity', error)
      res.status(500).json({ error: 'Failed to delete activity' })
    }
  }
}

export default ActivitiesController
