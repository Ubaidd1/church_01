import axios from "axios"

function getApiBaseUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:4000"
  return url.replace(/\/$/, "")
}

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 20000,
})

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message
    if (typeof message === "string" && message.trim()) {
      return message
    }
    if (error.message) {
      return error.message
    }
  }
  if (error instanceof Error && error.message) {
    return error.message
  }
  return fallback
}
