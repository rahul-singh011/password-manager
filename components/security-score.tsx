"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield } from "lucide-react"

export function SecurityScore() {
  // Mock security score
  const score = 85

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Security Score</CardTitle>
        <Shield className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{score}%</div>
        <Progress value={score} className="h-2 mt-2" />
        <p className="text-xs text-muted-foreground mt-2">
          {score >= 80
            ? "Your account is well protected"
            : score >= 60
              ? "Your security needs some improvements"
              : "Your account security is at risk"}
        </p>
      </CardContent>
    </Card>
  )
}
