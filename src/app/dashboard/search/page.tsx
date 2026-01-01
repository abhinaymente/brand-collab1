import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Search, MapPin, Instagram, Youtube, Twitter } from "lucide-react"
import { Badge } from "@/components/ui/badge" // Need to check if badge exists, if not use span.

export default function SearchPage() {
    const influencers = [
        { id: 1, name: "Lena Rose", niche: "Beauty & Skincare", followers: "125k", engagement: "4.8%", location: "New York, USA", platforms: ["IG", "YT"] },
        { id: 2, name: "TechSavvy Mike", niche: "Tech & Gadgets", followers: "850k", engagement: "2.1%", location: "London, UK", platforms: ["YT", "TW"] },
        { id: 3, name: "Wanderlust Jen", niche: "Travel & Lifestyle", followers: "45k", engagement: "8.5%", location: "Bali, Indonesia", platforms: ["IG"] },
        { id: 4, name: "FitWithSam", niche: "Fitness & Health", followers: "210k", engagement: "6.2%", location: "Los Angeles, USA", platforms: ["IG", "YT"] },
        { id: 5, name: "GamingProX", niche: "Gaming", followers: "1.2M", engagement: "1.5%", location: "Toronto, Canada", platforms: ["TW", "YT"] },
        { id: 6, name: "Chef Mario", niche: "Food & Culinary", followers: "320k", engagement: "3.9%", location: "Rome, Italy", platforms: ["IG"] },
        { id: 7, name: "EcoStyle", niche: "Sustainable Fashion", followers: "68k", engagement: "5.1%", location: "Berlin, Germany", platforms: ["IG"] },
        { id: 8, name: "CryptoKing", niche: "Finance", followers: "15k", engagement: "12%", location: "Dubai, UAE", platforms: ["TW"] },
        { id: 9, name: "FamilyVlogs", niche: "Parenting", followers: "550k", engagement: "2.8%", location: "Austin, USA", platforms: ["YT"] },
    ]

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative flex-1 w-full max-w-lg">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Search by name, niche, or location..."
                    />
                </div>
                <Button>Filter & Sort</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {influencers.map((influencer) => (
                    <Card key={influencer.id} className="group hover:border-primary/50 transition-colors">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-purple-400/20 flex items-center justify-center text-xl font-bold text-primary">
                                {influencer.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <CardTitle className="text-lg group-hover:text-primary transition-colors">{influencer.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{influencer.niche}</p>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3 mr-1" /> {influencer.location}
                            </div>
                            <div className="flex justify-between items-center bg-secondary/30 p-2 rounded-md">
                                <div className="text-center">
                                    <span className="font-bold block text-lg">{influencer.followers}</span>
                                    <span className="text-muted-foreground text-xs uppercase tracking-wider">Followers</span>
                                </div>
                                <div className="h-8 w-[1px] bg-border" />
                                <div className="text-center">
                                    <span className="font-bold block text-lg text-green-600">{influencer.engagement}</span>
                                    <span className="text-muted-foreground text-xs uppercase tracking-wider">Engagement</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {influencer.platforms.includes("IG") && <div className="p-1.5 bg-pink-100 dark:bg-pink-900 rounded-md"><Instagram className="h-4 w-4 text-pink-600 dark:text-pink-300" /></div>}
                                {influencer.platforms.includes("YT") && <div className="p-1.5 bg-red-100 dark:bg-red-900 rounded-md"><Youtube className="h-4 w-4 text-red-600 dark:text-red-300" /></div>}
                                {influencer.platforms.includes("TW") && <div className="p-1.5 bg-blue-100 dark:bg-blue-900 rounded-md"><Twitter className="h-4 w-4 text-blue-600 dark:text-blue-300" /></div>}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">View Profile</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
