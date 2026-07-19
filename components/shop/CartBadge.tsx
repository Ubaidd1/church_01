"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/components/shop/CartProvider"

export default function CartBadge() {
  const { itemCount, isHydrated } = useCart()

  if (!isHydrated || itemCount === 0) return null

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-zinc-300 backdrop-blur-sm">
      <ShoppingBag className="h-4 w-4 text-[#C9A66B]" />
      <span>
        <span className="font-semibold text-white">{itemCount}</span> in cart
      </span>
    </div>
  )
}
