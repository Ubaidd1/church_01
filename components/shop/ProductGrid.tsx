import type { Product } from "@/data/products"
import ProductCard from "@/components/shop/ProductCard"

type ProductGridProps = {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl bg-faith-white py-20 text-center shadow-lg">
        <p className="text-lg text-faith-slate">No products are available at this time. Please check back soon.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
