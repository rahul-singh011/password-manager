"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X, User, LogOut, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { NotificationsPopover } from "@/components/notifications-popover"
import { ThemeToggle } from "@/components/theme-toggle"
import { useToast } from "@/components/ui/use-toast"

export function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    // This would call an actual logout function
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="font-bold hidden md:inline">SecureVault</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search passwords..." className="w-full pl-9" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <NotificationsPopover />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="py-4">
                  <div className="relative w-full mb-3">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search passwords..." className="w-full pl-9" />
                  </div>
                  <nav className="flex flex-col space-y-2">
                    <SheetClose asChild>
                      <Link href="/dashboard" className="px-3 py-2 rounded-md hover:bg-accent">
                        Dashboard
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/dashboard/passwords" className="px-3 py-2 rounded-md hover:bg-accent">
                        Passwords
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/dashboard/generator" className="px-3 py-2 rounded-md hover:bg-accent">
                        Password Generator
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/dashboard/security" className="px-3 py-2 rounded-md hover:bg-accent">
                        Security Center
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/dashboard/breaches" className="px-3 py-2 rounded-md hover:bg-accent">
                        Breach Alerts
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/dashboard/cards" className="px-3 py-2 rounded-md hover:bg-accent">
                        Payment Cards
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/dashboard/notes" className="px-3 py-2 rounded-md hover:bg-accent">
                        Secure Notes
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/dashboard/settings" className="px-3 py-2 rounded-md hover:bg-accent">
                        Settings
                      </Link>
                    </SheetClose>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
