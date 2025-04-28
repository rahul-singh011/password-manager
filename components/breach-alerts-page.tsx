"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, ExternalLink, Check } from "lucide-react"
import { Input } from "@/components/ui/input"

export function BreachAlertsPage() {
  const [email, setEmail] = useState("")
  const [isMonitoring, setIsMonitoring] = useState(true)

  // Mock breach data
  const activeBreaches = [
    {
      id: 1,
      service: "LinkedIn",
      date: "April 10, 2023",
      affectedData: ["Email", "Password", "Name"],
      severity: "high",
      description: "A data breach at LinkedIn exposed user credentials and personal information.",
      status: "active",
    },
    {
      id: 2,
      service: "Dropbox",
      date: "March 5, 2023",
      affectedData: ["Email", "Password"],
      severity: "medium",
      description: "Dropbox experienced a security incident that may have exposed user credentials.",
      status: "active",
    },
  ]

  const resolvedBreaches = [
    {
      id: 3,
      service: "Adobe",
      date: "January 15, 2023",
      affectedData: ["Email", "Password"],
      severity: "medium",
      description: "Adobe Creative Cloud user data was exposed in a security incident.",
      status: "resolved",
      resolvedDate: "February 2, 2023",
    },
    {
      id: 4,
      service: "Twitter",
      date: "December 10, 2022",
      affectedData: ["Email", "Phone Number"],
      severity: "low",
      description: "A security vulnerability at Twitter potentially exposed user contact information.",
      status: "resolved",
      resolvedDate: "December 25, 2022",
    },
  ]

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-destructive">High Risk</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Medium Risk</Badge>
      case "low":
        return <Badge className="bg-blue-500">Low Risk</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Breach Monitoring
          </CardTitle>
          <CardDescription>We continuously monitor for data breaches that may affect your accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
            <div className="space-y-2 flex-1">
              <label htmlFor="monitoring-email" className="text-sm font-medium">
                Email to Monitor
              </label>
              <Input
                id="monitoring-email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button variant={isMonitoring ? "outline" : "default"} onClick={() => setIsMonitoring(!isMonitoring)}>
              {isMonitoring ? "Monitoring Active" : "Start Monitoring"}
            </Button>
          </div>

          {isMonitoring && (
            <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-3">
              <Check className="h-5 w-5 text-primary" />
              <div className="text-sm">
                <span className="font-medium">Breach monitoring is active.</span> We'll alert you if your information
                appears in a data breach.
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Alerts ({activeBreaches.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedBreaches.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-4">
          {activeBreaches.length > 0 ? (
            activeBreaches.map((breach) => (
              <Card key={breach.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <CardTitle className="text-lg">{breach.service} Breach</CardTitle>
                    </div>
                    {getSeverityBadge(breach.severity)}
                  </div>
                  <CardDescription>Detected on {breach.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-3">{breach.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-1">Affected Data:</h4>
                    <div className="flex flex-wrap gap-2">
                      {breach.affectedData.map((data, index) => (
                        <Badge key={index} variant="outline">
                          {data}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Recommended Actions:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/20 text-primary rounded-full p-1 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-sm">Change your {breach.service} password immediately</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/20 text-primary rounded-full p-1 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-sm">Enable two-factor authentication if available</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/20 text-primary rounded-full p-1 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-sm">Check for suspicious activity on your account</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <Button>Change Password</Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      Visit {breach.service}
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-medium mb-2">No Active Breaches</h3>
                <p className="text-muted-foreground">
                  Great news! We haven't detected any active data breaches affecting your accounts.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4 mt-4">
          {resolvedBreaches.map((breach) => (
            <Card key={breach.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <CardTitle className="text-lg">{breach.service} Breach</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-green-500 border-green-500">
                    Resolved
                  </Badge>
                </div>
                <CardDescription>Resolved on {breach.resolvedDate}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-3">{breach.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1">Affected Data:</h4>
                  <div className="flex flex-wrap gap-2">
                    {breach.affectedData.map((data, index) => (
                      <Badge key={index} variant="outline">
                        {data}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="flex items-center gap-2">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
