import type { Product } from "@/data/products"
import ProductCard from "@/components/shop/ProductCard"

type ProductGridProps = {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-zinc-900/50 py-20 text-center">
        <p className="text-lg text-zinc-400">No products are available at this time. Please check back soon.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
