import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DonatePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Support Our Ministry</h1>
          <p className="max-w-2xl mx-auto">
            Your generous donations help us continue our mission of spreading hope, faith, and transformation in our
            community and beyond.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Why Give?</h2>
              <p className="text-gray-700 mb-6">
                House Of Overflow relies on the generosity of people like you to continue our mission of nurturing lives
                and creating a meaningful impact in our community.
              </p>
              <p className="text-gray-700 mb-6">Your donations support:</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <div className="bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-white mt-1">
                    ✓
                  </div>
                  <span>Community outreach programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-white mt-1">
                    ✓
                  </div>
                  <span>Youth and children's ministries</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-white mt-1">
                    ✓
                  </div>
                  <span>Worship and sermon resources</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-white mt-1">
                    ✓
                  </div>
                  <span>Building maintenance and improvements</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-white mt-1">
                    ✓
                  </div>
                  <span>Mission trips and global outreach</span>
                </li>
              </ul>
              <p className="text-gray-700">
                Your gift, no matter the size, makes a difference in the lives of many. Thank you for your support!
              </p>
            </div>
            <div>
              <Tabs defaultValue="one-time" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="one-time">One-Time Gift</TabsTrigger>
                  <TabsTrigger value="recurring">Recurring Gift</TabsTrigger>
                </TabsList>
                <TabsContent value="one-time">
                  <Card>
                    <CardHeader>
                      <CardTitle>Make a One-Time Donation</CardTitle>
                      <CardDescription>Support our ministry with a single contribution.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline">$25</Button>
                        <Button variant="outline">$50</Button>
                        <Button variant="outline">$100</Button>
                        <Button variant="outline">$250</Button>
                        <Button variant="outline">$500</Button>
                        <Button variant="outline">$1000</Button>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Custom Amount</label>
                        <Input type="number" placeholder="Enter amount" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Name</label>
                        <Input type="text" placeholder="Your full name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Email</label>
                        <Input type="email" placeholder="Your email address" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Donate Now</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="recurring">
                  <Card>
                    <CardHeader>
                      <CardTitle>Set Up Recurring Giving</CardTitle>
                      <CardDescription>Support our ministry with regular contributions.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline">$10/mo</Button>
                        <Button variant="outline">$25/mo</Button>
                        <Button variant="outline">$50/mo</Button>
                        <Button variant="outline">$100/mo</Button>
                        <Button variant="outline">$250/mo</Button>
                        <Button variant="outline">$500/mo</Button>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Custom Monthly Amount</label>
                        <Input type="number" placeholder="Enter amount" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Name</label>
                        <Input type="text" placeholder="Your full name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Email</label>
                        <Input type="email" placeholder="Your email address" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Set Up Monthly Giving</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
