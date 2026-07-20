import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, Clock, Users, BookOpen, ImageIcon, ArrowRight, Calendar, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-faith-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background image with enhanced overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-faith-black/60 via-faith-black/40 to-faith-black/70 z-10"></div>
        <div className="absolute inset-0 bg-faith-blue/10 mix-blend-overlay z-10"></div>
        <Image src="/church-interior.png" alt="Church interior" fill className="object-cover" priority quality={100} />

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-faith-blue/10 rounded-full blur-3xl z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-faith-gold/10 rounded-full blur-3xl z-10"></div>

        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          {/* Subtle animation for text elements */}
          <div className="space-y-6 max-w-4xl animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-faith-white leading-tight font-serif">
              Welcome to <span className="text-faith-gold">The House Of Overflow</span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-2">A Place for Faith, Purpose, and Transformation</p>
            <p className="text-xl text-white/80 mb-8">Join us for worship online every Sunday 4PM EST</p>

            <div className="flex flex-col sm:flex-row gap-5 mt-8 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-faith-blue hover:bg-faith-blue/90 rounded-xl px-8 py-6 text-base font-medium shadow-lg hover:shadow-faith-blue/30 transition-all"
              >
                <Link href="#contact">Follow Us</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-faith-gold/20 text-faith-gold border-faith-gold/50 hover:bg-faith-gold/30 rounded-xl px-8 py-6 text-base font-medium backdrop-blur-sm transition-all"
              >
                <Link href="https://www.youtube.com/@thehouseofoverflow" target="_blank">
                  Watch Sermons
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-8 h-14 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-scroll-down"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-faith-gray/50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-faith-slate/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-faith-gold/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl font-bold text-faith-black font-serif">About Us</h2>
            <div className="h-1.5 w-48 bg-faith-gold mt-3 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-t from-faith-black/40 to-transparent z-10"></div>
              <Image
                src="/church-leadership-new.jpg"
                alt="Church leadership team"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 text-white z-20">
                <p className="text-lg font-medium">Our Leadership Team</p>
                <p className="text-sm opacity-90">Guiding with faith and compassion</p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-faith-slate text-lg leading-relaxed">
                <span className="text-faith-blue font-semibold">The House Of Overflow</span> is a non profit
                organization that embodies dedication and service in all aspects of its mission. Much like a cornerstone
                within its community, The House Of Overflow is committed to nurturing lives and creating a meaningful
                impact.
              </p>

              <p className="text-faith-slate text-lg leading-relaxed">
                Rooted in a spirit of compassion and spiritual growth, The House Of Overflow extends its reach beyond
                physical locations, guiding people toward a life of faith and purpose. Its leadership passionately
                inspires and uplifts others, offering unwavering support, encouragement, and a message grounded in
                transformation through Christ.
              </p>

              <blockquote className="border-l-4 border-faith-gold pl-6 py-3 italic text-lg text-faith-slate bg-faith-gold/5 rounded-r-lg my-8">
                "With a foundation built on faith, The House Of Overflow is devoted to helping individuals find hope and
                clarity, no matter where they are in life."
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="flex flex-col items-center gap-3 bg-faith-white p-5 rounded-xl transition-all hover:bg-white hover:shadow-md text-center group">
                  <div className="bg-faith-blue text-white p-3 rounded-xl transform transition-transform group-hover:scale-110 shadow-md">
                    <Users className="h-7 w-7" />
                  </div>
                  <span className="font-medium text-faith-black">Welcome to the Community.</span>
                </div>

                <div className="flex flex-col items-center gap-3 bg-faith-white p-5 rounded-xl transition-all hover:bg-white hover:shadow-md text-center group">
                  <div className="bg-faith-blue text-white p-3 rounded-xl transform transition-transform group-hover:scale-110 shadow-md">
                    <BookOpen className="h-7 w-7" />
                  </div>
                  <span className="font-medium text-faith-black">Biblical Teaching</span>
                </div>

                <div className="flex flex-col items-center gap-3 bg-faith-white p-5 rounded-xl transition-all hover:bg-white hover:shadow-md text-center group">
                  <div className="bg-faith-blue text-white p-3 rounded-xl transform transition-transform group-hover:scale-110 shadow-md">
                    <ImageIcon className="h-7 w-7" />
                  </div>
                  <span className="font-medium text-faith-black">Missionary Goals</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ministries Section */}
      <section
        id="ministries"
        className="py-24 bg-gradient-to-br from-faith-slate to-faith-black text-white relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-faith-blue/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-faith-gold/10 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center mb-16">
            <span className="text-faith-gold font-medium mb-2">GROW WITH US</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">Our Ministries</h2>
            <div className="h-1.5 w-32 bg-faith-gold mb-6 rounded-full"></div>
            <p className="text-center text-gray-300 max-w-3xl mx-auto text-lg">
              Explore the various ways you can get involved, serve, and grow spiritually at House Of Overflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-faith-blue/10 transition-all duration-300 hover:translate-y-[-8px] group">
              <div className="h-56 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-faith-black/80 to-transparent z-10"></div>
                <Image
                  src="/join-us-blocks.jpg"
                  alt="Youth Ministry - Join Us"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-faith-gold text-faith-black text-xs font-bold px-3 py-1 rounded-lg z-20">
                  FOR CHILDREN
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-white font-serif">Youth Ministry</h3>
                <p className="text-gray-300 mb-6">
                  Providing a safe, fun environment where children can learn about God's love through creative
                  activities and meaningful discussions.
                </p>
                <Button
                  variant="link"
                  className="p-0 text-faith-gold group-hover:text-faith-gold/80 flex items-center gap-2"
                >
                  Learn More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-faith-blue/10 transition-all duration-300 hover:translate-y-[-8px] group">
              <div className="h-56 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-faith-black/80 to-transparent z-10"></div>
                <Image
                  src="/vibrant-church-ensemble.png"
                  alt="Worship Ministry"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-faith-blue text-white text-xs font-bold px-3 py-1 rounded-lg z-20">
                  FOR EVERYONE
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-white font-serif">Worship Ministry</h3>
                <p className="text-gray-300 mb-6">
                  Creating an atmosphere of worship through music, prayer, and creative expressions of faith.
                </p>
                <Button
                  variant="link"
                  className="p-0 text-faith-gold group-hover:text-faith-gold/80 flex items-center gap-2"
                >
                  Learn More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-faith-blue/10 transition-all duration-300 hover:translate-y-[-8px] group">
              <div className="h-56 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-faith-black/80 to-transparent z-10"></div>
                <Image
                  src="/diverse-volunteers-helping.png"
                  alt="Outreach Ministry"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-lg z-20">
                  COMMUNITY
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-white font-serif">Outreach Ministry</h3>
                <p className="text-gray-300 mb-6">
                  Serving our local community with God's love through community service and compassionate care.
                </p>
                <Button
                  variant="link"
                  className="p-0 text-faith-gold group-hover:text-faith-gold/80 flex items-center gap-2"
                >
                  Learn More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button
              asChild
              className="bg-faith-gold hover:bg-faith-gold/90 text-faith-black rounded-xl px-8 py-6 text-base font-medium shadow-lg hover:shadow-faith-gold/30 transition-all"
            >
              <Link href="#contact">Get Involved Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 bg-faith-gray relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-faith-gold/5 rounded-full -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-faith-slate/5 rounded-full translate-y-1/2 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center mb-16">
            <span className="text-faith-blue font-medium mb-2">JOIN US</span>
            <h2 className="text-4xl md:text-5xl font-bold text-faith-black mb-4 text-center font-serif">
              Upcoming Events
            </h2>
            <div className="h-1.5 w-32 bg-faith-gold mb-6 rounded-full"></div>
            <p className="text-center text-faith-slate max-w-3xl mx-auto text-lg">
              Join us for these upcoming gatherings and become part of our church community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-faith-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:translate-y-[-8px] group">
              <div className="aspect-square relative">
                <div className="absolute inset-0 bg-gradient-to-t from-faith-black/50 to-transparent z-10"></div>
                <Image
                  src="/sunday-worship-leaders.jpg"
                  alt="Sunday Worship Service"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-faith-blue text-white text-xs font-bold px-3 py-1 rounded-lg z-20 flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> WEEKLY
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-faith-gold/20 text-faith-gold text-sm font-medium px-3 py-1 rounded-lg">
                    Every Sunday
                  </div>
                  <div className="text-sm text-faith-slate">10:00 AM - 12:00 PM</div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-faith-black font-serif">Sunday Worship Service</h3>
                <p className="text-faith-slate mb-6">
                  Join us for a time of inspirational worship, powerful teaching, and fellowship with our church family.
                </p>
                <Button
                  variant="link"
                  className="p-0 text-faith-blue group-hover:text-faith-blue/80 flex items-center gap-2 justify-start"
                  asChild
                >
                  <Link href="https://www.youtube.com/@thehouseofoverflow" target="_blank">
                    Learn More <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="bg-faith-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:translate-y-[-8px] group">
              <div className="aspect-square relative">
                <div className="absolute inset-0 bg-gradient-to-t from-faith-black/50 to-transparent z-10"></div>
                <Image
                  src="/diverse-bible-study.png"
                  alt="Weekly Bible Study"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-faith-blue text-white text-xs font-bold px-3 py-1 rounded-lg z-20 flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> WEEKLY
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-faith-gold/20 text-faith-gold text-sm font-medium px-3 py-1 rounded-lg">
                    Every Wednesday
                  </div>
                  <div className="text-sm text-faith-slate">6:30 PM - 7:30 PM</div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-faith-black font-serif">Weekly Bible Study</h3>
                <p className="text-faith-slate mb-6">
                  Dive deeper into God's Word with our midweek Bible study to grow in your understanding of scripture.
                </p>
                <Button
                  variant="link"
                  className="p-0 text-faith-blue group-hover:text-faith-blue/80 flex items-center gap-2"
                >
                  Learn More <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            <div className="bg-faith-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:translate-y-[-8px] group">
              <div className="aspect-square relative">
                <div className="absolute inset-0 bg-gradient-to-t from-faith-black/50 to-transparent z-10"></div>
                <Image
                  src="/join-us-blocks.jpg"
                  alt="Youth Night"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-faith-blue text-white text-xs font-bold px-3 py-1 rounded-lg z-20 flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> WEEKLY
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-faith-gold/20 text-faith-gold text-sm font-medium px-3 py-1 rounded-lg">
                    Coming Soon
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-faith-black font-serif">Youth Night</h3>
                <p className="text-faith-slate mb-6">
                  A fun night for teens with games, worship, and relevant teaching designed especially for young people.
                </p>
                <Button
                  variant="link"
                  className="p-0 text-faith-blue group-hover:text-faith-blue/80 flex items-center gap-2"
                >
                  Learn More <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button
              asChild
              className="bg-faith-blue hover:bg-faith-blue/90 text-white rounded-xl px-8 py-6 text-base font-medium shadow-lg hover:shadow-faith-blue/30 transition-all"
            >
              <Link href="/">Donate Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section id="watch" className="py-24 bg-faith-gray relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-faith-gold/5 rounded-full -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-faith-slate/5 rounded-full translate-y-1/2 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center mb-12">
            <span className="text-faith-blue font-medium mb-2">WATCH &amp; WORSHIP</span>
            <h2 className="text-4xl md:text-5xl font-bold text-faith-black mb-4 text-center font-serif">
              Featured Message
            </h2>
            <div className="h-1.5 w-32 bg-faith-gold mb-6 rounded-full"></div>
            <p className="text-center text-faith-slate max-w-3xl mx-auto text-lg">
              Join us online and experience this message from The House Of Overflow.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl bg-faith-black">
              <iframe
                src="https://www.youtube.com/embed/6KCZNpABxVI"
                title="The House Of Overflow — Featured Message"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>

            <div className="mt-10 text-center">
              <Button
                asChild
                className="bg-faith-blue hover:bg-faith-blue/90 text-white rounded-xl px-8 py-6 text-base font-medium shadow-lg hover:shadow-faith-blue/30 transition-all"
              >
                <Link href="https://www.youtube.com/@TheHouseOfOverflow" target="_blank" rel="noopener noreferrer">
                  More Sermons on YouTube
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-faith-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-faith-slate/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-faith-gold/10 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center mb-16">
            <span className="text-faith-blue font-medium mb-2">GET IN TOUCH</span>
            <h2 className="text-4xl md:text-5xl font-bold text-faith-black mb-4 text-center font-serif">Contact Us</h2>
            <div className="h-1.5 w-32 bg-faith-gold mb-6 rounded-full"></div>
            <p className="text-center text-faith-slate max-w-3xl mx-auto text-lg">
              We'd love to hear from you! Reach out with any questions, prayer requests, or to learn more about our
              church.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="bg-faith-white rounded-2xl shadow-xl p-8 md:p-10 transform transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-faith-black font-serif">Send Us a Message</h3>

              <Button
                asChild
                className="bg-faith-blue hover:bg-faith-blue/90 text-white rounded-xl px-8 py-6 text-base font-medium shadow-lg hover:shadow-faith-blue/30 transition-all group"
              >
                <a href="mailto:Staff@thehouseofoverflow.org" className="flex items-center gap-3">
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Staff@thehouseofoverflow.org
                </a>
              </Button>
            </div>

            <div className="space-y-8">
              <div className="bg-faith-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-faith-black font-serif">Church Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-faith-gold/10 p-3 rounded-xl text-faith-gold mr-4 shadow-sm">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-faith-black">Phone</div>
                        <div className="text-faith-slate mt-1">(555) 123-4567</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-faith-gold/10 p-3 rounded-xl text-faith-gold mr-4 shadow-sm">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-faith-black">Email</div>
                        <div className="text-faith-slate mt-1">Staff@thehouseofoverflow.org</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-faith-gold/10 p-3 rounded-xl text-faith-gold mr-4 shadow-sm">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-faith-black">Service Times</div>
                        <div className="text-faith-slate mt-1">
                          Sunday: 10:00 AM - 12:00 PM
                          <br />
                          Wednesday: 6:30 PM - 7:30 PM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
