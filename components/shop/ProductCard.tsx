import Image from "next/image"
import Link from "next/link"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import AddToCartButton from "@/components/shop/AddToCartButton"
import { formatPrice, type Product } from "@/data/products"

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const outOfStock = product.quantity <= 0

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#5B6778] shadow-[0_18px_40px_-18px_rgba(15,23,42,0.55)] transition-all duration-500 hover:-translate-y-1.5 hover:bg-[#627084] hover:shadow-[0_24px_48px_-16px_rgba(15,23,42,0.6)]">
      <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-[#465263]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#465263]/90 via-[#465263]/20 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#3F4A5A]/70 px-3 py-1 text-xs font-medium uppercase tracking-wider text-slate-100 backdrop-blur-md">
          {outOfStock ? "Sold Out" : `${product.quantity} in stock`}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-2xl font-semibold tracking-tight text-white">{formatPrice(product.price)}</span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="mb-2 text-lg font-semibold tracking-tight text-white md:text-xl">
          <Link href={`/shop/${product.slug}`} className="transition-colors hover:text-slate-200">
            {product.title}
          </Link>
        </h3>

        {product.shortDescription && (
          <p className="mb-5 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-300">
            {product.shortDescription}
          </p>
        )}

        <div className="mb-5 flex items-center gap-2 text-sm text-slate-300">
          <Package className="h-4 w-4 text-slate-200" />
          <span>
            Quantity available:{" "}
            <span className="font-medium text-white">
              {product.quantity} {product.quantity === 1 ? "unit" : "units"}
            </span>
          </span>
        </div>

        <div className="mt-auto grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <Button
            variant="outline"
            className="rounded-xl border-white/20 bg-transparent text-slate-100 hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href={`/shop/${product.slug}`}>View Details</Link>
          </Button>
          <AddToCartButton productId={product.id} disabled={outOfStock} className="w-full" />
        </div>
      </div>
    </article>
  )
}
