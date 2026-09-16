import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { formatTZS } from '../data/products'
import { useCart } from '../context/CartContext'

function CartPage() {
  const { itemDetails, updateQuantity, removeFromCart, subtotal, deliveryFee, total } = useCart()

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Shopping cart</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Your order summary</h1>
      </div>

      {itemDetails.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Your cart is empty</h2>
          <p className="mt-2 text-slate-600">Add rice or beans to get started.</p>
          <Link to="/shop" className="mt-6 inline-block">
            <Button>Browse products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
          <div className="space-y-4">
            {itemDetails.map(({ product, sizeLabel, quantity, unitPrice, lineTotal, sizeId }) => (
              <div key={`${product.id}-${sizeId}`} className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                <img src={product.image} alt={product.name} className="h-28 w-full rounded-2xl object-cover sm:w-32" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{product.name}</h3>
                      <p className="text-sm text-slate-500">{sizeLabel}</p>
                    </div>
                    <button type="button" onClick={() => removeFromCart(product.id, sizeId)} className="rounded-full bg-red-50 p-2 text-red-600 hover:bg-red-100">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                      <button type="button" onClick={() => updateQuantity(product.id, sizeId, -1)} className="rounded-full bg-white p-2 text-slate-700">
                        <Minus size={15} />
                      </button>
                      <span className="min-w-8 text-center text-sm font-bold text-slate-900">{quantity}</span>
                      <button type="button" onClick={() => updateQuantity(product.id, sizeId, 1)} className="rounded-full bg-white p-2 text-slate-700">
                        <Plus size={15} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Unit price</p>
                      <p className="text-base font-semibold text-slate-800">{formatTZS(unitPrice)}</p>
                    </div>
                  </div>
                </div>
                <div className="text-lg font-black text-slate-900">{formatTZS(lineTotal)}</div>
              </div>
            ))}
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Order summary</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatTZS(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Delivery</span>
                <span>{formatTZS(deliveryFee)}</span>
              </div>
              <div className="border-t border-slate-200 pt-4 text-lg font-black text-slate-900">
                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span>{formatTZS(total)}</span>
                </div>
              </div>
            </div>
            <Link to="/checkout" className="mt-6 block">
              <Button className="w-full">Proceed to checkout</Button>
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}

export default CartPage
