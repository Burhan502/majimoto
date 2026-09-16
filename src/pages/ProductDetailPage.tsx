import { Minus, Plus, ShoppingCart, Store, Truck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { products, formatTZS, WHATSAPP_NUMBER } from '../data/products'
import { useCart } from '../context/CartContext'

function ProductDetailPage() {
  const { productId } = useParams()
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)

  const product = useMemo(
    () => products.find((item) => item.id === productId),
    [productId],
  )

  if (!product) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center">
        <h1 className="text-3xl font-black text-slate-900">Product not found</h1>
        <Link to="/shop" className="mt-6 inline-block">
          <Button>Back to shop</Button>
        </Link>
      </div>
    )
  }

  const size = product.sizes.find((entry) => entry.id === selectedSize) ?? product.sizes[0]
  const currentPrice = size.price
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hello Majimoto Rice, I would like to place an order.\n\nProduct: ${product.name}\nSize: ${size.label}\nQuantity: ${quantity}\nDelivery Location: Dar es Salaam\nArea: Kigamboni\n\nPlease confirm my order.`,
  )}`

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link to="/shop" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
          ← Back to products
        </Link>
      </div>

      <div className="grid gap-10 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.04)] lg:grid-cols-2 lg:p-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-emerald-50">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">{product.category}</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">{product.name}</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">{product.description}</p>

          <div className="mt-6 flex items-end gap-3">
            <p className="text-4xl font-black text-slate-900">{formatTZS(currentPrice)}</p>
            <span className="mb-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {size.label}
            </span>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">Select size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setSelectedSize(entry.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      selectedSize === entry.id || (!selectedSize && entry.id === product.sizes[0].id)
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    {entry.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">Quantity</p>
              <div className="flex w-max items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="rounded-full bg-white p-2 text-slate-700">
                  <Minus size={14} />
                </button>
                <span className="min-w-10 text-center text-base font-bold text-slate-900">{quantity}</span>
                <button type="button" onClick={() => setQuantity((value) => value + 1)} className="rounded-full bg-white p-2 text-slate-700">
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              className="flex-1"
              onClick={() => addToCart(product.id, size.id, quantity)}
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </Button>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex-1">
              <Button variant="secondary" className="w-full">
                Order via WhatsApp
              </Button>
            </a>
          </div>

          <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <Store size={18} className="text-emerald-700" />
              <span>Source: {product.source}</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck size={18} className="text-emerald-700" />
              <span>Packaging size: {size.label}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
