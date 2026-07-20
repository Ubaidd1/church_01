import axios from "axios"
import { api, getApiErrorMessage } from "@/lib/api"

export type CheckoutCartItem = {
  productId: string
  quantity: number
}

export type CreateCheckoutSessionPayload = {
  customerName: string
  customerEmail: string
  cartItems: CheckoutCartItem[]
  shippingFee?: number
}

export type CreateCheckoutSessionResponse = {
  checkoutUrl: string
  sessionId?: string
}

export type OrderProductLine = {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  subtotal: number
}

export type PublicOrder = {
  id: string
  customerName: string
  customerEmail: string
  products: OrderProductLine[]
  subtotal: number
  shippingFee: number
  totalAmount: number
  currency: string
  stripeSessionId: string
  stripePaymentIntentId?: string
  paymentStatus: string
  orderStatus: string
  createdAt: string
}

export async function createCheckoutSession(
  payload: CreateCheckoutSessionPayload
): Promise<CreateCheckoutSessionResponse> {
  try {
    const { data } = await api.post<CreateCheckoutSessionResponse>(
      "/api/payment/create-checkout-session",
      payload
    )

    if (!data?.checkoutUrl) {
      throw new Error("Checkout session did not return a redirect URL.")
    }

    return {
      checkoutUrl: data.checkoutUrl,
      sessionId: data.sessionId,
    }
  } catch (error) {
    throw new Error(
      getApiErrorMessage(error, "Unable to start checkout. Please try again.")
    )
  }
}

export async function fetchOrderBySessionId(
  sessionId: string
): Promise<PublicOrder | null> {
  try {
    const { data } = await api.get<{
      success?: boolean
      order?: PublicOrder
      message?: string
    }>(`/api/payment/order/${encodeURIComponent(sessionId)}`)

    return data.order ?? null
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null
    }
    throw new Error(getApiErrorMessage(error, "Unable to load order details."))
  }
}

/** Poll until webhook has saved the order (or timeout). */
export async function waitForOrderBySessionId(
  sessionId: string,
  options?: { attempts?: number; delayMs?: number }
): Promise<PublicOrder | null> {
  const attempts = options?.attempts ?? 8
  const delayMs = options?.delayMs ?? 750

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const order = await fetchOrderBySessionId(sessionId)
    if (order) {
      return order
    }
    if (attempt < attempts) {
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }

  return null
}
