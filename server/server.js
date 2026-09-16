import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Majimoto API' })
})

app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.listen(port, () => {
  console.log(`Majimoto API running on http://localhost:${port}`)
})
