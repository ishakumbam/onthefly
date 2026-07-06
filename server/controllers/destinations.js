import { pool } from '../config/database.js'

const DestinationsController = {
  getDestinations: async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM destinations ORDER BY id')
      res.json(result.rows)
    } catch (error) {
      console.error('⚠️ error fetching destinations', error)
      res.status(500).json({ error: 'Failed to fetch destinations' })
    }
  },

  getDestination: async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM destinations WHERE id = $1', [req.params.id])

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Destination not found' })
      }

      res.json(result.rows[0])
    } catch (error) {
      console.error('⚠️ error fetching destination', error)
      res.status(500).json({ error: 'Failed to fetch destination' })
    }
  },

  createDestination: async (req, res) => {
    try {
      const { destination, description, city, country, img_url, flag_img_url } = req.body

      const result = await pool.query(
        `INSERT INTO destinations (destination, description, city, country, img_url, flag_img_url)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [destination, description, city, country, img_url, flag_img_url]
      )

      res.status(201).json(result.rows[0])
    } catch (error) {
      console.error('⚠️ error creating destination', error)
      res.status(500).json({ error: 'Failed to create destination' })
    }
  },

  updateDestination: async (req, res) => {
    try {
      const { destination, description, city, country, img_url, flag_img_url } = req.body

      const result = await pool.query(
        `UPDATE destinations
         SET destination = COALESCE($1, destination),
             description = COALESCE($2, description),
             city = COALESCE($3, city),
             country = COALESCE($4, country),
             img_url = COALESCE($5, img_url),
             flag_img_url = COALESCE($6, flag_img_url)
         WHERE id = $7
         RETURNING *`,
        [destination, description, city, country, img_url, flag_img_url, req.params.id]
      )

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Destination not found' })
      }

      res.json(result.rows[0])
    } catch (error) {
      console.error('⚠️ error updating destination', error)
      res.status(500).json({ error: 'Failed to update destination' })
    }
  },

  deleteDestination: async (req, res) => {
    try {
      const result = await pool.query('DELETE FROM destinations WHERE id = $1 RETURNING *', [req.params.id])

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Destination not found' })
      }

      res.json({ message: 'Destination deleted successfully' })
    } catch (error) {
      console.error('⚠️ error deleting destination', error)
      res.status(500).json({ error: 'Failed to delete destination' })
    }
  }
}

export default DestinationsController
