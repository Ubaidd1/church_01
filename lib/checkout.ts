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

function getApiBaseUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:4000"
  return url.replace(/\/$/, "")
}

export async function createCheckoutSession(
  payload: CreateCheckoutSessionPayload
): Promise<CreateCheckoutSessionResponse> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/payment/create-checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  )

  const data = (await response.json().catch(() => null)) as
    | (CreateCheckoutSessionResponse & { message?: string })
    | null

  if (!response.ok) {
    throw new Error(data?.message || "Unable to start checkout. Please try again.")
  }

  if (!data?.checkoutUrl) {
    throw new Error("Checkout session did not return a redirect URL.")
  }

  return {
    checkoutUrl: data.checkoutUrl,
    sessionId: data.sessionId,
  }
}

export async function fetchOrderBySessionId(
  sessionId: string
): Promise<PublicOrder | null> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/payment/order/${encodeURIComponent(sessionId)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  )

  if (response.status === 404) {
    return null
  }

  const data = (await response.json().catch(() => null)) as
    | { success?: boolean; order?: PublicOrder; message?: string }
    | null

  if (!response.ok) {
    throw new Error(data?.message || "Unable to load order details.")
  }

  return data?.order ?? null
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
