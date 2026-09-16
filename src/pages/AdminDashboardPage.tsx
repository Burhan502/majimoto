import { Package, ShoppingCart, TrendingUp, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { OrderStatusBadge } from '../components/common/OrderStatusBadge'
import { products } from '../data/products'
import { formatTZS } from '../data/products'
import { apiRequest } from '../services/api'
import type { OrderStatus } from '../types'

type AdminOrder = {
  id: string
  customer: string
  phone: string
  items: string
  total: string
  status: OrderStatus
}

const orders: AdminOrder[] = [
  { id: 'MR-1042', customer: 'Aisha Msuya', phone: '+255 712 345 678', items: '2 items', total: 'TZS 74,000', status: 'Pending' },
  { id: 'MR-1041', customer: 'John M.', phone: '+255 789 345 112', items: '1 item', total: 'TZS 39,000', status: 'Confirmed' },
  { id: 'MR-1039', customer: 'Tatu K.', phone: '+255 655 890 221', items: '3 items', total: 'TZS 123,000', status: 'Preparing' },
]

type ApiOrder = {
  id: number
  customer_name: string
  phone: string
  total: number | string
  status: OrderStatus
}

type ApiProduct = {
  id: number
  name: string
  category: string
  stock: number
}

function AdminDashboardPage() {
  const [liveOrders, setLiveOrders] = useState<AdminOrder[]>(orders)
  const [liveProducts, setLiveProducts] = useState<ApiProduct[]>([])

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [apiOrders, apiProducts] = await Promise.all([
          apiRequest<ApiOrder[]>('/api/orders'),
          apiRequest<ApiProduct[]>('/api/products'),
        ])

        setLiveOrders(apiOrders.slice(0, 8).map((order) => ({
          id: `MR-${String(order.id).padStart(4, '0')}`,
          customer: order.customer_name,
          phone: order.phone,
          items: 'Order items',
          total: formatTZS(Number(order.total)),
          status: order.status,
        })))
        setLiveProducts(apiProducts)
      } catch {
        setLiveOrders(orders)
      }
    }

    loadDashboard()
  }, [])

  const pendingOrders = liveOrders.filter((order) => order.status === 'Pending').length
  const completedOrders = liveOrders.filter((order) => order.status === 'Delivered').length
  const totalSales = liveOrders.reduce((sum, order) => sum + Number(order.total.replace(/[^0-9.-]+/g, '')), 0)
  const overview = [
    { label: 'Total Orders', value: String(liveOrders.length), icon: ShoppingCart },
    { label: 'Pending Orders', value: String(pendingOrders), icon: Users },
    { label: 'Completed Orders', value: String(completedOrders), icon: TrendingUp },
    { label: 'Total Sales', value: formatTZS(totalSales), icon: Package },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Admin dashboard</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Overview</h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {overview.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-3 text-3xl font-black text-slate-900">{value}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Icon size={22} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Order management</h2>
            <span className="text-sm text-slate-500">Recent</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-3 pr-4 font-medium">Order</th>
                  <th className="pb-3 pr-4 font-medium">Customer</th>
                  <th className="pb-3 pr-4 font-medium">Items</th>
                  <th className="pb-3 pr-4 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {liveOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-100">
                    <td className="py-3 pr-4 font-semibold text-slate-800">{order.id}</td>
                    <td className="py-3 pr-4">
                      <div className="font-medium text-slate-800">{order.customer}</div>
                      <div className="text-xs text-slate-500">{order.phone}</div>
                    </td>
                    <td className="py-3 pr-4 text-slate-600">{order.items}</td>
                    <td className="py-3 pr-4 font-semibold text-slate-800">{order.total}</td>
                    <td className="py-3"><OrderStatusBadge status={order.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Product management</h2>
          <div className="mt-5 space-y-3">
            {(liveProducts.length > 0 ? liveProducts : products).map((product) => (
              <div key={product.id} className="rounded-2xl bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-800">{product.name}</p>
                    <p className="text-xs text-slate-500">{product.category}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">{product.stock} in stock</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
