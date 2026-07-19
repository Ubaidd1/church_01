import Link from "next/link"
import { ArrowLeft, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import AddToCartButton from "@/components/shop/AddToCartButton"
import ProductImageGallery from "@/components/shop/ProductImageGallery"
import { formatPrice, type Product } from "@/data/products"

type ProductDetailsProps = {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const outOfStock = product.quantity <= 0

  return (
    <div>
      <Breadcrumb className="mb-8">
        <BreadcrumbList className="text-slate-400">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="text-slate-300 transition-colors hover:text-white">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-slate-500" />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/shop" className="text-slate-300 transition-colors hover:text-white">
                Shop
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-slate-500" />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium text-white">{product.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductImageGallery images={product.images} title={product.title} />

        <div className="rounded-3xl border border-white/10 bg-[#5B6778]/70 p-6 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.45)] backdrop-blur-sm md:p-8 lg:pt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
            The House Of Overflow
          </p>
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            {product.title}
          </h1>

          <div className="mb-8 flex flex-wrap items-end gap-4">
            <span className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {formatPrice(product.price)}
            </span>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#465263]/60 px-3.5 py-1.5 text-sm text-slate-200">
              <Package className="h-4 w-4 text-slate-200" />
              {outOfStock ? (
                <span>Out of stock</span>
              ) : (
                <span>
                  Quantity available:{" "}
                  <span className="font-semibold text-white">
                    {product.quantity} {product.quantity === 1 ? "unit" : "units"}
                  </span>
                </span>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">Description</h2>
            <p className="text-base leading-relaxed text-slate-200 md:text-lg">{product.description}</p>
          </div>

          {product.details.length > 0 && (
            <div className="mb-10">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">
                Product Information
              </h2>
              <dl className="overflow-hidden rounded-2xl border border-white/10 bg-[#465263]/50 divide-y divide-white/10">
                {product.details.map((detail) => (
                  <div
                    key={detail.label}
                    className="grid grid-cols-1 gap-1 px-5 py-3.5 sm:grid-cols-3 sm:gap-4"
                  >
                    <dt className="text-sm text-slate-400">{detail.label}</dt>
                    <dd className="font-medium text-slate-100 sm:col-span-2">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <AddToCartButton
              productId={product.id}
              disabled={outOfStock}
              size="lg"
              className="w-full sm:min-w-[200px] sm:w-auto"
            />
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-xl border-white/20 bg-transparent text-slate-100 hover:bg-white/10 hover:text-white sm:w-auto"
              asChild
            >
              <Link href="/shop">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Shop
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
