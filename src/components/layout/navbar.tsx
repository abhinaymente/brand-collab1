import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                        Collab.io
                    </span>
                </Link>

                <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link href="/campaigns" className="transition-colors hover:text-primary">
                        Find Campaigns
                    </Link>
                    <Link href="/influencers" className="transition-colors hover:text-primary">
                        For Brands
                    </Link>
                    <Link href="/how-it-works" className="transition-colors hover:text-primary">
                        How it Works
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/login">Log in</Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="/signup">Get Started</Link>
                    </Button>
                </div>
            </div>
        </nav>
    )
}
