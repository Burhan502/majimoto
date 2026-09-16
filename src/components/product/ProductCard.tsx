import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../common/Button'
import { useCart } from '../../context/CartContext'
import { formatTZS } from '../../data/products'
import type { Product } from '../../types'
import { useLanguage } from '../../context/LanguageContext'

export function ProductCard({ product }: { product: Product }) {
  const primarySize = product.sizes[0]
  const hasPrice = primarySize.price !== undefined
  const { addToCart } = useCart()
  const { t } = useLanguage()

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(20,83,45,0.12)]">
      <Link to={`/shop/${product.id}`} className="block">
        <div className="relative flex h-64 items-center justify-center overflow-hidden bg-slate-50 p-4">
          <img src={product.image} alt={`${product.name} ${product.weight}`} className="h-full w-full object-contain transition duration-500 group-hover:scale-105" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-800">
            {product.category}
          </span>
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">{product.source}</p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">{product.name}</h3>
          <p className="mt-1 text-sm font-bold text-slate-500">{product.weight}</p>
        </div>

        <p className="line-clamp-3 text-sm text-slate-600">{product.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">From</p>
            <p className="text-lg font-black text-slate-900">{hasPrice ? formatTZS(primarySize.price as number) : t('priceComingSoon')}</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            {primarySize.label}
          </span>
        </div>

        <div className="flex gap-3">
          <Link to={`/shop/${product.id}`} className="flex-1">
            <Button type="button" variant="secondary" className="w-full gap-2 px-3">
              {t('details')} <ArrowRight size={16} />
            </Button>
          </Link>
          <Button type="button" className="flex-1 px-3" disabled={!hasPrice} onClick={() => addToCart(product.id, primarySize.id)}>
            {t('addToCart')}
          </Button>
        </div>
      </div>
    </article>
  )
}
