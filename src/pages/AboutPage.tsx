import { ArrowRight, HandHeart, MapPin, Sprout } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

function AboutPage() {
  const { t } = useLanguage()

  const commitments = [
    { icon: Sprout, title: t('trustedSourcing'), description: t('aboutP2') },
    { icon: HandHeart, title: t('supportingGrowers'), description: t('aboutP3') },
    { icon: MapPin, title: t('buildingWithPurpose'), description: t('aboutP4') },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <section className="grid overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:grid-cols-[1fr_0.9fr]">
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">{t('aboutMajimoto')}</p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-slate-900 dark:text-emerald-100 sm:text-5xl">
            {t('fromMpibweToTable')}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t('aboutP1')}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              {t('shopNow')} <ArrowRight className="ml-2" size={17} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-800 dark:border-slate-600 dark:text-slate-200 dark:hover:text-emerald-300"
            >
              {t('contactUs')}
            </Link>
          </div>
        </div>

        <div className="relative min-h-72 bg-emerald-50 dark:bg-slate-800 sm:min-h-96 lg:min-h-full">
          <img
            src="/home/rice%20aestethic.jpeg"
            alt={t('agricultureImage')}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 rounded-full border border-white/30 bg-slate-950/50 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
            {t('fromMpibwe')}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">{t('whyChoose')}</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900 dark:text-emerald-100 sm:text-4xl">
            {t('qualityTrustConvenience')}
          </h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {commitments.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AboutPage
