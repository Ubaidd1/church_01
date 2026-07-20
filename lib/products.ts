import axios from "axios"
import type { Product } from "@/data/products"
import { api, getApiErrorMessage } from "@/lib/api"

export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data } = await api.get<{
      success?: boolean
      products?: Product[]
      message?: string
    }>("/api/products")

    return data.products ?? []
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to load products."))
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data } = await api.get<{
      success?: boolean
      product?: Product
      message?: string
    }>(`/api/products/${encodeURIComponent(slug)}`)

    return data.product ?? null
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null
    }
    throw new Error(getApiErrorMessage(error, "Unable to load product."))
  }
}

export async function fetchProductMap(): Promise<Map<string, Product>> {
  const products = await fetchProducts()
  return new Map(products.map((product) => [product.id, product]))
}
