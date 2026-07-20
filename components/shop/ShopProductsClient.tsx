"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import ProductGrid from "@/components/shop/ProductGrid"
import type { Product } from "@/data/products"
import { fetchProducts } from "@/lib/products"

export default function ShopProductsClient() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchProducts()
        if (!cancelled) {
          setProducts(data)
          if (data.length === 0) {
            toast.message("No products available right now")
          }
        }
      } catch (loadError) {
        if (!cancelled) {
          const message =
            loadError instanceof Error
              ? loadError.message
              : "Unable to load products."
          setError(message)
          toast.error(message)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [])

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-faith-white py-20 text-center shadow-lg">
        <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-faith-blue" />
        <p className="text-faith-slate">Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-faith-white py-16 text-center shadow-lg">
        <p className="text-lg text-faith-slate">{error}</p>
      </div>
    )
  }

  return <ProductGrid products={products} />
}
