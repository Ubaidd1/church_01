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
        "relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-faith-blue text-white shadow-lg shadow-faith-blue/30 transition-all duration-300 hover:bg-faith-blue/90",
        className
      )}
      aria-label={count > 0 ? `Cart, ${count} items` : "Cart"}
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-faith-gold px-1 text-[11px] font-bold text-faith-black">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  )
}
