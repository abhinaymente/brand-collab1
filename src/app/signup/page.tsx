"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

function SignupForm() {
    const searchParams = useSearchParams()
    // Default to branding if 'brand' else influencer. If nothing, default to influencer? 
    // Let's use state to toggle.
    const initialRole = searchParams.get("role") === "brand" ? "brand" : "influencer"
    const [role, setRole] = useState<"brand" | "influencer">(initialRole)

    // Update effect if param changes, though state init handles page load
    useEffect(() => {
        if (searchParams.get("role") === "brand") setRole("brand")
        else if (searchParams.get("role") === "influencer") setRole("influencer")
    }, [searchParams])

    return (
        <Card className="w-full max-w-md border-muted">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                    Join as a Brand or Creator to start collaborating
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Role Toggles */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-secondary rounded-lg mb-4">
                    <button
                        onClick={() => setRole("brand")}
                        className={cn(
                            "text-sm font-medium py-2 rounded-md transition-all",
                            role === "brand" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Brand
                    </button>
                    <button
                        onClick={() => setRole("influencer")}
                        className={cn(
                            "text-sm font-medium py-2 rounded-md transition-all",
                            role === "influencer" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Creator
                    </button>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="name">
                            {role === "brand" ? "Company Name" : "Full Name"}
                        </label>
                        <input
                            id="name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            type="text"
                            placeholder={role === "brand" ? "Acme Inc." : "Jane Doe"}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="email">Work Email</label>
                        <input
                            id="email"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            type="email"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
                        <input
                            id="password"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            type="password"
                        />
                    </div>
                    <Button className="w-full" asChild>
                        {/* Mock signup - link to dashboard */}
                        <Link href="/dashboard">Create Account</Link>
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center text-sm text-muted-foreground">
                Already have an account? <Link href="/login" className="ml-1 underline hover:text-primary">Log in</Link>
            </CardFooter>
        </Card>
    )
}

export default function SignupPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-4">
                <Suspense fallback={<div>Loading...</div>}>
                    <SignupForm />
                </Suspense>
            </div>
        </div>
    )
}
