"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  // Mock notification data
  const [notifications, setNotifications] = useState({
    recent: [
      {
        id: 1,
        type: "password_added",
        title: "Password Added",
        message: "New password for Amazon was added",
        time: "2 hours ago",
        read: false,
      },
      {
        id: 2,
        type: "breach_alert",
        title: "Security Breach Detected",
        message: "Your LinkedIn credentials may have been exposed",
        time: "Yesterday",
        read: false,
      },
      {
        id: 3,
        type: "login_attempt",
        title: "New Login",
        message: "New login from Chrome on Windows",
        time: "2 days ago",
        read: true,
      },
    ],
    older: [
      {
        id: 4,
        type: "password_changed",
        title: "Password Changed",
        message: "Your Netflix password was updated",
        time: "1 week ago",
        read: true,
      },
      {
        id: 5,
        type: "weak_password",
        title: "Weak Password Detected",
        message: "Your Twitter password is too weak",
        time: "2 weeks ago",
        read: true,
      },
    ],
  })

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "breach_alert":
        return <span className="text-destructive text-lg">⚠️</span>
      case "password_added":
        return <span className="text-primary text-lg">🔑</span>
      case "password_changed":
        return <span className="text-primary text-lg">🔄</span>
      case "login_attempt":
        return <span className="text-blue-500 text-lg">🔒</span>
      case "weak_password":
        return <span className="text-yellow-500 text-lg">⚠️</span>
      default:
        return <span className="text-primary text-lg">📌</span>
    }
  }

  const handleMarkAllAsRead = () => {
    const updatedRecent = notifications.recent.map((notification) => ({
      ...notification,
      read: true,
    }))

    const updatedOlder = notifications.older.map((notification) => ({
      ...notification,
      read: true,
    }))

    setNotifications({
      recent: updatedRecent,
      older: updatedOlder,
    })

    toast({
      title: "Notifications marked as read",
      description: "All notifications have been marked as read.",
    })
  }

  const handleNotificationClick = (id: number, title: string) => {
    // Mark the notification as read
    const updatedRecent = notifications.recent.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    )

    const updatedOlder = notifications.older.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    )

    setNotifications({
      recent: updatedRecent,
      older: updatedOlder,
    })

    // Show toast and close popover
    toast({
      title: "Notification opened",
      description: `You opened: ${title}`,
    })
    setIsOpen(false)
  }

  const hasUnreadNotifications = notifications.recent.some((n) => !n.read) || notifications.older.some((n) => !n.read)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {hasUnreadNotifications && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3 border-b border-border">
          <h4 className="font-medium">Notifications</h4>
        </div>

        <Tabs defaultValue="recent">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="older">Older</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="p-0">
            <ScrollArea className="h-[300px]">
              {notifications.recent.length > 0 ? (
                <div className="divide-y divide-border">
                  {notifications.recent.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 flex gap-3 hover:bg-muted cursor-pointer ${!notification.read ? "bg-muted/50" : ""}`}
                      onClick={() => handleNotificationClick(notification.id, notification.title)}
                    >
                      <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">No recent notifications</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="older" className="p-0">
            <ScrollArea className="h-[300px]">
              {notifications.older.length > 0 ? (
                <div className="divide-y divide-border">
                  {notifications.older.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 flex gap-3 hover:bg-muted cursor-pointer ${!notification.read ? "bg-muted/50" : ""}`}
                      onClick={() => handleNotificationClick(notification.id, notification.title)}
                    >
                      <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">No older notifications</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="p-2 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full" onClick={handleMarkAllAsRead}>
            Mark all as read
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
