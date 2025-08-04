import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function SermonsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Sermons</h1>
          <p className="max-w-2xl mx-auto">
            Explore our collection of inspiring messages that will help you grow in your faith and deepen your
            relationship with God.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((sermon) => (
              <Card key={sermon} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`/placeholder.svg?height=400&width=600&query=sermon+presentation`}
                    alt={`Sermon ${sermon}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-2">April 21, 2025</div>
                  <h3 className="text-xl font-bold mb-2">Finding Purpose in God's Plan</h3>
                  <p className="text-gray-700 mb-4">
                    Discover how God's purpose for your life can bring fulfillment and direction in times of
                    uncertainty.
                  </p>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="#">Watch</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="#">Download</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
