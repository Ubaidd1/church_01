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
