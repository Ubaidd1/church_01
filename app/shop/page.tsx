import type { Metadata } from "next"
import { getAllProducts } from "@/data/products"
import ProductGrid from "@/components/shop/ProductGrid"
import CartBadge from "@/components/shop/CartBadge"

export const metadata: Metadata = {
  title: "Shop | The House Of Overflow",
  description:
    "Browse faith-inspired apparel and merchandise from The House Of Overflow. Wear your faith. Live with purpose.",
}

export default function ShopPage() {
  const products = getAllProducts()

  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative overflow-hidden pt-28 pb-14 md:pt-32 md:pb-16">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
              Official Merchandise
            </p>
            <h1 className="mb-5 text-4xl font-semibold tracking-tight text-white md:text-6xl">Shop</h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
              Wear your faith. Live with purpose. Overflow everywhere.
            </p>
            <div className="mt-8 flex justify-center">
              <CartBadge />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  )
}
