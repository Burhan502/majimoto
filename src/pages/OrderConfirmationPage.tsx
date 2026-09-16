import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { useLanguage } from '../context/LanguageContext'

function OrderConfirmationPage() {
  const { t } = useLanguage()
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <div className="rounded-[2rem] border border-emerald-200 bg-white p-8 shadow-[0_20px_40px_rgba(16,185,129,0.08)]">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 size={36} />
        </div>
        <h1 className="mt-6 text-3xl font-black text-slate-900">{t('orderPlaced')}</h1>
        <p className="mt-3 text-slate-600">{t('thankYouOrder')}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/shop">
            <Button>{t('continueShopping')}</Button>
          </Link>
          <Link to="/">
            <Button variant="secondary">{t('backHome')}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmationPage
