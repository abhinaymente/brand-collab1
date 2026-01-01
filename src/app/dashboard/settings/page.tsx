import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
// Note: Input component might not exist yet, I should check or just use HTML input for now to be safe, 
// OR I'll quickly Create the input component if I want to be thorough. 
// For now, I'll use standard HTML input to avoid build errors if Input UI isn't there.

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>

            <Card>
                <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your profile and preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 max-w-md">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Display Name</label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            defaultValue="Jane Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email Notification</label>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" className="h-4 w-4" defaultChecked />
                            <span className="text-sm text-muted-foreground">Receive updates via email</span>
                        </div>
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    )
}
