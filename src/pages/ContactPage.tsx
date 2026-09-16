import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { useLanguage } from '../context/LanguageContext'

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const { t } = useLanguage()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">{t('contactUs')}</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">{t('hereToHelp')}</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3"><Phone size={18} className="text-emerald-700" /> 0768 415 973</div>
          <div className="flex items-center gap-3"><MessageCircle size={18} className="text-emerald-700" /> 0768 415 973</div>
          <div className="flex items-center gap-3"><Mail size={18} className="text-emerald-700" /> hello@majimotorice.co.tz</div>
          <div className="flex items-center gap-3"><MapPin size={18} className="text-emerald-700" /> Dar es Salaam, Tanzania</div>
          <div className="mt-5 h-56 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" alt={t('mapPlaceholder')} className="h-full w-full object-cover" />
          </div>
        </div>

        <form className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <Input label={t('name')} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            <Input label={t('email')} type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          </div>
          <div className="mt-5">
            <Input label={t('phoneNumber')} value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
          </div>
          <div className="mt-5">
            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-2 block">{t('message')}</span>
              <textarea value={form.message} rows={5} onChange={(event) => setForm({ ...form, message: event.target.value })} className="w-full rounded-xl border border-slate-200 bg-white p-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder={t('messagePlaceholder')} />
            </label>
          </div>
          <div className="mt-6">
            <Button className="w-full"><Send size={16} className="mr-2" /> {t('sendMessage')}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactPage
