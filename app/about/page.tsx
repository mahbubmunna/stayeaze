import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 text-balance">About Stayease</h1>
          <p className="text-xl opacity-90">Simplifying property rentals for travelers and hosts worldwide</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Stayease was founded with a simple mission: to make property rental accessible, affordable, and enjoyable
              for everyone. We believe that finding the perfect place to stay shouldn't be complicated or stressful.
            </p>
            <p>
              In 2024, our team of passionate travel enthusiasts and tech innovators came together to solve the
              frustrations we experienced while booking accommodations worldwide. We saw a gap in the market for a
              platform that truly understood the needs of both travelers and hosts.
            </p>
            <p>
              Today, Stayease connects thousands of travelers with unique properties in over 100 countries, facilitating
              over 50,000 bookings annually. Our commitment to transparency, security, and customer satisfaction remains
              at the heart of everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Integrity</h3>
                <p className="text-muted-foreground">
                  We operate with complete transparency and honesty in all our dealings with travelers and hosts.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Community</h3>
                <p className="text-muted-foreground">
                  We believe in building a welcoming global community where everyone feels valued and respected.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously innovate to make property rental easier and more enjoyable for everyone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {["Sarah", "Marcus", "Emma", "David"].map((name) => (
              <div key={name} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-4xl font-bold">
                  {name[0]}
                </div>
                <h3 className="font-semibold text-foreground">{name}</h3>
                <p className="text-sm text-muted-foreground">Team Member</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Join the Stayease Community</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're looking for your next adventure or want to share your property, we're here to help.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/properties">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                Explore Properties
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Become a Host
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
