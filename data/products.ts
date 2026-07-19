export type Product = {
  id: string
  title: string
  slug: string
  images: string[]
  price: number
  quantity: number
  description: string
  shortDescription: string
  details: {
    label: string
    value: string
  }[]
}

export const products: Product[] = [
  {
    id: "1",
    title: "Acid Wash Overflow Crewneck",
    slug: "acid-wash-overflow-crewneck",
    images: ["/shop/ar_11.png", "/shop/ar_1.png"],
    price: 39.99,
    quantity: 24,
    shortDescription:
      "Wear your faith. Live with purpose. Premium acid-wash crewneck with the House of Overflow emblem.",
    description:
      "Wear your faith. Live with purpose. Overflow everywhere. This premium acid-wash crewneck features The House of Overflow signature emblem on the left chest — a bold reminder of who you are and whose you are. Soft, structured, and made for everyday wear, it pairs comfort with conviction whether you are headed to Sunday service, midweek gathering, or simply living out your calling through the week.",
    details: [
      { label: "Category", value: "Apparel" },
      { label: "Style", value: "Crewneck Sweatshirt" },
      { label: "Finish", value: "Acid / Mineral Wash" },
      { label: "Fit", value: "Comfort Fit" },
      { label: "Care", value: "Machine wash cold, tumble dry low" },
    ],
  },
]

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getAllProducts(): Product[] {
  return products
}
