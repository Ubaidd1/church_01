import Link from "next/link"
import Image from "next/image"
import { Instagram, Youtube, Phone, Mail, Clock, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-faith-slate to-faith-black text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-faith-blue/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-faith-gold/10 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Newsletter Section */}
        <div className="max-w-4xl mx-auto mb-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2 font-serif">Subscribe to Our Newsletter</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Stay updated with weekly devotionals, upcoming events, and inspirational messages.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-faith-gold focus:ring-faith-gold"
            />
            <Button className="bg-faith-gold hover:bg-faith-gold/90 text-faith-black font-medium whitespace-nowrap shadow-md">
              Subscribe
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="bg-white p-2 rounded-xl shadow-lg transform transition-transform group-hover:scale-105">
                <Image src="/images/logo.png" alt="House Of Overflow" width={40} height={40} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white tracking-wide">The House Of Overflow</span>
                <span className="text-xs text-faith-gold">Faith • Purpose • Transformation</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6">
              With a foundation built on faith, The House Of Overflow is devoted to helping individuals find hope and
              clarity, no matter where they are in life.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://www.instagram.com/reel/DIfq_7pOSKi/?igsh=bDk1eTdkNDhjMnUw"
                target="_blank"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors shadow-sm"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="http://www.youtube.com/@thehouseofoverflow"
                target="_blank"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors shadow-sm"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Image
                src="/church_bottom.png"
                alt="The Seal of the Apostle Neil C. Pereira"
                width={92}
                height={200}
                className="h-11 w-auto object-contain"
              />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6 flex items-center font-serif">
              <span className="h-1.5 w-6 bg-faith-gold rounded-full mr-3"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="flex items-center text-gray-300 hover:text-white transition-colors group">
                  <ChevronRight className="h-4 w-4 mr-2 text-faith-gold group-hover:translate-x-1 transition-transform" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="flex items-center text-gray-300 hover:text-white transition-colors group"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-faith-gold group-hover:translate-x-1 transition-transform" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#ministries"
                  className="flex items-center text-gray-300 hover:text-white transition-colors group"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-faith-gold group-hover:translate-x-1 transition-transform" />
                  Ministries
                </Link>
              </li>
              <li>
                <Link
                  href="#events"
                  className="flex items-center text-gray-300 hover:text-white transition-colors group"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-faith-gold group-hover:translate-x-1 transition-transform" />
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="flex items-center text-gray-300 hover:text-white transition-colors group"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-faith-gold group-hover:translate-x-1 transition-transform" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6 flex items-center font-serif">
              <span className="h-1.5 w-6 bg-faith-gold rounded-full mr-3"></span>
              Service Times
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <div className="bg-faith-gold/10 rounded-xl p-3 text-faith-gold shadow-sm">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-white">Sunday Worship</div>
                  <div className="text-gray-300">10:00 AM</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-faith-gold/10 rounded-xl p-3 text-faith-gold shadow-sm">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-white">Bible Study</div>
                  <div className="text-gray-300">Wednesday, 6:30 PM</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-faith-gold/10 rounded-xl p-3 text-faith-gold shadow-sm">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-white">Youth Group</div>
                  <div className="text-gray-300">Coming Soon</div>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6 flex items-center font-serif">
              <span className="h-1.5 w-6 bg-faith-gold rounded-full mr-3"></span>
              Contact Us
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <div className="bg-faith-gold/10 rounded-xl p-3 text-faith-gold shadow-sm">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-white">Phone</div>
                  <div className="text-gray-300">(555) 123-4567</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-faith-gold/10 rounded-xl p-3 text-faith-gold shadow-sm">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-white">Email</div>
                  <div className="text-gray-300">Staff@thehouseofoverflow.org</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} The House Of Overflow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
