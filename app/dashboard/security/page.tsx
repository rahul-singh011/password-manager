import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SecurityCenter } from "@/components/security-center"

export default function SecurityCenterPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Security Center</h1>
          <SecurityCenter />
        </main>
      </div>
    </div>
  )
}
