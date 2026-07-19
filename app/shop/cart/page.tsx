import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import CartView from "@/components/shop/CartView"

export const metadata: Metadata = {
  title: "Cart | Shop | The House Of Overflow",
  description: "Review the items in your House Of Overflow shopping cart.",
}

export default function CartPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-faith-slate to-faith-black pt-28 pb-10 text-white md:pt-32">
        <div className="absolute top-0 right-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-faith-blue/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-faith-gold/10 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4">
          <Link
            href="/shop"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-faith-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
          <h1 className="font-serif text-3xl font-bold md:text-5xl">Your Cart</h1>
          <div className="mt-4 h-1.5 w-20 rounded-full bg-faith-gold" />
          <p className="mt-4 max-w-xl text-white/85">Review your items before checkout.</p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-faith-gray/50 py-12 md:py-16">
        <div className="container relative z-10 mx-auto px-4">
          <CartView />
        </div>
      </section>
    </main>
  )
}
