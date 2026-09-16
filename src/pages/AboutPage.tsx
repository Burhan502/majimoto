function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">About Majimoto</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">From Mpanda to your table</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-5 text-slate-600">
            <p>
              Majimoto Rice was created to make quality agricultural food products more accessible to households, families, and businesses across Tanzania.
            </p>
            <p>
              Rooted in the agricultural heart of Mpanda, we are committed to sourcing reliable rice and beans from trusted producers and delivering them with care to customers who want convenience, consistency, and quality.
            </p>
            <p>
              Our mission is simple: support agricultural producers, strengthen local supply chains, and provide everyday customers with dependable access to staple foods that are essential to daily living.
            </p>
            <p>
              We are building a trusted brand that can grow from rice and beans to a wider range of agricultural products over time, while keeping quality, transparency, and service at the center of everything we do.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-emerald-50">
            <img
              src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80"
              alt="Agriculture and food sourcing"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
