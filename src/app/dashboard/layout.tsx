import { Sidebar } from "@/components/layout/sidebar"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Dashboard | Collab.io",
    description: "Manage your collaborations",
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            <div className="hidden w-64 md:block fixed h-full">
                {/* For MVP demo, hardcoding role='brand' or we could fetch it */}
                <Sidebar role="brand" />
            </div>
            <div className="flex-1 md:pl-64">
                <main className="flex-1 space-y-4 p-8 pt-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
