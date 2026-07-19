import { CartProvider } from "@/components/shop/CartProvider"
import CartButton from "@/components/shop/CartButton"

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="relative min-h-screen bg-[#4A5568] text-slate-100">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(148,163,184,0.22), transparent 55%), linear-gradient(180deg, #5A6778 0%, #4A5568 40%, #3F4A5A 100%)",
          }}
        />
        <div className="relative z-10">
          <div className="pointer-events-none fixed right-4 top-24 z-40 md:right-8 md:top-28">
            <div className="pointer-events-auto">
              <CartButton />
            </div>
          </div>
          {children}
        </div>
      </div>
    </CartProvider>
  )
}
