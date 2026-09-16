import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { useCart } from '../context/CartContext'
import { formatTZS } from '../data/products'

const regions = ['Dar es Salaam', 'Dodoma', 'Arusha', 'Mbeya', 'Morogoro']

function CheckoutPage() {
  const navigate = useNavigate()
  const { itemDetails, subtotal, deliveryFee, total, clearCart } = useCart()
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    region: regions[0],
    district: '',
    area: '',
    address: '',
    instructions: '',
  })

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!form.fullName || !form.phone || !form.district || !form.area || !form.address) {
      alert('Please fill in all required delivery fields.')
      return
    }

    clearCart()
    navigate('/order-confirmation')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Checkout</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Complete your order</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
        <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <Input label="Full Name" value={form.fullName} onChange={(e) => handleChange('fullName', e.target.value)} required />
            <Input label="Phone Number" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} required />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input label="WhatsApp Number" value={form.whatsapp} onChange={(e) => handleChange('whatsapp', e.target.value)} />
            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-2 block">Delivery Region</span>
              <select value={form.region} onChange={(e) => handleChange('region', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input label="Delivery District" value={form.district} onChange={(e) => handleChange('district', e.target.value)} required />
            <Input label="Delivery Area" value={form.area} onChange={(e) => handleChange('area', e.target.value)} required />
          </div>

          <Input label="Street / Location" value={form.address} onChange={(e) => handleChange('address', e.target.value)} required />

          <label className="block text-sm font-medium text-slate-700">
            <span className="mb-2 block">Additional Delivery Instructions</span>
            <textarea
              value={form.instructions}
              onChange={(e) => handleChange('instructions', e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-white p-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Any delivery notes or landmarks..."
            />
          </label>

          <div className="flex gap-3">
            <Link to="/cart" className="flex-1">
              <Button variant="secondary" className="w-full">Back to cart</Button>
            </Link>
            <Button type="submit" className="flex-1">Place Order</Button>
          </div>
        </form>

        <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Order summary</h2>
          <div className="mt-5 space-y-4">
            {itemDetails.map(({ product, sizeLabel, quantity, lineTotal }) => (
              <div key={`${product.id}-${sizeLabel}`} className="flex items-center justify-between gap-4 rounded-2xl bg-white p-3">
                <div>
                  <p className="font-semibold text-slate-900">{product.name}</p>
                  <p className="text-xs text-slate-500">{sizeLabel} × {quantity}</p>
                </div>
                <span className="font-semibold text-slate-800">{formatTZS(lineTotal)}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-slate-200 pt-4 text-sm text-slate-700">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatTZS(subtotal)}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>{formatTZS(deliveryFee)}</span></div>
            <div className="flex justify-between text-lg font-black text-slate-900"><span>Total</span><span>{formatTZS(total)}</span></div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default CheckoutPage
