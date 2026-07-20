"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const CART_STORAGE_KEY = "hoo-shop-cart"
const EMAIL_STORAGE_KEY = "hoo-checkout-email"

export default function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const emailFromQuery = searchParams.get("email")
  const [email, setEmail] = useState<string | null>(emailFromQuery)

  useEffect(() => {
    try {
      localStorage.removeItem(CART_STORAGE_KEY)
      if (!emailFromQuery) {
        const storedEmail = sessionStorage.getItem(EMAIL_STORAGE_KEY)
        if (storedEmail) {
          setEmail(storedEmail)
        }
      }
      sessionStorage.removeItem(EMAIL_STORAGE_KEY)
    } catch {
      // Ignore storage errors on success page
    }
  }, [emailFromQuery])

  return (
    <div className="mx-auto max-w-lg rounded-2xl bg-faith-white px-6 py-12 text-center shadow-lg sm:px-10">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-green-100">
        <CheckCircle2 className="h-8 w-8 text-green-600" />
      </div>
      <h1 className="mb-3 font-serif text-3xl font-bold text-faith-black">
        Payment Successful
      </h1>
      <p className="mb-2 text-faith-slate">
        Thank you for your order. Your payment has been confirmed.
      </p>
      {email && (
        <p className="mb-2 text-sm text-faith-slate">
          A confirmation will be sent to{" "}
          <span className="font-medium text-faith-black">{email}</span>.
        </p>
      )}
      {!email && (
        <p className="mb-2 text-sm text-faith-slate">
          Check your email for your order confirmation.
        </p>
      )}
      {sessionId && (
        <p className="mb-8 break-all text-xs text-faith-slate/80">
          Order reference: {sessionId}
        </p>
      )}
      {!sessionId && <div className="mb-8" />}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          className="rounded-xl bg-faith-blue text-white hover:bg-faith-blue/90"
          asChild
        >
          <Link href="/">Return Home</Link>
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
  )
}
