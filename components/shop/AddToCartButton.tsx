"use client"

import { useState } from "react"
import { Check, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/shop/CartProvider"
import { cn } from "@/lib/utils"

type AddToCartButtonProps = {
  productId: string
  disabled?: boolean
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
  iconOnly?: boolean
}

export default function AddToCartButton({
  productId,
  disabled = false,
  className,
  size = "default",
  iconOnly = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    if (disabled || added) return
    addItem(productId)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  if (iconOnly) {
    return (
      <Button
        type="button"
        size="icon"
        disabled={disabled}
        onClick={handleAdd}
        aria-label={added ? "Added to cart" : "Add to cart"}
        title={added ? "Added to cart" : "Add to cart"}
        className={cn(
          "h-11 w-11 rounded-xl shadow-[0_8px_20px_-8px_rgba(15,23,42,0.5)] transition-all duration-300",
          added
            ? "bg-emerald-500 hover:bg-emerald-500 text-white"
            : "bg-[#7B96F5] hover:bg-[#8BA4F7] text-white",
          className
        )}
      >
        {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
      </Button>
    )
  }

  return (
    <Button
      type="button"
      size={size === "icon" ? "default" : size}
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
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
