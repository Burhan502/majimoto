import express from 'express'
import pool from '../db.js'

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id ASC')
    res.json(rows)
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch products', error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id])

    if (!rows.length) {
      return res.status(404).json({ message: 'Product not found' })
    }

    return res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch product', error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, category, description, image, price, stock, source } = req.body

    const [result] = await pool.query(
      'INSERT INTO products (name, category, description, image, price, stock, source) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, category, description, image, price, stock, source],
    )

    res.status(201).json({ id: result.insertId, message: 'Product created' })
  } catch (error) {
    res.status(500).json({ message: 'Unable to create product', error: error.message })
  }
})

export default router
