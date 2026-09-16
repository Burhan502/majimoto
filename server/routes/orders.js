import express from 'express'
import pool from '../db.js'

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC')
    res.json(rows)
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch orders', error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const {
      customer_name,
      phone,
      whatsapp,
      delivery_region,
      delivery_district,
      delivery_area,
      delivery_address,
      instructions,
      subtotal,
      delivery_fee,
      total,
      status,
    } = req.body

    const [result] = await pool.query(
      `INSERT INTO orders (
        customer_name,
        phone,
        whatsapp,
        delivery_region,
        delivery_district,
        delivery_area,
        delivery_address,
        instructions,
        subtotal,
        delivery_fee,
        total,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customer_name,
        phone,
        whatsapp,
        delivery_region,
        delivery_district,
        delivery_area,
        delivery_address,
        instructions || '',
        subtotal,
        delivery_fee,
        total,
        status || 'Pending',
      ],
    )

    res.status(201).json({ id: result.insertId, message: 'Order created' })
  } catch (error) {
    res.status(500).json({ message: 'Unable to create order', error: error.message })
  }
})

export default router
