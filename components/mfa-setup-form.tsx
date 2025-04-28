"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Smartphone } from "lucide-react"
import { QRCode } from "@/components/qr-code"

export function MfaSetupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("app")
  const router = useRouter()

  // Mock secret key for QR code
  const secretKey = "JBSWY3DPEHPK3PXP"

  const handleVerifyApp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // This would be an actual API call to verify the code
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (verificationCode === "123456") {
        router.push("/dashboard")
      } else {
        setError("Invalid verification code. Please try again.")
      }
    } catch (err) {
      setError("Verification failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetupPhone = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // This would be an actual API call to set up phone MFA
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/dashboard")
    } catch (err) {
      setError("Failed to set up phone verification. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    router.push("/dashboard")
  }

  return (
    <Tabs defaultValue="app" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="app">Authenticator App</TabsTrigger>
        <TabsTrigger value="phone">Phone Number</TabsTrigger>
      </TabsList>

      <TabsContent value="app">
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg text-center">
            <p className="text-sm mb-4">
              Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
            </p>
            <div className="flex justify-center mb-2">
              <QRCode value={`otpauth://totp/SecureVault:user@example.com?secret=${secretKey}&issuer=SecureVault`} />
            </div>
            <p className="text-xs text-muted-foreground">
              Or enter this code manually: <span className="font-mono">{secretKey}</span>
            </p>
          </div>

          <form onSubmit={handleVerifyApp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
              <Button type="button" variant="outline" onClick={handleSkip}>
                Skip
              </Button>
            </div>
          </form>
        </div>
      </TabsContent>

      <TabsContent value="phone">
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg flex items-center gap-3">
            <Smartphone className="h-5 w-5 text-primary" />
            <p className="text-sm">We'll send a verification code to your phone each time you log in</p>
          </div>

          <form onSubmit={handleSetupPhone} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">Standard message and data rates may apply</p>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  "Set Up"
                )}
              </Button>
              <Button type="button" variant="outline" onClick={handleSkip}>
                Skip
              </Button>
            </div>
          </form>
        </div>
      </TabsContent>
    </Tabs>
  )
}
