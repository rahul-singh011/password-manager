"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Key, Shield, AlertTriangle, Settings, RefreshCw, CreditCard, FileText } from "lucide-react"

export function DashboardSidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Password Vault",
      href: "/dashboard/passwords",
      icon: Key,
    },
    {
      name: "Password Generator",
      href: "/dashboard/generator",
      icon: RefreshCw,
    },
    {
      name: "Security Center",
      href: "/dashboard/security",
      icon: Shield,
    },
    {
      name: "Breach Alerts",
      href: "/dashboard/breaches",
      icon: AlertTriangle,
    },
    {
      name: "Payment Cards",
      href: "/dashboard/cards",
      icon: CreditCard,
    },
    {
      name: "Secure Notes",
      href: "/dashboard/notes",
      icon: FileText,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <aside className="hidden md:block w-64 border-r border-border bg-card h-[calc(100vh-4rem)]">
      <div className="p-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
