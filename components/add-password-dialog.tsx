"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Eye, EyeOff, RefreshCw } from "lucide-react"
import { PasswordStrengthMeter } from "@/components/password-strength-meter"
import { analyzePasswordStrength } from "@/lib/auth"

interface AddPasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (password: PasswordData) => void
}

export interface PasswordData {
  id: number
  name: string
  username: string
  password: string
  url: string
  category: string
  strength: string
  lastUpdated: string
}

export function AddPasswordDialog({ open, onOpenChange, onSave }: AddPasswordDialogProps) {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [url, setUrl] = useState("")
  const [category, setCategory] = useState("Personal")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)

    // Calculate password strength
    let strength = 0
    if (newPassword.length >= 8) strength += 1
    if (/[A-Z]/.test(newPassword)) strength += 1
    if (/[0-9]/.test(newPassword)) strength += 1
    if (/[^A-Za-z0-9]/.test(newPassword)) strength += 1

    setPasswordStrength(strength)
  }

  const generatePassword = () => {
    const length = 16
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-="
    let generatedPassword = ""
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      generatedPassword += charset[randomIndex]
    }
    setPassword(generatedPassword)

    // Calculate strength for generated password
    let strength = 0
    if (generatedPassword.length >= 8) strength += 1
    if (/[A-Z]/.test(generatedPassword)) strength += 1
    if (/[0-9]/.test(generatedPassword)) strength += 1
    if (/[^A-Za-z0-9]/.test(generatedPassword)) strength += 1

    setPasswordStrength(strength)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newPassword: PasswordData = {
      id: Date.now(),
      name,
      username,
      password,
      url: url.startsWith("http") ? url : `https://${url}`,
      category,
      strength: analyzePasswordStrength(password),
      lastUpdated: "Just now",
    }

    onSave(newPassword)
    resetForm()
    onOpenChange(false)
  }

  const resetForm = () => {
    setName("")
    setUsername("")
    setPassword("")
    setUrl("")
    setCategory("Personal")
    setShowPassword(false)
    setPasswordStrength(0)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Password</DialogTitle>
          <DialogDescription>Enter the details for the new password you want to save.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Site Name</Label>
              <Input
                id="name"
                placeholder="Google, Facebook, etc."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="url">Website URL</Label>
              <Input id="url" placeholder="www.example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="username">Username / Email</Label>
              <Input
                id="username"
                placeholder="your.email@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={generatePassword}
                  title="Generate Password"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <PasswordStrengthMeter strength={passwordStrength} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Work">Work</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Social">Social</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Password</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
