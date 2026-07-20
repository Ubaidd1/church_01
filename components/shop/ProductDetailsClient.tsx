"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import ProductDetails from "@/components/shop/ProductDetails"
import type { Product } from "@/data/products"
import { fetchProductBySlug } from "@/lib/products"

type ProductDetailsClientProps = {
  slug: string
}

export default function ProductDetailsClient({ slug }: ProductDetailsClientProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchProductBySlug(slug)
        if (cancelled) return
        if (!data) {
          const message = "Product not found."
          setError(message)
          setProduct(null)
          toast.error(message)
        } else {
          setProduct(data)
        }
      } catch (loadError) {
        if (!cancelled) {
          const message =
            loadError instanceof Error
              ? loadError.message
              : "Unable to load product."
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
  }, [slug])

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-faith-white py-20 text-center shadow-lg">
        <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-faith-blue" />
        <p className="text-faith-slate">Loading product...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="rounded-2xl bg-faith-white px-6 py-16 text-center shadow-lg">
        <p className="mb-6 text-lg text-faith-slate">{error || "Product not found."}</p>
        <Button className="rounded-xl bg-faith-blue text-white hover:bg-faith-blue/90" asChild>
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    )
  }

  return <ProductDetails product={product} />
}
