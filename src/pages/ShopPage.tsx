import { Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { ProductCard } from '../components/product/ProductCard'
import { fallbackProducts } from '../data/fallbackProducts'
import { loadProducts } from '../data/products'
import type { Product } from '../types'
import { useLanguage } from '../context/LanguageContext'

function ShopPage() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'All' | 'Rice' | 'Beans'>('All')
  const [query, setQuery] = useState('')
  const { t } = useLanguage()

  useEffect(() => {
    const load = async () => {
      try {
        setProducts(await loadProducts())
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [])

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = filter === 'All' || product.category === filter
      const matchesQuery = `${product.name} ${product.category} ${product.weight}`.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [filter, query, products])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">{t('ourProducts')}</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">{t('catalogue')}</h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <Search size={16} className="text-slate-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('searchProducts')}
              className="w-full bg-transparent outline-none placeholder:text-slate-400 sm:w-48"
            />
          </label>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            <SlidersHorizontal size={16} className="text-slate-500" />
            <select value={filter} onChange={(event) => setFilter(event.target.value as 'All' | 'Rice' | 'Beans')} className="bg-transparent font-medium outline-none">
              <option value="All">{t('all')}</option>
              <option value="Rice">{t('rice')}</option>
              <option value="Beans">{t('beans')}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="h-[27rem] animate-pulse rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="h-56 rounded-2xl bg-slate-100" />
              <div className="mt-5 h-4 w-1/3 rounded bg-slate-100" />
              <div className="mt-3 h-6 w-2/3 rounded bg-slate-100" />
              <div className="mt-4 h-12 rounded bg-slate-100" />
            </div>
          ))
        ) : visibleProducts.length > 0 ? (
          visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            {t('noProducts')}
          </div>
        )}
      </div>
    </div>
  )
}

export default ShopPage
