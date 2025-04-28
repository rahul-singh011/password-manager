import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, Lock, AlertTriangle } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-20 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
          Secure Your Digital Life
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          AI-powered password management with advanced encryption and breach detection. Keep your credentials safe and
          accessible only to you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" asChild>
            <Link href="/signup">Get Started Free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">Learn More</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-card p-6 rounded-lg border border-border">
            <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Military-Grade Encryption</h3>
            <p className="text-muted-foreground">
              Your data is encrypted with AES-256, ensuring only you can access it.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <Lock className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Multi-Factor Authentication</h3>
            <p className="text-muted-foreground">Add an extra layer of security with biometric and MFA options.</p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <AlertTriangle className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Breach Detection</h3>
            <p className="text-muted-foreground">Get instant alerts if your credentials appear in data breaches.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
