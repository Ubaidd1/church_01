import Link from "next/link"
import { ArrowLeft, Package, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
import ReviewsSection from "@/components/shop/ReviewsSection"
import { formatPrice, type Product } from "@/data/products"

type ProductDetailsProps = {
  product: Product
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating ? "fill-amber-300 text-amber-300" : "fill-transparent text-slate-500"
          }`}
        />
      ))}
    </div>
  )
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const outOfStock = product.quantity <= 0
  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      : 0

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb>
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

        <Button
          variant="outline"
          size="sm"
          className="w-fit rounded-xl border-white/20 bg-transparent text-slate-100 hover:bg-white/10 hover:text-white"
          asChild
        >
          <Link href="/shop">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>
        </Button>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductImageGallery images={product.images} title={product.title} />

        <div className="rounded-3xl border border-white/10 bg-[#5B6778]/70 p-6 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.45)] backdrop-blur-sm md:p-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
            The House Of Overflow
          </p>
          <h1 className="mb-3 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            {product.title}
          </h1>

          {product.reviews.length > 0 && (
            <div className="mb-6 flex items-center gap-2">
              <StarRating rating={Math.round(averageRating)} />
              <span className="text-sm text-slate-300">
                {averageRating.toFixed(1)} · {product.reviews.length} reviews
              </span>
            </div>
          )}

          <div className="mb-6 flex flex-wrap items-end gap-4">
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

          <p className="mb-8 text-base leading-relaxed text-slate-300 md:text-lg">
            {product.shortDescription}
          </p>

          {product.details.length > 0 && (
            <div className="mb-8">
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

          <AddToCartButton
            productId={product.id}
            disabled={outOfStock}
            size="lg"
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-14 space-y-8 md:mt-20">
        <section className="rounded-3xl border border-white/10 bg-[#5B6778]/70 p-6 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.45)] md:p-8">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">Description</h2>
          <div className="space-y-4 text-base leading-relaxed text-slate-300 md:text-lg">
            {product.description.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#5B6778]/70 p-6 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.45)] md:p-8">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">FAQs</h2>
          <Accordion type="single" collapsible className="w-full">
            {product.faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="border-white/10"
              >
                <AccordionTrigger className="text-left text-base text-white hover:no-underline hover:text-slate-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-300 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <ReviewsSection productId={product.id} initialReviews={product.reviews} />
      </div>
    </div>
  )
}
