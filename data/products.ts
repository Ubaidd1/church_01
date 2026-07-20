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

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}
