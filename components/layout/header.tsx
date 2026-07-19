import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function Header() {
  return (
    <header className="absolute top-0 z-50 w-full">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-white p-2 rounded-lg shadow-lg transform transition-transform group-hover:scale-105">
              <Image src="/images/logo.png" alt="House Of Overflow" width={40} height={40} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-white tracking-wide">The House Of Overflow</span>
              <span className="text-xs text-amber-300">Faith • Purpose • Transformation</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center">
            <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-2 flex items-center gap-1">
              <Link
                href="/"
                className="text-white font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-white font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="#ministries"
                className="text-white font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
              >
                Ministries
              </Link>
              <Link
                href="#events"
                className="text-white font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
              >
                Events
              </Link>
              <Link
                href="/shop"
                className="text-white font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
              >
                Shop
              </Link>
              <Link
                href="#contact"
                className="text-white font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
              >
                Contact
              </Link>
            </div>
          </nav>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="outline"
                size="icon"
                className="text-white border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gradient-to-b from-blue-900 to-blue-950 text-white border-none">
              <div className="flex items-center gap-3 mb-8 mt-4">
                <div className="bg-white p-2 rounded-lg">
                  <Image src="/images/logo.png" alt="House Of Overflow" width={32} height={32} />
                </div>
                <span className="font-bold text-xl">The House Of Overflow</span>
              </div>
              <nav className="flex flex-col gap-2">
                <Link href="/" className="text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
                  Home
                </Link>
                <Link
                  href="#about"
                  className="text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="#ministries"
                  className="text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Ministries
                </Link>
                <Link
                  href="#events"
                  className="text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Events
                </Link>
                <Link
                  href="#contact"
                  className="text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Contact
                </Link>
                <Link
                  href="/shop"
                  className="text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Shop
                </Link>
              </nav>

              <div className="mt-auto pt-8">
                <div className="text-sm text-white/70 mb-2">Service Times</div>
                <div className="text-sm mb-1">Sunday: 10:00 AM</div>
                <div className="text-sm">Wednesday: 6:30 PM</div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
