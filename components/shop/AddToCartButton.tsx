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
          "h-11 w-11 rounded-xl shadow-md transition-all duration-300",
          added
            ? "bg-emerald-500 hover:bg-emerald-500 text-white"
            : "bg-faith-blue hover:bg-faith-blue/90 text-white shadow-faith-blue/30",
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
        "rounded-xl font-medium shadow-md transition-all duration-300",
        added
          ? "bg-emerald-500 hover:bg-emerald-500 text-white"
          : "bg-faith-blue hover:bg-faith-blue/90 text-white shadow-faith-blue/30",
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
