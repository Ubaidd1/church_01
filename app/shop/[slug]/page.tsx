import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllProducts, getProductBySlug } from "@/data/products"
import ProductDetails from "@/components/shop/ProductDetails"

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllProducts().map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: "Product Not Found | The House Of Overflow",
    }
  }

  return {
    title: `${product.title} | Shop | The House Of Overflow`,
    description: product.shortDescription,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col">
      <section className="pb-16 pt-28 md:pb-24 md:pt-32">
        <div className="container mx-auto px-4">
          <ProductDetails product={product} />
        </div>
      </section>
    </main>
  )
}
