import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { PaymentCards } from "@/components/payment-cards"

export default function CardsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Payment Cards</h1>
          <PaymentCards />
        </main>
      </div>
    </div>
  )
}
