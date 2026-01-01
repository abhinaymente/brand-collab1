import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

export default function MessagesPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Messages</h2>

            <Card className="h-[400px] flex flex-col items-center justify-center text-center p-6">
                <div className="p-4 bg-secondary rounded-full mb-4">
                    <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardTitle className="mb-2">No messages yet</CardTitle>
                <CardContent>
                    <p className="text-muted-foreground max-w-sm">
                        Connect with brands or creators to start a conversation.
                        Your chat history will appear here.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
