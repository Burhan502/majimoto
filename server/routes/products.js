import express from 'express'
import pool from '../db.js'

const router = express.Router()

async function getProductWithSizes(productRow, connection = pool) {
  const [sizeRows] = await connection.query(
    'SELECT id, size, price, stock FROM product_sizes WHERE product_id = ? ORDER BY id ASC',
    [productRow.id],
  )

  const sizes = sizeRows.length > 0
    ? sizeRows.map((size) => ({
        id: String(size.id),
        label: size.size,
        price: size.price == null ? undefined : Number(size.price),
        stock: size.stock,
      }))
    : [{
        id: `${productRow.id}-default`,
        label: '1 KG',
        price: productRow.price == null ? undefined : Number(productRow.price),
        stock: productRow.stock,
      }]

  return {
    id: String(productRow.id),
    name: productRow.name,
    category: productRow.category,
    weight: sizes[0].label,
    description: productRow.description || '',
    image: productRow.image || '',
    source: productRow.source || '',
    stock: productRow.stock,
    sizes,
    isFeatured: false,
  }
}

router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id ASC')
    const products = await Promise.all(rows.map((product) => getProductWithSizes(product)))
    res.json(products)
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

    return res.json(await getProductWithSizes(rows[0]))
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
