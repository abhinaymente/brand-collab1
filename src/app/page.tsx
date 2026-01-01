import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import { ArrowRight, Star, TrendingUp, ShieldCheck, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center space-y-10 px-4 py-24 text-center md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-70"></div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Where Top Brands Meet <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Elite Creators
            </span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            The premium platform for secure, high-impact influencer collaborations.
            Streamline your workflow from proposal to payment.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button size="lg" className="px-8 text-lg h-12" asChild>
            <Link href="/signup?role=brand">
              I'm a Brand <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="px-8 text-lg h-12" asChild>
            <Link href="/signup?role=influencer">
              I'm a Creator
            </Link>
          </Button>
        </div>

        {/* Social Proof removed */}
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="border-none shadow-none bg-secondary/30">
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Smart Matching</CardTitle>
              <CardDescription>
                AI-driven discovery to find the perfect creator for your niche.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-none shadow-none bg-secondary/30">
            <CardHeader>
              <ShieldCheck className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Secure Escrow</CardTitle>
              <CardDescription>
                Payments are held safely until work is approved. No risks.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-none shadow-none bg-secondary/30">
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Real-time Analytics</CardTitle>
              <CardDescription>
                Track campaign performance and ROI directly in your dashboard.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/20">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Collab.io. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
