import { Globe, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-emerald-100 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="mb-4 text-2xl font-black text-white">Majimoto Rice</div>
          <p className="text-sm text-slate-300">From Mpanda Farms to Your Table.</p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white">Links</h3>
          <ul className="space-y-3 text-sm">
            {['Home', 'Shop', 'About', 'Delivery', 'Contact'].map((label) => (
              <li key={label}>
                <Link to={label === 'Home' ? '/' : `/${label.toLowerCase()}`} className="text-slate-300 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white">Contact</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-2"><Phone size={15} /> +255 712 345 678</li>
            <li className="flex items-center gap-2"><MessageCircle size={15} /> +255 712 345 678</li>
            <li className="flex items-center gap-2"><Mail size={15} /> hello@majimotorice.co.tz</li>
            <li className="flex items-center gap-2"><MapPin size={15} /> Dar es Salaam, Tanzania</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white">Follow</h3>
          <div className="flex gap-3">
            {[Globe, MessageCircle].map((Icon, index) => (
              <a key={index} href="https://www.facebook.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-300 hover:border-emerald-500 hover:text-white">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 px-4 py-5 text-center text-sm text-slate-400">
        © 2026 Majimoto Rice. All rights reserved.
      </div>
    </footer>
  )
}
