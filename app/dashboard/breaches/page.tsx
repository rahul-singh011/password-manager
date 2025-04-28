import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { BreachAlertsPage } from "@/components/breach-alerts-page"

export default function BreachesPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Breach Alerts</h1>
          <BreachAlertsPage />
        </main>
      </div>
    </div>
  )
}
