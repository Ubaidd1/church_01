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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-faith-white shadow-lg transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl">
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-faith-gray"
      >
        {primaryImage && (
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute left-4 top-4 rounded-lg bg-faith-blue px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
          {outOfStock ? "Sold Out" : `${product.quantity} in stock`}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 font-serif text-xl font-bold text-faith-black">
          <Link href={`/shop/${product.slug}`} className="transition-colors hover:text-faith-blue">
            {product.title}
          </Link>
        </h3>

        {product.shortDescription && (
          <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-faith-slate">
            {product.shortDescription}
          </p>
        )}

        <div className="mb-4 flex items-center gap-2 text-sm text-faith-slate">
          <Package className="h-4 w-4 text-faith-gold" />
          <span>
            Qty available:{" "}
            <span className="font-semibold text-faith-black">
              {product.quantity} {product.quantity === 1 ? "unit" : "units"}
            </span>
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-faith-gray pt-4">
          <p className="text-2xl font-bold tracking-tight text-faith-black">{formatPrice(product.price)}</p>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 rounded-xl border-faith-slate/30 text-faith-slate hover:border-faith-blue hover:bg-faith-blue/5 hover:text-faith-blue"
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
