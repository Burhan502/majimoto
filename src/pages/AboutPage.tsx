import { useLanguage } from '../context/LanguageContext'

function AboutPage() {
  const { t } = useLanguage()
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">{t('aboutMajimoto')}</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">{t('fromMpandaToTable')}</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-5 text-slate-600">
            <p>
              {t('aboutP1')}
            </p>
            <p>
              {t('aboutP2')}
            </p>
            <p>
              {t('aboutP3')}
            </p>
            <p>
              {t('aboutP4')}
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-emerald-50">
            <img
              src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80"
              alt={t('agricultureImage')}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
