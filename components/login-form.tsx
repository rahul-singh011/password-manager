"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Fingerprint, Loader2, Camera, X } from "lucide-react"
import { authenticateUser } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showMfa, setShowMfa] = useState(false)
  const [mfaCode, setMfaCode] = useState("")
  const [showCamera, setShowCamera] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Clean up camera when component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (!showMfa) {
        // First step authentication
        const result = await authenticateUser(email, password)
        if (result.requiresMfa) {
          setShowMfa(true)
        } else {
          // No MFA required, redirect to dashboard
          toast({
            title: "Login successful",
            description: "Welcome back to SecureVault!",
          })
          router.push("/dashboard")
        }
      } else {
        // Verify MFA code
        const result = await verifyMfaCode(mfaCode)
        if (result.success) {
          toast({
            title: "Login successful",
            description: "Welcome back to SecureVault!",
          })
          router.push("/dashboard")
        } else {
          setError("Invalid verification code. Please try again.")
        }
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Mock function for MFA verification
  const verifyMfaCode = async (code: string) => {
    // This would be replaced with actual API call
    return new Promise<{ success: boolean }>((resolve) => {
      setTimeout(() => {
        resolve({ success: code === "123456" })
      }, 1000)
    })
  }

  // Function to start camera for biometric authentication
  const handleBiometricAuth = async () => {
    setShowCamera(true)
    setError("")

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      setError("Could not access camera. Please check permissions.")
      setShowCamera(false)
    }
  }

  // Function to capture image and process biometric authentication
  const handleCapture = () => {
    setIsLoading(true)

    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Stop all video tracks
        const stream = video.srcObject as MediaStream
        if (stream) {
          const tracks = stream.getTracks()
          tracks.forEach((track) => track.stop())
        }

        // Simulate biometric verification
        setTimeout(() => {
          setIsLoading(false)
          setShowCamera(false)
          toast({
            title: "Biometric authentication successful",
            description: "Welcome back to SecureVault!",
          })
          router.push("/dashboard")
        }, 2000)
      }
    }
  }

  // Function to close camera
  const handleCloseCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
    }
    setShowCamera(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {showCamera ? (
        <div className="space-y-4">
          <div className="relative">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10"
              onClick={handleCloseCamera}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="bg-black rounded-md overflow-hidden">
              <video ref={videoRef} autoPlay playsInline className="w-full h-auto" />
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </div>
          <Button type="button" className="w-full" onClick={handleCapture} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Camera className="mr-2 h-4 w-4" />
                Capture and Verify
              </>
            )}
          </Button>
        </div>
      ) : !showMfa ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <a href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm font-normal">
              Remember me for 30 days
            </Label>
          </div>
        </>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="mfaCode">Verification Code</Label>
          <Input
            id="mfaCode"
            type="text"
            placeholder="Enter 6-digit code"
            value={mfaCode}
            onChange={(e) => setMfaCode(e.target.value)}
            required
            maxLength={6}
          />
          <p className="text-sm text-muted-foreground">Enter the verification code from your authenticator app</p>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {!showCamera && (
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : showMfa ? (
            "Verify"
          ) : (
            "Sign in"
          )}
        </Button>
      )}

      {!showMfa && !showCamera && (
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
      )}

      {!showMfa && !showCamera && (
        <Button type="button" variant="outline" className="w-full" onClick={handleBiometricAuth} disabled={isLoading}>
          <Fingerprint className="mr-2 h-4 w-4" />
          Biometric Authentication
        </Button>
      )}
    </form>
  )
}
