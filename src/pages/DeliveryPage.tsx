import { ArrowRight, CheckCircle2, MapPin, MessageCircle, PackageCheck, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { WHATSAPP_NUMBER } from '../data/products'

const deliveryAreas = ['Dar es Salaam', 'Dodoma', 'Arusha', 'Mbeya', 'Morogoro', 'Tanga']

function DeliveryPage() {
  const { language, t } = useLanguage()
  const steps = [
    { icon: ShoppingBag, text: t('orderStepChoose') },
    { icon: CheckCircle2, text: t('orderStepDetails') },
    { icon: PackageCheck, text: t('orderStepDelivery') },
  ]
  const whatsappMessage = language === 'sw'
    ? 'Habari Majimoto Rice, ningependa kuthibitisha kama mnafika eneo langu na ada ya uwasilishaji.'
    : 'Hello Majimoto Rice, I would like to confirm delivery availability and fees for my location.'
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <section className="rounded-[2rem] bg-emerald-700 px-7 py-10 text-white sm:px-10 sm:py-14">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">{t('delivery')}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">{t('howDeliveryWorks')}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-50/85">{t('deliveryIntro')}</p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {t('shopNow')} <ArrowRight className="ml-2" size={17} />
        </Link>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">{t('orderStepsEyebrow')}</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900 dark:text-emerald-100 sm:text-4xl">{t('howDeliveryWorks')}</h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, text }, index) => (
            <article
              key={text}
              className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <Icon size={22} />
                </div>
                <span className="text-sm font-black text-emerald-700">0{index + 1}</span>
              </div>
              <p className="mt-6 text-base font-semibold leading-7 text-slate-800 dark:text-slate-200">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-[2rem] border border-emerald-100 bg-emerald-50 p-6 dark:border-slate-700 dark:bg-slate-900 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
            <MapPin size={20} />
            <h2 className="text-2xl font-black text-slate-900 dark:text-emerald-100">{t('deliveryAreas')}</h2>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{t('listedAreasNote')}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {deliveryAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800 dark:border-slate-600 dark:bg-slate-800 dark:text-emerald-200"
              >
                {area}
              </span>
            ))}
          </div>
          <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-700" />
            {t('deliveryAvailability')}
          </p>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <MessageCircle className="mr-2" size={18} />
          {t('checkAvailability')}
        </a>
      </section>

      <p className="mt-5 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <CheckCircle2 size={16} className="shrink-0 text-emerald-700" />
        {t('deliveryFeeNote')}
      </p>
    </div>
  )
}

export default DeliveryPage
