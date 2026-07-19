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
      <section className="pt-28 pb-8 md:pt-32 md:pb-10">
        <div className="container mx-auto px-4">
          <Link
            href="/shop"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">Your Cart</h1>
          <p className="mt-3 max-w-xl text-slate-300">
            Review your items before checkout.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <CartView />
        </div>
      </section>
    </main>
  )
}
