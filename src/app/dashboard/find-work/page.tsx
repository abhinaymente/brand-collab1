import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "lucide-react"

export default function FindWorkPage() {
    const opportunities = [
        { title: "Skincare Routine Video", brand: "GlowUp Co.", budget: "₹500 - ₹1k", platform: "TikTok" },
        { title: "Tech Unboxing Series", brand: "GadgetWorld", budget: "₹2k - ₹5k", platform: "YouTube" },
        { title: "Fitness Apparel Ambassadorship", brand: "FitLife", budget: "₹1.5k/mo", platform: "Instagram" },
        { title: "Travel Reel Contest", brand: "Wanderlust", budget: "₹3k", platform: "Instagram" },
    ]

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <h2 className="text-3xl font-bold tracking-tight">Find Work</h2>
                <div className="flex space-x-2">
                    <input
                        className="flex h-10 w-[200px] lg:w-[300px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Search campaigns..."
                    />
                    <Button variant="outline">Filter</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {opportunities.map((job, i) => (
                    <Card key={i} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{job.title}</CardTitle>
                            <CardDescription>{job.brand}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                    {job.platform}
                                </span>
                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                    {job.budget}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Looking for creators with high engagement to promote our new summer line. Must be based in US/UK.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Apply Now</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
