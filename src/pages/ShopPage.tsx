import { Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { ProductCard } from '../components/product/ProductCard'
import { fallbackProducts } from '../data/fallbackProducts'
import type { Product } from '../types'

function ShopPage() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts)
  const [filter, setFilter] = useState<'All' | 'Rice' | 'Beans'>('All')
  const [query, setQuery] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) return
        const data = (await response.json()) as Product[]
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data)
        }
      } catch {
        setProducts(fallbackProducts)
      }
    }

    load()
  }, [])

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = filter === 'All' || product.category === filter
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [filter, query, products])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Our products</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Majimoto Product Catalogue</h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <Search size={16} className="text-slate-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              className="w-full bg-transparent outline-none placeholder:text-slate-400 sm:w-48"
            />
          </label>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            <SlidersHorizontal size={16} className="text-slate-500" />
            <select value={filter} onChange={(event) => setFilter(event.target.value as 'All' | 'Rice' | 'Beans')} className="bg-transparent font-medium outline-none">
              <option value="All">All</option>
              <option value="Rice">Rice</option>
              <option value="Beans">Beans</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            No products match your search yet.
          </div>
        )}
      </div>
    </div>
  )
}

export default ShopPage
