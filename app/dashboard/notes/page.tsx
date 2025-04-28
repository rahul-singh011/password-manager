import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SecureNotes } from "@/components/secure-notes"

export default function NotesPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Secure Notes</h1>
          <SecureNotes />
        </main>
      </div>
    </div>
  )
}
