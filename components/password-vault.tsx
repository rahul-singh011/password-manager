"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Copy, Eye, EyeOff, MoreHorizontal, Edit, Trash, ExternalLink } from "lucide-react"
import { AddPasswordDialog, type PasswordData } from "@/components/add-password-dialog"
import { useToast } from "@/components/ui/use-toast"

export function PasswordVault() {
  const [searchQuery, setSearchQuery] = useState("")
  const [visiblePasswords, setVisiblePasswords] = useState<Record<number, boolean>>({})
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { toast } = useToast()

  // Mock password data with useState to allow adding new passwords
  const [passwords, setPasswords] = useState<PasswordData[]>([
    {
      id: 1,
      name: "Google",
      username: "user@example.com",
      password: "StrongP@ssw0rd!",
      url: "https://google.com",
      category: "Work",
      strength: "strong",
      lastUpdated: "2 weeks ago",
    },
    {
      id: 2,
      name: "Facebook",
      username: "user@example.com",
      password: "AnotherP@ss123",
      url: "https://facebook.com",
      category: "Personal",
      strength: "medium",
      lastUpdated: "1 month ago",
    },
    {
      id: 3,
      name: "Amazon",
      username: "user@example.com",
      password: "ShoppingP@ss!",
      url: "https://amazon.com",
      category: "Shopping",
      strength: "strong",
      lastUpdated: "3 days ago",
    },
    {
      id: 4,
      name: "Netflix",
      username: "user@example.com",
      password: "MovieTime2023!",
      url: "https://netflix.com",
      category: "Entertainment",
      strength: "strong",
      lastUpdated: "1 week ago",
    },
    {
      id: 5,
      name: "Twitter",
      username: "user@example.com",
      password: "TweetP@ss",
      url: "https://twitter.com",
      category: "Social",
      strength: "weak",
      lastUpdated: "2 months ago",
    },
  ])

  const filteredPasswords = passwords.filter(
    (password) =>
      password.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      password.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      password.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const togglePasswordVisibility = (id: number) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: `${type} has been copied to your clipboard.`,
      duration: 2000,
    })
  }

  const handleAddPassword = (newPassword: PasswordData) => {
    setPasswords([newPassword, ...passwords])
    toast({
      title: "Password Added",
      description: `Password for ${newPassword.name} has been saved.`,
      duration: 3000,
    })
  }

  const handleDeletePassword = (id: number, name: string) => {
    setPasswords(passwords.filter((password) => password.id !== id))
    toast({
      title: "Password Deleted",
      description: `Password for ${name} has been removed.`,
      duration: 3000,
    })
  }

  const getStrengthBadge = (strength: string) => {
    switch (strength) {
      case "strong":
        return <Badge className="bg-green-500">Strong</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "weak":
        return <Badge className="bg-destructive">Weak</Badge>
      default:
        return null
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Password Vault</CardTitle>
              <CardDescription>Manage and organize all your passwords securely</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search passwords..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Strength</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPasswords.length > 0 ? (
                  filteredPasswords.map((password) => (
                    <TableRow key={password.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {password.name}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => window.open(password.url, "_blank")}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {password.username}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(password.username, "Username")}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {visiblePasswords[password.id] ? password.password : "••••••••••"}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => togglePasswordVisibility(password.id)}
                          >
                            {visiblePasswords[password.id] ? (
                              <EyeOff className="h-3 w-3" />
                            ) : (
                              <Eye className="h-3 w-3" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(password.password, "Password")}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{password.category}</TableCell>
                      <TableCell>{getStrengthBadge(password.strength)}</TableCell>
                      <TableCell>{password.lastUpdated}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeletePassword(password.id, password.name)}>
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No passwords found. Try a different search or add a new password.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddPasswordDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSave={handleAddPassword} />
    </>
  )
}
