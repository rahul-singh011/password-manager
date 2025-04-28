import type React from "react"
import { ShieldCheck, Brain, Fingerprint, Bell, Key, RefreshCw } from "lucide-react"

export function FeatureSection() {
  return (
    <section id="features" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">AI-Powered Security Features</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our password manager combines cutting-edge AI with robust security practices to keep your digital identity
          safe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Brain />}
          title="Smart Password Analysis"
          description="AI algorithms analyze your passwords for strength and suggest improvements."
        />

        <FeatureCard
          icon={<ShieldCheck />}
          title="Vulnerability Detection"
          description="Proactively identify weak points in your security setup."
        />

        <FeatureCard
          icon={<Fingerprint />}
          title="Biometric Authentication"
          description="Use fingerprint or face recognition for quick and secure access."
        />

        <FeatureCard
          icon={<Bell />}
          title="Real-time Alerts"
          description="Get notified immediately about suspicious activities or breaches."
        />

        <FeatureCard
          icon={<Key />}
          title="Secure Password Generator"
          description="Create strong, unique passwords with our advanced generator."
        />

        <FeatureCard
          icon={<RefreshCw />}
          title="Automatic Password Rotation"
          description="Schedule automatic updates for critical credentials."
        />
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
