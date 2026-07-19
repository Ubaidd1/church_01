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
  faqs: {
    question: string
    answer: string
  }[]
  reviews: {
    id: string
    name: string
    rating: number
    date: string
    comment: string
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
      "Wear your faith. Live with purpose. Overflow everywhere. This premium acid-wash crewneck features The House of Overflow signature emblem on the left chest — a bold reminder of who you are and whose you are. Soft, structured, and made for everyday wear, it pairs comfort with conviction whether you are headed to Sunday service, midweek gathering, or simply living out your calling through the week.\n\nEach piece is finished with a unique acid/mineral wash, so no two sweatshirts look exactly the same. Ribbed cuffs and hem keep the classic silhouette clean, while the midweight fabric holds its shape wash after wash.",
    details: [
      { label: "Category", value: "Apparel" },
      { label: "Style", value: "Crewneck Sweatshirt" },
      { label: "Finish", value: "Acid / Mineral Wash" },
      { label: "Fit", value: "Comfort Fit" },
      { label: "Care", value: "Machine wash cold, tumble dry low" },
    ],
    faqs: [
      {
        question: "What sizes are available?",
        answer:
          "This crewneck is currently offered in a comfort fit. Check the product information section for fit details, and reach out to us if you need help choosing the right size.",
      },
      {
        question: "How should I care for the acid-wash finish?",
        answer:
          "Machine wash cold and tumble dry low. Wash inside out to help preserve the emblem print and the unique mineral-wash texture.",
      },
      {
        question: "Will every sweatshirt look exactly the same?",
        answer:
          "No. The acid/mineral wash creates natural variation, so each piece has its own character while keeping the same House of Overflow emblem and overall look.",
      },
      {
        question: "How long does shipping take?",
        answer:
          "Orders are typically processed within a few business days. Shipping times vary by location. You will receive a confirmation once your order is placed.",
      },
    ],
    reviews: [
      {
        id: "r1",
        name: "Jordan M.",
        rating: 5,
        date: "June 12, 2026",
        comment:
          "Soft, well-made, and the emblem looks sharp. I wear it to service and throughout the week. Already thinking about ordering another.",
      },
      {
        id: "r2",
        name: "Alicia R.",
        rating: 5,
        date: "May 28, 2026",
        comment:
          "The wash is beautiful and the fit is comfortable without feeling bulky. Great quality for the price.",
      },
      {
        id: "r3",
        name: "Chris T.",
        rating: 4,
        date: "May 3, 2026",
        comment:
          "Really solid crewneck. Runs true to size for me. Love representing The House Of Overflow.",
      },
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
