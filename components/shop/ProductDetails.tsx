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
            index < rating ? "fill-faith-gold text-faith-gold" : "fill-transparent text-faith-slate/40"
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
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="text-faith-slate transition-colors hover:text-faith-blue">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-faith-slate/50" />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/shop" className="text-faith-slate transition-colors hover:text-faith-blue">
                  Shop
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-faith-slate/50" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-faith-black">{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Button
          variant="outline"
          size="sm"
          className="w-fit rounded-xl border-faith-blue text-faith-blue hover:bg-faith-blue hover:text-white"
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

        <div className="rounded-2xl bg-faith-white p-6 shadow-xl md:p-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-faith-gold">
            The House Of Overflow
          </p>
          <h1 className="mb-3 font-serif text-3xl font-bold text-faith-black md:text-4xl">
            {product.title}
          </h1>
          <div className="mb-5 h-1.5 w-24 rounded-full bg-faith-gold" />

          {product.reviews.length > 0 && (
            <div className="mb-6 flex items-center gap-2">
              <StarRating rating={Math.round(averageRating)} />
              <span className="text-sm text-faith-slate">
                {averageRating.toFixed(1)} · {product.reviews.length} reviews
              </span>
            </div>
          )}

          <div className="mb-6 flex flex-wrap items-end gap-4">
            <span className="text-3xl font-bold tracking-tight text-faith-black md:text-4xl">
              {formatPrice(product.price)}
            </span>
            <div className="inline-flex items-center gap-2 rounded-xl bg-faith-gold/15 px-3.5 py-1.5 text-sm text-faith-black">
              <Package className="h-4 w-4 text-faith-gold" />
              {outOfStock ? (
                <span>Out of stock</span>
              ) : (
                <span>
                  Quantity available:{" "}
                  <span className="font-semibold">
                    {product.quantity} {product.quantity === 1 ? "unit" : "units"}
                  </span>
                </span>
              )}
            </div>
          </div>

          <p className="mb-8 text-base leading-relaxed text-faith-slate md:text-lg">
            {product.shortDescription}
          </p>

          {product.details.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 font-serif text-lg font-bold text-faith-black">Product Information</h2>
              <dl className="overflow-hidden rounded-xl border border-faith-slate/15 divide-y divide-faith-slate/15">
                {product.details.map((detail) => (
                  <div
                    key={detail.label}
                    className="grid grid-cols-1 gap-1 bg-faith-gray/40 px-5 py-3.5 sm:grid-cols-3 sm:gap-4"
                  >
                    <dt className="text-sm text-faith-slate">{detail.label}</dt>
                    <dd className="font-medium text-faith-black sm:col-span-2">{detail.value}</dd>
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

      <div className="mt-14 space-y-8 md:mt-16">
        <section className="rounded-2xl bg-faith-white p-6 shadow-lg md:p-8">
          <h2 className="mb-2 font-serif text-2xl font-bold text-faith-black">Description</h2>
          <div className="mb-5 h-1.5 w-20 rounded-full bg-faith-gold" />
          <div className="space-y-4 text-base leading-relaxed text-faith-slate md:text-lg">
            {product.description.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-faith-white p-6 shadow-lg md:p-8">
          <h2 className="mb-2 font-serif text-2xl font-bold text-faith-black">FAQs</h2>
          <div className="mb-5 h-1.5 w-20 rounded-full bg-faith-gold" />
          <Accordion type="single" collapsible className="w-full">
            {product.faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium text-faith-black hover:text-faith-blue hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-faith-slate">
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
