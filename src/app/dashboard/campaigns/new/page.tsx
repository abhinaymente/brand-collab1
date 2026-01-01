"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewCampaignPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/campaigns">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">Create New Campaign</h2>
            </div>

            <div className="max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Campaign Details</CardTitle>
                        <CardDescription>Define the requirements for your collaboration.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="title">Campaign Title</label>
                            <input
                                id="title"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="e.g. Summer Collection Launch"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none" htmlFor="budget">Budget (₹)</label>
                                <input
                                    id="budget"
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    placeholder="5000"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none" htmlFor="category">Category</label>
                                <select
                                    id="category"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <option>Fashion & Lifestyle</option>
                                    <option>Tech & Gaming</option>
                                    <option>Beauty & Wellness</option>
                                    <option>Food & Travel</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="description">Brief / Description</label>
                            <textarea
                                id="description"
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="Describe what you are looking for..."
                            />
                        </div>

                        <div className="pt-4 flex justify-end space-x-2">
                            <Button variant="outline" asChild>
                                <Link href="/dashboard/campaigns">Cancel</Link>
                            </Button>
                            <Button>Publish Campaign</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
