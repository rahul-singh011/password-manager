import { MfaSetupForm } from "@/components/mfa-setup-form"
import Link from "next/link"

export default function SetupMfaPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-primary"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="text-xl font-bold">SecureVault</span>
          </Link>
        </div>
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-2 text-center">Secure Your Account</h1>
          <p className="text-muted-foreground text-center mb-6">
            Set up multi-factor authentication for enhanced security
          </p>
          <MfaSetupForm />
        </div>
      </div>
    </div>
  )
}
