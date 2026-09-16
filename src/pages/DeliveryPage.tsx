import { CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const deliveryAreas = ['Dar es Salaam', 'Dodoma', 'Arusha', 'Mbeya', 'Morogoro', 'Tanga']

function DeliveryPage() {
  const { language, t } = useLanguage()
  const translatedSteps = ['Customer places order.', 'Order is confirmed.', 'Products are prepared.', 'Delivery is arranged.', 'Customer receives the order.']
  const swahiliSteps = ['Mteja anaweka oda.', 'Oda inathibitishwa.', 'Bidhaa zinaandaliwa.', 'Uwasilishaji unapangwa.', 'Mteja anapokea oda.']
  const stepsToShow = translatedSteps.map((step, index) => language === 'sw' ? swahiliSteps[index] : step)
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">{t('delivery')}</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">{t('howDeliveryWorks')}</h1>

        <div className="mt-8 grid gap-5 lg:grid-cols-5">
          {stepsToShow.map((step, index) => (
            <div key={step} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700">{index + 1}</div>
              <p className="text-sm font-semibold text-slate-800">{step}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-emerald-50 p-6">
          <h2 className="text-2xl font-black text-slate-900">{t('deliveryAreas')}</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {deliveryAreas.map((area) => (
              <span key={area} className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800">
                {area}
              </span>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm text-slate-700">
            <CheckCircle2 size={18} className="text-emerald-700" />
            {t('deliveryFeeNote')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryPage
