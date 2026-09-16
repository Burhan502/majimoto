import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatTZS } from '../../data/products'
import type { Product } from '../../types'

export function ProductCard({ product }: { product: Product }) {
  const primarySize = product.sizes[0]

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(20,83,45,0.12)]">
      <Link to={`/shop/${product.id}`} className="block">
        <div className="relative h-56 overflow-hidden bg-emerald-50">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-800">
            {product.category}
          </span>
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">{product.source}</p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">{product.name}</h3>
        </div>

        <p className="line-clamp-3 text-sm text-slate-600">{product.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">From</p>
            <p className="text-2xl font-black text-slate-900">{formatTZS(primarySize.price)}</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            {primarySize.label}
          </span>
        </div>

        <div className="flex gap-3">
          <Link to={`/shop/${product.id}`} className="flex-1">
            <button type="button" className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-emerald-300 hover:text-emerald-700">
              View details
              <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>
    </article>
  )
}
