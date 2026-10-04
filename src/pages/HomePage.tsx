import { ArrowRight, Leaf, MapPinned, PackageCheck, ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { fallbackProducts } from '../data/fallbackProducts'
import { formatTZS, WHATSAPP_NUMBER } from '../data/products'
import type { Product } from '../types'
import { useLanguage } from '../context/LanguageContext'

const orderSteps = [
  { icon: ShoppingBag, title: 'orderStepChoose' },
  { icon: MapPinned, title: 'orderStepDetails' },
  { icon: PackageCheck, title: 'orderStepDelivery' },
] as const

function HomePage() {
  const [featured, setFeatured] = useState<Product[]>(fallbackProducts.filter((product) => product.isFeatured).slice(0, 4))
  const { t } = useLanguage()
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) return
        const data = (await response.json()) as Product[]
        if (data.length > 0) {
          setFeatured(data.filter((product) => product.isFeatured).slice(0, 4))
        }
      } catch {
        setFeatured(fallbackProducts.filter((product) => product.isFeatured).slice(0, 4))
      }
    }

    load()
  }, [])

  return (
    <div className="bg-[#f8faf7] text-slate-900">
      <section className="bg-gradient-to-br from-[#f5f8f0] via-[#eef3e9] to-[#e3eadc]">
        <div className="mx-auto grid max-w-7xl lg:min-h-[620px] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <p className="mb-6 inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
              <Leaf size={15} /> {t('trustedFromMpibwe')}
            </p>
            <h1 className="max-w-xl text-4xl font-black leading-[1.08] text-[#153b2d] sm:text-5xl lg:text-6xl">
              {t('qualityHeadline')}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              {t('heroDescription')}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop">
                <Button className="w-full sm:w-auto">{t('shopNow')} <ArrowRight className="ml-2" size={17} /></Button>
              </Link>
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                <Button variant="secondary" className="w-full sm:w-auto">{t('orderViaWhatsApp')}</Button>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2"><PackageCheck size={17} className="text-emerald-700" /> {t('freshClean')}</span>
              <span className="flex items-center gap-2"><MapPinned size={17} className="text-emerald-700" /> {t('trustedSourcing')}</span>
            </div>
          </div>
          <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-0">
            <img
              src="/home/farm.jpeg"
              alt={t('heroImageAlt')}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-[center_42%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 to-transparent lg:hidden" />
            <p className="absolute bottom-5 left-5 text-xs font-semibold uppercase tracking-[0.16em] text-white drop-shadow sm:bottom-7 sm:left-7 lg:hidden">
              {t('fromMpibweToTable')}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">{t('featuredProducts')}</p>
            <h2 className="mt-2 text-3xl font-black text-[#153b2d] sm:text-4xl">{t('freshEssentials')}</h2>
          </div>
          <Link to="/shop" className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-emerald-800 hover:text-emerald-950">
            <span className="hidden sm:inline">{t('viewAllProducts')}</span><span className="sm:hidden">{t('all')}</span><ArrowRight size={17} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((product) => {
            const packageSize = product.sizes[0]
            const categoryName = product.category.toLowerCase() === 'rice' ? t('rice') : t('beans')

            return (
              <article key={product.id} className="group overflow-hidden rounded-md border border-slate-200 bg-white transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(21,59,45,0.12)]">
                <Link to={`/shop/${product.id}`} className="block">
                  <div className="flex h-56 items-center justify-center bg-[#f2f5ef] p-6 sm:h-60">
                    <img src={product.image} alt={`${product.name} ${packageSize?.label ?? ''}`} loading="lazy" className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">{categoryName}</p>
                    <h3 className="mt-2 text-lg font-bold text-slate-900">{product.name}</h3>
                    <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
                      <div>
                        <p className="text-xs text-slate-500">{packageSize?.label}</p>
                        <p className="mt-1 text-xl font-black text-[#153b2d]">
                          {packageSize?.price !== undefined ? formatTZS(packageSize.price) : t('priceComingSoon')}
                        </p>
                      </div>
                      <span className="mb-1 inline-flex items-center gap-1 text-sm font-bold text-emerald-800">
                        {t('details')} <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      <section className="bg-[#153b2d] text-white">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <img src="/home/farmer.jpeg" alt={t('farmImageAlt')} loading="lazy" className="h-72 w-full object-cover sm:h-96 lg:h-full lg:min-h-[420px]" />
          <div className="flex flex-col justify-center px-5 py-12 sm:px-10 sm:py-16 lg:px-16">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">{t('sourcingEyebrow')}</p>
            <h2 className="mt-4 max-w-lg text-3xl font-black leading-tight sm:text-4xl">{t('sourcingTitle')}</h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-emerald-50/85">{t('sourcingCopy')}</p>
            <Link to="/about" className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-bold text-amber-300 transition-colors hover:text-amber-200">
              {t('aboutMajimoto')} <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">{t('orderStepsEyebrow')}</p>
          <h2 className="mt-2 text-3xl font-black text-[#153b2d] sm:text-4xl">{t('orderStepsTitle')}</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {orderSteps.map(({ icon: Icon, title }, index) => (
            <div key={title} className="border-t-2 border-emerald-800/20 pt-5">
              <div className="flex items-center gap-3 text-emerald-800">
                <span className="text-3xl font-black">0{index + 1}</span>
                <Icon size={21} />
              </div>
              <p className="mt-4 max-w-xs text-lg font-bold text-slate-900">{t(title)}</p>
            </div>
          ))}
        </div>
        <Link to="/shop" className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-950">
          {t('shopNow')} <ArrowRight size={17} />
        </Link>
      </section>
    </div>
  )
}

export default HomePage
