import type { Metadata } from "next"
import { Suspense } from "react"
import CheckoutSuccessContent from "./CheckoutSuccessContent"

export const metadata: Metadata = {
  title: "Payment Successful | The House Of Overflow",
  description: "Your payment was successful. Thank you for your order.",
}

export default function CheckoutSuccessPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-faith-slate to-faith-black pt-28 pb-10 text-white md:pt-32">
        <div className="absolute top-0 right-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-faith-blue/10 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="font-serif text-3xl font-bold md:text-5xl">Order Confirmed</h1>
          <div className="mt-4 h-1.5 w-20 rounded-full bg-faith-gold" />
          <p className="mt-4 max-w-xl text-white/85">
            Your checkout completed successfully.
          </p>
        </div>
      </section>

      <section className="relative bg-faith-gray/50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Suspense
            fallback={
              <div className="mx-auto max-w-lg rounded-2xl bg-faith-white p-10 text-center text-faith-slate shadow-lg">
                Loading confirmation...
              </div>
            }
          >
            <CheckoutSuccessContent />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
