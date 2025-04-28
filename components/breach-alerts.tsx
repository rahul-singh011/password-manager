import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BreachAlerts() {
  // Mock breach data
  const breaches = [
    {
      id: 1,
      service: "LinkedIn",
      date: "Apr 10, 2023",
      severity: "high",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Breach Alerts</CardTitle>
        <AlertTriangle className="h-4 w-4 text-destructive" />
      </CardHeader>
      <CardContent>
        {breaches.length > 0 ? (
          <div className="space-y-3">
            {breaches.map((breach) => (
              <div key={breach.id} className="bg-destructive/10 p-3 rounded-md border border-destructive/20">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-medium text-sm">{breach.service}</p>
                  <span className="text-xs text-muted-foreground">{breach.date}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Your credentials may have been exposed in a data breach.
                </p>
                <Button size="sm" variant="destructive" className="w-full text-xs">
                  Change Password
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-3">
            <p className="text-sm text-muted-foreground">No breaches detected</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
