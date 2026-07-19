"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/components/shop/CartProvider"

export default function CartBadge() {
  const { itemCount, isHydrated } = useCart()

  if (!isHydrated || itemCount === 0) return null

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#5B6778]/80 px-3.5 py-1.5 text-sm text-slate-200 shadow-[0_8px_20px_-10px_rgba(15,23,42,0.45)] backdrop-blur-sm">
      <ShoppingBag className="h-4 w-4 text-slate-100" />
      <span>
        <span className="font-semibold text-white">{itemCount}</span> in cart
      </span>
    </div>
  )
}
