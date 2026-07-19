"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/shop/CartProvider"
import { formatPrice, getProductById } from "@/data/products"

export default function CartView() {
  const { items, updateQuantity, removeItem, clearCart, isHydrated } = useCart()

  if (!isHydrated) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#5B6778]/70 p-10 text-center text-slate-300">
        Loading cart...
      </div>
    )
  }

  const lines = items
    .map((item) => {
      const product = getProductById(item.productId)
      if (!product) return null
      return { item, product }
    })
    .filter((line): line is NonNullable<typeof line> => line !== null)

  const subtotal = lines.reduce(
    (total, { item, product }) => total + product.price * item.quantity,
    0
  )

  if (lines.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#5B6778]/70 px-6 py-16 text-center shadow-[0_18px_40px_-18px_rgba(15,23,42,0.45)]">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#465263]/80">
          <ShoppingBag className="h-7 w-7 text-slate-200" />
        </div>
        <h2 className="mb-2 text-2xl font-semibold text-white">Your cart is empty</h2>
        <p className="mx-auto mb-8 max-w-md text-slate-300">
          Browse the shop and add the Overflow crewneck when you are ready.
        </p>
        <Button
          className="rounded-xl bg-slate-200 text-slate-800 hover:bg-white"
          asChild
        >
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    )
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
              className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#5B6778]/80 p-4 shadow-[0_14px_32px_-18px_rgba(15,23,42,0.45)] sm:flex-row sm:items-center"
            >
              <Link
                href={`/shop/${product.slug}`}
                className="relative h-28 w-full shrink-0 overflow-hidden rounded-2xl bg-[#465263] sm:h-28 sm:w-28"
              >
                {image && (
                  <Image
                    src={image}
                    alt={product.title}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                )}
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/shop/${product.slug}`}
                  className="text-lg font-semibold text-white transition-colors hover:text-slate-200"
                >
                  {product.title}
                </Link>
                <p className="mt-1 text-sm text-slate-300">{formatPrice(product.price)} each</p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center rounded-full border border-white/15 bg-[#465263]/70">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="flex h-9 w-9 items-center justify-center text-slate-200 transition-colors hover:text-white"
                      onClick={() => updateQuantity(product.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold text-white">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="flex h-9 w-9 items-center justify-center text-slate-200 transition-colors hover:text-white"
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
                    onClick={() => removeItem(product.id)}
                    className="inline-flex items-center gap-1.5 text-sm text-slate-300 transition-colors hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-lg font-semibold text-white">{formatPrice(lineTotal)}</p>
              </div>
            </div>
          )
        })}

        <button
          type="button"
          onClick={clearCart}
          className="text-sm text-slate-300 transition-colors hover:text-white"
        >
          Clear cart
        </button>
      </div>

      <aside className="h-fit rounded-3xl border border-white/10 bg-[#5B6778]/80 p-6 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.45)] lg:sticky lg:top-28">
        <h2 className="mb-5 text-xl font-semibold text-white">Order Summary</h2>
        <div className="mb-2 flex items-center justify-between text-slate-300">
          <span>Subtotal</span>
          <span className="font-medium text-white">{formatPrice(subtotal)}</span>
        </div>
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5 text-slate-300">
          <span>Shipping</span>
          <span className="text-sm">Calculated at checkout</span>
        </div>
        <div className="mb-6 flex items-center justify-between text-lg">
          <span className="font-semibold text-white">Total</span>
          <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
        </div>
        <Button
          size="lg"
          className="mb-3 w-full rounded-xl bg-slate-200 text-slate-800 hover:bg-white"
          disabled
        >
          Checkout Coming Soon
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full rounded-xl border-white/20 bg-transparent text-slate-100 hover:bg-white/10 hover:text-white"
          asChild
        >
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </aside>
    </div>
  )
}
