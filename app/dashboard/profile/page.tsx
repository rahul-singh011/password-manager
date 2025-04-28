import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { ProfilePage } from "@/components/profile-page"

export default function Profile() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>
          <ProfilePage />
        </main>
      </div>
    </div>
  )
}
