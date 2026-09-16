import { Menu, ShoppingCart, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Delivery', to: '/delivery' },
  { label: 'Contact', to: '/contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { cartCount } = useCart()

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src="/majimotologo.png" alt="Majimoto Rice logo" className="h-14 w-14 shrink-0 object-contain" />
          <div>
            <div className="text-lg font-black tracking-tight text-slate-900">Majimoto Rice</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-700">From Mpanda Farms</div>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-emerald-700' : 'text-slate-700 hover:text-emerald-700'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Link to="/cart" className="relative flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 hover:border-emerald-200 hover:text-emerald-700">
            <ShoppingCart size={18} />
            Cart
            {cartCount > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-700 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/shop" className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800">
            Order Now
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-sm font-medium ${isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/cart" className="mt-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-800" onClick={() => setIsOpen(false)}>
              Cart ({cartCount})
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
