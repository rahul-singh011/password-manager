import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { PasswordVault } from "@/components/password-vault"
import { SecurityScore } from "@/components/security-score"
import { RecentActivity } from "@/components/recent-activity"
import { BreachAlerts } from "@/components/breach-alerts"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <SecurityScore />
            <RecentActivity />
            <BreachAlerts />
          </div>

          <PasswordVault />
        </main>
      </div>
    </div>
  )
}
