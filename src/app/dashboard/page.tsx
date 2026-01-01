import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CreditCard, Activity, ArrowUpRight, FileText, Bell, TrendingUp } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>

            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹45,231.89</div>
                        <p className="text-xs text-muted-foreground flex items-center text-green-500">
                            +20.1% <ArrowUpRight className="h-3 w-3 ml-1" /> from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12</div>
                        <p className="text-xs text-muted-foreground">
                            3 pending approval
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Influencers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">573</div>
                        <p className="text-xs text-muted-foreground">
                            +201 since last hour
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Proposals</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+57</div>
                        <p className="text-xs text-muted-foreground">
                            +19 new today
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Main Chart Area Placeholder */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                        <CardDescription>
                            Monthly performance overview for the current fiscal year.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] w-full bg-secondary/30 rounded-md flex items-center justify-center text-muted-foreground">
                            <TrendingUp className="h-8 w-8 mr-2" /> Performance Chart Placeholder
                        </div>
                        <div className="mt-4 space-y-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between text-sm">
                                    <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-primary mr-2"></div> Campaign Type {String.fromCharCode(64 + i)}</span>
                                    <span className="font-medium">₹{(Math.random() * 10000).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            You have 3 unread notifications.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {[
                                { user: "Sarah Jenkins", action: "applied to", target: "Summer Launch", time: "2m ago" },
                                { user: "TechReviewer", action: "sent a message", target: "", time: "15m ago" },
                                { user: "System", action: "payout processed for", target: "C#1023", time: "1h ago" },
                                { user: "Anna Smith", action: "reviewed", target: "Beauty Edit", time: "3h ago" },
                                { user: "Mike Ross", action: "declined", target: "Gadget Promo", time: "5h ago" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center">
                                    <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full mr-3 bg-secondary items-center justify-center">
                                        <Users className="h-4 w-4 opacity-50" />
                                    </span>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">{item.user}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {item.action} <span className="font-medium text-foreground">{item.target}</span>
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium text-xs text-muted-foreground">{item.time}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
