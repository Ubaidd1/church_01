import type { Product } from "@/data/products"
import ProductCard from "@/components/shop/ProductCard"

type ProductGridProps = {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#5B6778]/70 py-20 text-center shadow-[0_18px_40px_-18px_rgba(15,23,42,0.45)]">
        <p className="text-lg text-slate-300">No products are available at this time. Please check back soon.</p>
      </div>
    )
  }

  const [featuredProduct] = products

  if (products.length === 1 && featuredProduct) {
    return (
      <div className="mx-auto max-w-5xl">
        <ProductCard product={featuredProduct} featured />
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
