import Image from "next/image"
import Link from "next/link"
import { Eye, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import AddToCartButton from "@/components/shop/AddToCartButton"
import { formatPrice, type Product } from "@/data/products"

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const outOfStock = product.quantity <= 0
  const primaryImage = product.images[0]

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#5B6778] shadow-[0_18px_40px_-18px_rgba(15,23,42,0.5)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_26px_50px_-16px_rgba(15,23,42,0.6)]">
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-[#6A7688]"
      >
        <div className="absolute inset-6 rounded-[2rem] bg-[#7A8799]/35" />
        {primaryImage && (
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center p-3 transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#3F4A5A]/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-100 backdrop-blur-md">
          {outOfStock ? "Sold Out" : `${product.quantity} in stock`}
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="mb-1 text-base font-bold uppercase tracking-wide text-white md:text-lg">
          <Link href={`/shop/${product.slug}`} className="transition-colors hover:text-slate-200">
            {product.title}
          </Link>
        </h3>

        {product.shortDescription && (
          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-slate-300">
            {product.shortDescription}
          </p>
        )}

        <div className="mb-4 flex items-center gap-2 text-xs text-slate-300">
          <Package className="h-3.5 w-3.5 text-slate-200" />
          <span>
            Qty available:{" "}
            <span className="font-semibold text-white">
              {product.quantity} {product.quantity === 1 ? "unit" : "units"}
            </span>
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          <div className="min-w-0">
            <p className="text-xl font-bold tracking-tight text-white md:text-2xl">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 rounded-xl border-white/20 bg-transparent text-slate-100 hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href={`/shop/${product.slug}`} aria-label="View details" title="View details">
                <Eye className="h-5 w-5" />
              </Link>
            </Button>
            <AddToCartButton productId={product.id} disabled={outOfStock} iconOnly />
          </div>
        </div>
      </div>
    </article>
  )
}
