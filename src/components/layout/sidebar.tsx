"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    BarChart3,
    Briefcase,
    FileText,
    LayoutDashboard,
    LogOut,
    MessageSquare,
    Search,
    Settings,
    User
} from "lucide-react"

interface SidebarProps {
    className?: string
    role?: "brand" | "influencer" // Mock role
}

export function Sidebar({ className, role = "brand" }: SidebarProps) {
    const pathname = usePathname()

    const brandLinks = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Campaigns", href: "/dashboard/campaigns", icon: Briefcase },
        { name: "Influencers", href: "/dashboard/search", icon: Search },
        { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ]

    const influencerLinks = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Find Work", href: "/dashboard/find-work", icon: Search },
        { name: "My Proposals", href: "/dashboard/proposals", icon: FileText },
        { name: "Profile", href: "/dashboard/profile", icon: User },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ]

    const links = role === "brand" ? brandLinks : influencerLinks

    return (
        <div className={cn("pb-12 min-h-screen border-r bg-background", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <Link href="/" className="mb-2 flex items-center px-4">
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                            Collab.io
                        </span>
                    </Link>
                    <div className="mt-8 space-y-1">
                        {links.map((link) => (
                            <Button
                                key={link.href}
                                variant={pathname === link.href ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start",
                                    pathname === link.href ? "bg-secondary" : ""
                                )}
                                asChild
                            >
                                <Link href={link.href}>
                                    <link.icon className="mr-2 h-4 w-4" />
                                    {link.name}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="px-3 py-2 mt-auto absolute bottom-4 w-full">
                <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive" asChild>
                    <Link href="/">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                    </Link>
                </Button>
            </div>
        </div>
    )
}
