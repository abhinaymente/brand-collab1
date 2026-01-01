import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// Separator removed
import { Instagram, Youtube, Twitter, Edit } from "lucide-react"
import { cn } from "@/lib/utils"

function SocialStat({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-center space-x-2">
            <div className="p-2 bg-secondary rounded-full">
                <Icon className="h-4 w-4" />
            </div>
            <div>
                <p className="text-sm font-medium leading-none">{label}</p>
                <p className="text-xs text-muted-foreground">{value}</p>
            </div>
        </div>
    )
}

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">My Media Kit</h2>
                <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-12">
                {/* Sidebar Info */}
                <div className="md:col-span-4 lg:col-span-3 space-y-6">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="mx-auto w-24 h-24 rounded-full bg-slate-200 mb-4 flex items-center justify-center text-2xl font-bold text-slate-400">
                                JD
                            </div>
                            <CardTitle>Jane Doe</CardTitle>
                            <CardDescription>Lifestyle & Travel</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground text-center">
                                Creating aesthetic content for brands that value storytelling and authenticity.
                            </p>
                            <div className="flex justify-center flex-wrap gap-2">
                                {/* Tags */}
                                {['Travel', 'Beauty', 'Wellness'].map(tag => (
                                    <span key={tag} className="text-xs border px-2 py-1 rounded-md">{tag}</span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Social Reach</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <SocialStat icon={Instagram} label="Instagram" value="45k Followers" />
                            <SocialStat icon={Youtube} label="YouTube" value="12k Subs" />
                            <SocialStat icon={Twitter} label="Twitter" value="5k Followers" />
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="md:col-span-8 lg:col-span-9 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>About Me</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Hi! I'm Jane. I've been a content creator for 5 years specializing in travel and lifestyle.
                                I love working with brands that focus on sustainability and authentic experiences.
                                My audience is primarily women aged 18-34 located in the US and Europe.
                            </p>
                        </CardContent>
                    </Card>

                    <h3 className="text-lg font-semibold">Portfolio</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="aspect-square bg-muted rounded-md flex items-center justify-center text-muted-foreground hover:opacity-80 transition-opacity cursor-pointer text-sm">
                                Portfolio Item {i}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
