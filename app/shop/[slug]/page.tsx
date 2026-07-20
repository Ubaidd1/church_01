import type { Metadata } from "next"
import ProductDetailsClient from "@/components/shop/ProductDetailsClient"

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const title = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")

  return {
    title: `${title} | Shop | The House Of Overflow`,
    description: "Shop faith-inspired merchandise from The House Of Overflow.",
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-faith-slate to-faith-black pt-28 pb-10 text-white md:pt-32">
        <div className="absolute top-0 right-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-faith-blue/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-faith-gold/10 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-faith-gold">Product</p>
          <h1 className="font-serif text-3xl font-bold md:text-4xl">Product Details</h1>
          <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-faith-gold" />
        </div>
      </section>

      <section className="relative overflow-hidden bg-faith-gray/50 py-12 md:py-16">
        <div className="absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-faith-slate/10" />
        <div className="container relative z-10 mx-auto px-4">
          <ProductDetailsClient slug={slug} />
        </div>
      </section>
    </main>
  )
}
