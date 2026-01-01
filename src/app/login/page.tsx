import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import Link from "next/link"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md border-muted">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Welcome back</CardTitle>
                        <CardDescription>
                            Enter your credentials to access your dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
                            <input
                                id="email"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="name@example.com"
                                type="email"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
                            <input
                                id="password"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                type="password"
                            />
                        </div>
                        <Button className="w-full" asChild>
                            {/* Mock login - link to dashboard */}
                            <Link href="/dashboard">Sign In</Link>
                        </Button>
                    </CardContent>
                    <CardFooter className="flex justify-center text-sm text-muted-foreground">
                        Don't have an account? <Link href="/signup" className="ml-1 underline hover:text-primary">Sign up</Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
