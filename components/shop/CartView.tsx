"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { Loader2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/components/shop/CartProvider"
import { formatPrice, type Product } from "@/data/products"
import { createCheckoutSession } from "@/lib/checkout"
import { fetchProducts } from "@/lib/products"
import { toast } from "sonner"

function getShippingFee(): number {
  const raw = process.env.NEXT_PUBLIC_SHIPPING_FEE
  const parsed = raw ? Number(raw) : 5.99
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 5.99
}

export default function CartView() {
  const { items, updateQuantity, removeItem, clearCart, isHydrated } = useCart()
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [productsById, setProductsById] = useState<Map<string, Product>>(new Map())
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState<string | null>(null)

  const shippingFee = useMemo(() => getShippingFee(), [])

  useEffect(() => {
    let cancelled = false

    async function loadProducts() {
      setProductsLoading(true)
      setProductsError(null)
      try {
        const products = await fetchProducts()
        if (cancelled) return
        setProductsById(new Map(products.map((product) => [product.id, product])))
      } catch (error) {
        if (cancelled) return
        const message =
          error instanceof Error ? error.message : "Unable to load product details."
        setProductsError(message)
        toast.error(message)
      } finally {
        if (!cancelled) {
          setProductsLoading(false)
        }
      }
    }

    void loadProducts()

    return () => {
      cancelled = true
    }
  }, [])

  if (!isHydrated || productsLoading) {
    return (
      <div className="rounded-2xl bg-faith-white p-10 text-center text-faith-slate shadow-lg">
        Loading cart...
      </div>
    )
  }

  if (productsError) {
    return (
      <div className="rounded-2xl bg-faith-white px-6 py-16 text-center shadow-lg">
        <p className="mb-6 text-faith-slate">{productsError}</p>
        <Button className="rounded-xl bg-faith-blue text-white hover:bg-faith-blue/90" asChild>
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    )
  }

  const lines = items
    .map((item) => {
      const product = productsById.get(item.productId)
      if (!product) return null
      return { item, product }
    })
    .filter((line): line is NonNullable<typeof line> => line !== null)

  const subtotal = lines.reduce(
    (total, { item, product }) => total + product.price * item.quantity,
    0
  )
  const displayTotal = subtotal + shippingFee

  if (items.length === 0 || lines.length === 0) {
    return (
      <div className="rounded-2xl bg-faith-white px-6 py-16 text-center shadow-lg">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-faith-blue/10">
          <ShoppingBag className="h-7 w-7 text-faith-blue" />
        </div>
        <h2 className="mb-2 font-serif text-2xl font-bold text-faith-black">Your cart is empty</h2>
        <p className="mx-auto mb-8 max-w-md text-faith-slate">
          Browse the shop and add the Overflow crewneck when you are ready.
        </p>
        <Button className="rounded-xl bg-faith-blue text-white hover:bg-faith-blue/90" asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  async function handleCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setCheckoutError(null)

    const name = customerName.trim()
    const email = customerEmail.trim()

    if (name.length < 2) {
      const message = "Please enter your full name."
      setCheckoutError(message)
      toast.error(message)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const message = "Please enter a valid email address."
      setCheckoutError(message)
      toast.error(message)
      return
    }

    setIsCheckingOut(true)

    try {
      const { checkoutUrl } = await createCheckoutSession({
        customerName: name,
        customerEmail: email,
        cartItems: lines.map(({ item }) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        shippingFee,
      })

      try {
        sessionStorage.setItem("hoo-checkout-email", email)
      } catch {
        // Ignore storage errors before redirect
      }

      toast.success("Redirecting to Stripe Checkout...")
      window.location.href = checkoutUrl
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Checkout failed. Please try again."
      setCheckoutError(message)
      toast.error(message)
      setIsCheckingOut(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="space-y-4">
        {lines.map(({ item, product }) => {
          const image = product.images[0]
          const lineTotal = product.price * item.quantity

          return (
            <div
              key={product.id}
              className="flex flex-col gap-4 rounded-2xl bg-faith-white p-4 shadow-lg sm:flex-row sm:items-center"
            >
              <Link
                href={`/shop/${product.slug}`}
                className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-faith-gray sm:h-28 sm:w-28"
              >
                {image && (
                  <Image
                    src={image}
                    alt={product.title}
                    fill
                    sizes="112px"
                    className="object-cover"
                    unoptimized
                  />
                )}
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/shop/${product.slug}`}
                  className="font-serif text-lg font-bold text-faith-black transition-colors hover:text-faith-blue"
                >
                  {product.title}
                </Link>
                <p className="mt-1 text-sm text-faith-slate">{formatPrice(product.price)} each</p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center rounded-xl border border-faith-slate/20 bg-faith-gray/50">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="flex h-9 w-9 items-center justify-center text-faith-slate transition-colors hover:text-faith-blue"
                      onClick={() => updateQuantity(product.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold text-faith-black">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="flex h-9 w-9 items-center justify-center text-faith-slate transition-colors hover:text-faith-blue"
                      onClick={() =>
                        updateQuantity(
                          product.id,
                          Math.min(item.quantity + 1, product.quantity)
                        )
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      removeItem(product.id)
                      toast.success("Item removed from cart")
                    }}
                    className="inline-flex items-center gap-1.5 text-sm text-faith-slate transition-colors hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-lg font-bold text-faith-black">{formatPrice(lineTotal)}</p>
              </div>
            </div>
          )
        })}

        <button
          type="button"
          onClick={() => {
            clearCart()
            toast.success("Cart cleared")
          }}
          className="text-sm text-faith-slate transition-colors hover:text-faith-blue"
        >
          Clear cart
        </button>
      </div>

      <aside className="h-fit rounded-2xl bg-faith-white p-6 shadow-lg lg:sticky lg:top-28">
        <h2 className="mb-5 font-serif text-xl font-bold text-faith-black">Order Summary</h2>
        <div className="mb-2 flex items-center justify-between text-faith-slate">
          <span>Subtotal</span>
          <span className="font-medium text-faith-black">{formatPrice(subtotal)}</span>
        </div>
        <div className="mb-6 flex items-center justify-between border-b border-faith-gray pb-5 text-faith-slate">
          <span>Shipping</span>
          <span className="font-medium text-faith-black">{formatPrice(shippingFee)}</span>
        </div>
        <div className="mb-6 flex items-center justify-between text-lg">
          <span className="font-semibold text-faith-black">Total</span>
          <span className="font-bold text-faith-black">{formatPrice(displayTotal)}</span>
        </div>

        <form onSubmit={handleCheckout} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName" className="text-faith-black">
              Full name
            </Label>
            <Input
              id="customerName"
              name="customerName"
              autoComplete="name"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              placeholder="Jane Doe"
              required
              disabled={isCheckingOut}
              className="rounded-xl border-faith-slate/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerEmail" className="text-faith-black">
              Email
            </Label>
            <Input
              id="customerEmail"
              name="customerEmail"
              type="email"
              autoComplete="email"
              value={customerEmail}
              onChange={(event) => setCustomerEmail(event.target.value)}
              placeholder="jane@example.com"
              required
              disabled={isCheckingOut}
              className="rounded-xl border-faith-slate/20"
            />
          </div>

          {checkoutError && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {checkoutError}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full rounded-xl bg-faith-gold text-faith-black hover:bg-faith-gold/90"
            disabled={isCheckingOut}
          >
            {isCheckingOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redirecting to Stripe...
              </>
            ) : (
              "Checkout"
            )}
          </Button>
        </form>

        <Button
          variant="outline"
          size="lg"
          className="mt-3 w-full rounded-xl border-faith-blue text-faith-blue hover:bg-faith-blue hover:text-white"
          asChild
        >
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </aside>
    </div>
  )
}
