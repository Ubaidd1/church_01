import type { Metadata } from "next"
import { getAllProducts } from "@/data/products"
import ProductGrid from "@/components/shop/ProductGrid"

export const metadata: Metadata = {
  title: "Shop | The House Of Overflow",
  description:
    "Browse faith-inspired apparel and merchandise from The House Of Overflow. Wear your faith. Live with purpose.",
}

export default function ShopPage() {
  const products = getAllProducts()

  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-faith-slate to-faith-black pt-28 pb-16 text-white md:pt-32 md:pb-20">
        <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-faith-blue/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 -translate-x-1/3 translate-y-1/3 rounded-full bg-faith-gold/10 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-faith-gold">
            Official Merchandise
          </p>
          <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">Shop</h1>
          <div className="mx-auto mb-6 h-1.5 w-24 rounded-full bg-faith-gold" />
          <p className="mx-auto max-w-2xl text-lg text-white/85">
            Wear your faith. Live with purpose. Overflow everywhere.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-faith-gray/50 py-16 md:py-20">
        <div className="absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-faith-slate/10" />
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-faith-gold/5" />
        <div className="container relative z-10 mx-auto px-4">
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  )
}
