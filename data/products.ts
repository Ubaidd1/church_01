export type Product = {
  id: string
  title: string
  slug: string
  image: string
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
    image: "/shop/ar_11.png",
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
  {
    id: "2",
    title: "Faith Driven Crewneck",
    slug: "faith-driven-crewneck",
    image: "/shop/ar_1.png",
    price: 39.99,
    quantity: 18,
    shortDescription:
      "Premium quality apparel designed to inspire — comfort fit with faith at the center.",
    description:
      "Crafted for believers who live boldly, the Faith Driven Crewneck brings together premium quality and everyday comfort. Featuring The House of Overflow branding and an acid-wash finish that stands out without shouting, this piece is made to inspire conversations and remind you of your purpose wherever you go.",
    details: [
      { label: "Category", value: "Apparel" },
      { label: "Style", value: "Crewneck Sweatshirt" },
      { label: "Finish", value: "Acid / Mineral Wash" },
      { label: "Fit", value: "Comfort Fit" },
      { label: "Care", value: "Machine wash cold, tumble dry low" },
    ],
  },
  {
    id: "3",
    title: "Overflow Emblem Sweatshirt",
    slug: "overflow-emblem-sweatshirt",
    image: "/shop/ar_11.png",
    price: 42.99,
    quantity: 32,
    shortDescription:
      "Signature House of Overflow emblem on a soft, structured sweatshirt built for daily wear.",
    description:
      "The Overflow Emblem Sweatshirt showcases our signature two-block logo and wordmark on a soft, structured body. Ribbed cuffs and hem keep the classic silhouette clean, while the mineral-wash texture gives every piece a unique character. A wardrobe staple for anyone connected to The House of Overflow community.",
    details: [
      { label: "Category", value: "Apparel" },
      { label: "Style", value: "Crewneck Sweatshirt" },
      { label: "Finish", value: "Mineral Wash" },
      { label: "Fit", value: "Classic Fit" },
      { label: "Care", value: "Machine wash cold, tumble dry low" },
    ],
  },
  {
    id: "4",
    title: "Purpose & Transformation Pullover",
    slug: "purpose-transformation-pullover",
    image: "/shop/ar_1.png",
    price: 44.99,
    quantity: 12,
    shortDescription:
      "Limited stock pullover celebrating faith, purpose, and transformation.",
    description:
      "Faith. Purpose. Transformation. This limited-run pullover captures the heart of The House of Overflow in a wearable form. With a premium feel and distinctive wash, it is designed for those who want their everyday clothing to reflect the journey they are on — and the community they belong to.",
    details: [
      { label: "Category", value: "Apparel" },
      { label: "Style", value: "Pullover Sweatshirt" },
      { label: "Finish", value: "Acid Wash" },
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
