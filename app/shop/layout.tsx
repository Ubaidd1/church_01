import { CartProvider } from "@/components/shop/CartProvider"
import CartButton from "@/components/shop/CartButton"

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="relative min-h-screen bg-faith-white text-faith-black">
        <div className="pointer-events-none fixed right-4 top-24 z-40 md:right-8 md:top-28">
          <div className="pointer-events-auto">
            <CartButton />
          </div>
        </div>
        {children}
      </div>
    </CartProvider>
  )
}
