import type { Metadata } from "next"
import Link from "next/link"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Payment Cancelled | The House Of Overflow",
  description: "Your payment was cancelled. You can return to your cart anytime.",
}

export default function CheckoutCancelPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-faith-slate to-faith-black pt-28 pb-10 text-white md:pt-32">
        <div className="absolute top-0 right-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-faith-blue/10 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="font-serif text-3xl font-bold md:text-5xl">Checkout Cancelled</h1>
          <div className="mt-4 h-1.5 w-20 rounded-full bg-faith-gold" />
          <p className="mt-4 max-w-xl text-white/85">
            No payment was taken. Your cart is still available.
          </p>
        </div>
      </section>

      <section className="relative bg-faith-gray/50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-lg rounded-2xl bg-faith-white px-6 py-12 text-center shadow-lg sm:px-10">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-amber-100">
              <XCircle className="h-8 w-8 text-amber-600" />
            </div>
            <h2 className="mb-3 font-serif text-3xl font-bold text-faith-black">
              Payment Cancelled
            </h2>
            <p className="mb-8 text-faith-slate">
              You left checkout before completing payment. You can return to your cart
              and try again whenever you are ready.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                className="rounded-xl bg-faith-gold text-faith-black hover:bg-faith-gold/90"
                asChild
              >
                <Link href="/shop/cart">Return to Cart</Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-xl border-faith-blue text-faith-blue hover:bg-faith-blue hover:text-white"
                asChild
              >
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
