import { Menu, ShoppingCart, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useLanguage } from '../../context/LanguageContext'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { cartCount } = useCart()
  const { language, setLanguage, t } = useLanguage()
  const navItems = [
    { label: t('home'), to: '/' }, { label: t('shop'), to: '/shop' }, { label: t('about'), to: '/about' },
    { label: t('delivery'), to: '/delivery' }, { label: t('contact'), to: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img src="/majimotologo.png" alt="Majimoto Rice logo" className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14" />
          <div>
            <div className="text-base font-black tracking-tight text-slate-900 sm:text-lg">Majimoto Rice</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-700">{t('fromMpibwe')}</div>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative py-2 text-sm font-medium transition after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-emerald-600 after:transition-transform ${isActive ? 'text-emerald-700 after:scale-x-100' : 'text-slate-700 after:scale-x-0 hover:text-emerald-700 hover:after:scale-x-100'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-1" aria-label={t('toggleLanguage')}>
            <button type="button" onClick={() => setLanguage('en')} className={`rounded-full px-2.5 py-1 text-xs font-bold ${language === 'en' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}>EN</button>
            <button type="button" onClick={() => setLanguage('sw')} className={`rounded-full px-2.5 py-1 text-xs font-bold ${language === 'sw' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}>SW</button>
          </div>
          <Link to="/cart" className="relative flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 hover:border-emerald-200 hover:text-emerald-700">
            <ShoppingCart size={18} />
            {t('cart')}
            {cartCount > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-700 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/shop" className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800">
            {t('orderNow')}
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
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm">
              <span className="font-medium text-slate-600">{t('toggleLanguage')}</span>
              <div className="flex gap-1">
                <button type="button" onClick={() => setLanguage('en')} className={`rounded-full px-3 py-1 text-xs font-bold ${language === 'en' ? 'bg-emerald-700 text-white' : 'text-slate-500'}`}>English</button>
                <button type="button" onClick={() => setLanguage('sw')} className={`rounded-full px-3 py-1 text-xs font-bold ${language === 'sw' ? 'bg-emerald-700 text-white' : 'text-slate-500'}`}>Kiswahili</button>
              </div>
            </div>
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
              {t('cart')} ({cartCount})
            </Link>
            <Link to="/shop" className="rounded-xl bg-emerald-700 px-3 py-2 text-center text-sm font-semibold text-white" onClick={() => setIsOpen(false)}>
              {t('orderNow')}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
