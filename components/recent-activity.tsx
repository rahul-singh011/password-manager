import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"

export function RecentActivity() {
  // Mock activity data
  const activities = [
    {
      id: 1,
      action: "Password changed",
      target: "Netflix",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "New login",
      target: "Gmail",
      time: "Yesterday",
    },
    {
      id: 3,
      action: "Password added",
      target: "Amazon",
      time: "3 days ago",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex justify-between items-center text-sm">
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-muted-foreground">{activity.target}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
