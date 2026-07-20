import type { Product } from "@/data/products"

function getApiBaseUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:4000"
  return url.replace(/\/$/, "")
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${getApiBaseUrl()}/api/products`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  })

  const data = (await response.json().catch(() => null)) as
    | { success?: boolean; products?: Product[]; message?: string }
    | null

  if (!response.ok) {
    throw new Error(data?.message || "Unable to load products.")
  }

  return data?.products ?? []
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/products/${encodeURIComponent(slug)}`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    }
  )

  if (response.status === 404) {
    return null
  }

  const data = (await response.json().catch(() => null)) as
    | { success?: boolean; product?: Product; message?: string }
    | null

  if (!response.ok) {
    throw new Error(data?.message || "Unable to load product.")
  }

  return data?.product ?? null
}

export async function fetchProductMap(): Promise<Map<string, Product>> {
  const products = await fetchProducts()
  return new Map(products.map((product) => [product.id, product]))
}
