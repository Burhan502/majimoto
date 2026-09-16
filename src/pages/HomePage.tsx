import { ArrowRight, BadgeCheck, CheckCircle2, Leaf, MapPinned, PackageCheck, ShoppingBag, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { fallbackProducts } from '../data/fallbackProducts'
import { formatTZS, WHATSAPP_NUMBER } from '../data/products'
import type { Product } from '../types'

const reasons = [
  { icon: BadgeCheck, title: 'Quality Products', text: 'Carefully selected rice and beans that meet our trusted standards.' },
  { icon: MapPinned, title: 'Sourced from Mpanda', text: 'We work closely with agricultural producers in Mpanda, Tanzania.' },
  { icon: PackageCheck, title: 'Reliable Delivery', text: 'Fast, dependable delivery across Tanzania for busy households and businesses.' },
  { icon: Leaf, title: 'Fair Prices', text: 'Transparent pricing with sustainable value for families and institutions.' },
]

const steps = [
  'Choose your products',
  'Add to cart',
  'Enter delivery details',
  'Confirm your order',
  'Receive your delivery',
]

const reviews = [
  { name: 'Aisha M.', text: 'The rice is fresh and well packed. Delivery was on time and the customer service was very helpful.' },
  { name: 'Joseph K.', text: 'I love the quality of the beans. They taste great and the ordering process was simple and smooth.' },
  { name: 'Mariam N.', text: 'A trustworthy supplier for our family needs. The product quality matches the pricing and service.' },
]

function HomePage() {
  const [featured, setFeatured] = useState<Product[]>(fallbackProducts)
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) return
        const data = (await response.json()) as Product[]
        if (data.length > 0) {
          setFeatured(data.filter((product) => product.isFeatured))
        }
      } catch {
        setFeatured(fallbackProducts)
      }
    }

    load()
  }, [])

  return (
    <div className="bg-[#f8faf7] text-slate-900">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_45%),linear-gradient(180deg,#f8faf7_0%,#edf7f0_100%)]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              <Leaf size={14} /> Trusted from Mpanda
            </div>
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Quality Rice &amp; Beans from Mpanda, Delivered to Your Door.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              From trusted agricultural sources in Mpanda to your table. Order quality rice and beans conveniently and enjoy reliable delivery.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop">
                <Button className="w-full sm:w-auto">Shop Now</Button>
              </Link>
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                <Button variant="secondary" className="w-full sm:w-auto">
                  Order via WhatsApp
                </Button>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-600">
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" /> Fresh &amp; clean</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" /> Trusted sourcing</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-8 h-24 w-24 rounded-full bg-amber-200/70 blur-3xl" />
            <div className="absolute -right-4 bottom-6 h-28 w-28 rounded-full bg-emerald-200/80 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-white p-3 shadow-[0_25px_70px_rgba(15,118,110,0.14)]">
              <img
                src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80"
                alt="Rice fields and produce"
                className="h-[520px] w-full rounded-[1.5rem] object-cover"
              />
              <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/60 bg-white/85 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Today’s harvest</p>
                    <p className="mt-1 text-2xl font-black text-slate-900">Mpanda Fresh</p>
                  </div>
                  <div className="rounded-full bg-emerald-100 p-3 text-emerald-700">
                    <ShoppingBag size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Why choose Majimoto?</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Built for quality, trust, and convenience</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_25px_rgba(15,23,42,0.04)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Icon size={22} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Featured products</p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">Fresh essentials for your home</h2>
            </div>
            <Link to="/shop" className="hidden items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200 md:inline-flex">
              View all products <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
            {featured.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-800/70">
                <div className="grid md:grid-cols-2">
                  <img src={product.image} alt={product.name} className="h-full min-h-64 w-full object-cover" />
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">{product.category}</p>
                    <h3 className="mt-3 text-2xl font-bold">{product.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{product.description}</p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-2xl font-black text-white">{formatTZS(product.sizes[0].price)}</span>
                      <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">{product.sizes[0].label}</span>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <Link to={`/shop/${product.id}`} className="flex-1">
                        <Button variant="secondary" className="w-full border-slate-600 bg-slate-700 text-white hover:bg-slate-600">Details</Button>
                      </Link>
                      <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex-1">
                        <Button className="w-full">Order</Button>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">From Mpanda to your table</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">A trusted journey of quality</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {['Farm', 'Collection', 'Quality Check', 'Packaging', 'Delivery', 'Customer'].map((step, index) => (
            <div key={step} className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700">0{index + 1}</div>
              <p className="font-semibold text-slate-800">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-emerald-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">How it works</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900">Simple steps to order</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-5">
            {steps.map((step, index) => (
              <div key={step} className="relative rounded-3xl border border-emerald-100 bg-white p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">{index + 1}</div>
                <p className="text-base font-semibold text-slate-900">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Customer reviews</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">Families trust Majimoto</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>
              <p className="text-base leading-7 text-slate-600">“{review.text}”</p>
              <div className="mt-5 font-semibold text-slate-900">{review.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-700 to-emerald-900 py-16 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 lg:flex-row lg:text-left lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">Ready to order?</p>
            <h2 className="mt-3 text-3xl font-black">Shop Majimoto today</h2>
          </div>
          <Link to="/shop">
            <Button variant="secondary" className="border-white bg-white text-emerald-800 hover:bg-emerald-50">Shop Majimoto</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
