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
  let connection

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
      items = [],
    } = req.body

    if (!customer_name || !phone || !delivery_region || !delivery_district || !delivery_area || !delivery_address) {
      return res.status(400).json({ message: 'Required customer and delivery details are missing' })
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'At least one order item is required' })
    }

    connection = await pool.getConnection()
    await connection.beginTransaction()

    const [result] = await connection.query(
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

    for (const item of items) {
      const [productRows] = await connection.query('SELECT id FROM products WHERE name = ? LIMIT 1', [item.product_name])
      if (productRows.length === 0) {
        throw new Error(`Product not found: ${item.product_name}`)
      }

      await connection.query(
        'INSERT INTO order_items (order_id, product_id, size, quantity, price) VALUES (?, ?, ?, ?, ?)',
        [result.insertId, productRows[0].id, item.size, item.quantity, item.price],
      )
    }

    await connection.commit()

    res.status(201).json({ id: result.insertId, message: 'Order created' })
  } catch (error) {
    if (connection) await connection.rollback()
    res.status(500).json({ message: 'Unable to create order', error: error.message })
  } finally {
    if (connection) connection.release()
  }
})

export default router
