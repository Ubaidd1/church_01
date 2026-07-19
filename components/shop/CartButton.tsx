"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/components/shop/CartProvider"
import { cn } from "@/lib/utils"

type CartButtonProps = {
  className?: string
}

export default function CartButton({ className }: CartButtonProps) {
  const { itemCount, isHydrated } = useCart()
  const count = isHydrated ? itemCount : 0

  return (
    <Link
      href="/shop/cart"
      className={cn(
        "relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#5B6778]/90 text-white shadow-[0_10px_24px_-12px_rgba(15,23,42,0.55)] backdrop-blur-md transition-all duration-300 hover:bg-[#6A7688] hover:border-white/25",
        className
      )}
      aria-label={count > 0 ? `Cart, ${count} items` : "Cart"}
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-100 px-1 text-[11px] font-bold text-slate-800">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  )
}
