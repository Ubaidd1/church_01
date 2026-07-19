"use client"

import { useState } from "react"
import { Check, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/shop/CartProvider"
import { cn } from "@/lib/utils"

type AddToCartButtonProps = {
  productId: string
  disabled?: boolean
  className?: string
  size?: "default" | "sm" | "lg"
}

export default function AddToCartButton({
  productId,
  disabled = false,
  className,
  size = "default",
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    if (disabled || added) return
    addItem(productId)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <Button
      type="button"
      size={size}
      disabled={disabled}
      onClick={handleAdd}
      className={cn(
        "rounded-xl font-semibold tracking-wide shadow-[0_8px_20px_-8px_rgba(15,23,42,0.5)] transition-all duration-300",
        added
          ? "bg-emerald-500 hover:bg-emerald-500 text-white"
          : "bg-slate-200 hover:bg-white text-slate-800",
        className
      )}
    >
      {added ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Added
        </>
      ) : (
        <>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
