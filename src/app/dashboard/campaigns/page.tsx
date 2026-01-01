import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function CampaignsPage() {
    const campaigns = [
        { id: 1, title: "Summer Collection Launch", status: "Active", applicants: 12, budget: "₹5,000" },
        { id: 2, title: "Tech Gadget Review", status: "Draft", applicants: 0, budget: "₹2,500" },
        { id: 3, title: "Holiday Special Promo", status: "Completed", applicants: 45, budget: "₹10,000" },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">My Campaigns</h2>
                <Button asChild>
                    <Link href="/dashboard/campaigns/new">
                        <Plus className="mr-2 h-4 w-4" /> Create Campaign
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6">
                {campaigns.map((campaign) => (
                    <Card key={campaign.id} className="transition-all hover:border-primary/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="space-y-1">
                                <CardTitle>{campaign.title}</CardTitle>
                                <CardDescription>Budget: {campaign.budget}</CardDescription>
                            </div>
                            <div className={cn(
                                "px-2.5 py-0.5 rounded-full text-xs font-semibold",
                                campaign.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                                    campaign.status === "Draft" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" :
                                        "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                            )}>
                                {campaign.status}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground mt-2">
                                {campaign.applicants} applicants
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {campaigns.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground">
                        No campaigns yet. Create one to get started!
                    </div>
                )}
            </div>
        </div>
    )
}
