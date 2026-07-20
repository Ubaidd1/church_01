"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { waitForOrderBySessionId, type PublicOrder } from "@/lib/checkout"
import { formatPrice } from "@/data/products"

const CART_STORAGE_KEY = "hoo-shop-cart"
const EMAIL_STORAGE_KEY = "hoo-checkout-email"

function formatOrderDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount)
  } catch {
    return formatPrice(amount)
  }
}

export default function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const emailFromQuery = searchParams.get("email")

  const [fallbackEmail, setFallbackEmail] = useState<string | null>(emailFromQuery)
  const [order, setOrder] = useState<PublicOrder | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(sessionId))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      localStorage.removeItem(CART_STORAGE_KEY)
      if (!emailFromQuery) {
        const storedEmail = sessionStorage.getItem(EMAIL_STORAGE_KEY)
        if (storedEmail) {
          setFallbackEmail(storedEmail)
        }
      }
      sessionStorage.removeItem(EMAIL_STORAGE_KEY)
    } catch {
      // Ignore storage errors on success page
    }
  }, [emailFromQuery])

  useEffect(() => {
    if (!sessionId) {
      setIsLoading(false)
      setError("Missing checkout session. Unable to load order details.")
      return
    }

    let cancelled = false

    async function loadOrder() {
      setIsLoading(true)
      setError(null)

      try {
        const result = await waitForOrderBySessionId(sessionId!)
        if (cancelled) return

        if (!result) {
          setError(
            "Payment succeeded, but order details are still processing. Please refresh in a moment."
          )
          setOrder(null)
        } else {
          setOrder(result)
        }
      } catch (loadError) {
        if (cancelled) return
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load order details."
        )
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadOrder()

    return () => {
      cancelled = true
    }
  }, [sessionId])

  const email = order?.customerEmail || fallbackEmail

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl bg-faith-white px-6 py-16 text-center shadow-lg sm:px-10">
        <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-faith-blue" />
        <p className="text-faith-slate">Loading your order details...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-faith-white px-6 py-10 shadow-lg sm:px-10">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="mb-3 font-serif text-3xl font-bold text-faith-black">
          Payment Successful
        </h1>
        <p className="text-faith-slate">
          Thank you for your order. Your payment has been confirmed.
        </p>
        {email && (
          <p className="mt-2 text-sm text-faith-slate">
            Confirmation details for{" "}
            <span className="font-medium text-faith-black">{email}</span>
          </p>
        )}
      </div>

      {error && (
        <p className="mb-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800" role="alert">
          {error}
        </p>
      )}

      {order && (
        <div className="mb-8 space-y-6 text-left">
          <div className="rounded-xl border border-faith-gray bg-faith-gray/40 p-4 sm:p-5">
            <h2 className="mb-4 font-serif text-lg font-bold text-faith-black">
              Order Confirmation
            </h2>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-faith-slate">Order ID</dt>
                <dd className="font-medium text-faith-black break-all">{order.id}</dd>
              </div>
              <div>
                <dt className="text-faith-slate">Date</dt>
                <dd className="font-medium text-faith-black">
                  {formatOrderDate(order.createdAt)}
                </dd>
              </div>
              <div>
                <dt className="text-faith-slate">Customer</dt>
                <dd className="font-medium text-faith-black">{order.customerName}</dd>
              </div>
              <div>
                <dt className="text-faith-slate">Email</dt>
                <dd className="font-medium text-faith-black break-all">
                  {order.customerEmail}
                </dd>
              </div>
              <div>
                <dt className="text-faith-slate">Payment Status</dt>
                <dd className="font-medium capitalize text-green-700">
                  {order.paymentStatus}
                </dd>
              </div>
              <div>
                <dt className="text-faith-slate">Order Status</dt>
                <dd className="font-medium capitalize text-faith-black">
                  {order.orderStatus}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-lg font-bold text-faith-black">
              Items Ordered
            </h2>
            <ul className="divide-y divide-faith-gray overflow-hidden rounded-xl border border-faith-gray">
              {order.products.map((line) => (
                <li
                  key={`${line.productId}-${line.productName}`}
                  className="flex flex-col gap-1 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-faith-black">{line.productName}</p>
                    <p className="text-sm text-faith-slate">
                      {formatMoney(line.unitPrice, order.currency)} × {line.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-faith-black">
                    {formatMoney(line.subtotal, order.currency)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-faith-gray bg-white p-4 sm:p-5">
            <div className="mb-2 flex items-center justify-between text-sm text-faith-slate">
              <span>Subtotal</span>
              <span className="font-medium text-faith-black">
                {formatMoney(order.subtotal, order.currency)}
              </span>
            </div>
            <div className="mb-3 flex items-center justify-between border-b border-faith-gray pb-3 text-sm text-faith-slate">
              <span>Shipping</span>
              <span className="font-medium text-faith-black">
                {formatMoney(order.shippingFee, order.currency)}
              </span>
            </div>
            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold text-faith-black">Total Paid</span>
              <span className="font-bold text-faith-black">
                {formatMoney(order.totalAmount, order.currency)}
              </span>
            </div>
          </div>

          {/* <div className="space-y-1 text-xs text-faith-slate/80">
            <p className="break-all">Stripe session: {order.stripeSessionId}</p>
            {order.stripePaymentIntentId && (
              <p className="break-all">Payment intent: {order.stripePaymentIntentId}</p>
            )}
          </div> */}
        </div>
      )}

      {!order && sessionId && !error && (
        <p className="mb-8 break-all text-center text-xs text-faith-slate/80">
          Order reference: {sessionId}
        </p>
      )}

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
