"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, AlertTriangle, Key, RefreshCw, Check, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

export function SecurityCenter() {
  // Mock security data
  const [securityScore, setSecurityScore] = useState(72)
  const [weakPasswords, setWeakPasswords] = useState(3)
  const [reusedPasswords, setReusedPasswords] = useState(2)
  const [oldPasswords, setOldPasswords] = useState(4)
  const [totalPasswords, setTotalPasswords] = useState(12)
  const [isFixingWeakPasswords, setIsFixingWeakPasswords] = useState(false)
  const [isFixingReusedPasswords, setIsFixingReusedPasswords] = useState(false)
  const [isFixingOldPasswords, setIsFixingOldPasswords] = useState(false)
  const [isEnablingBiometric, setIsEnablingBiometric] = useState(false)
  const [biometricEnabled, setBiometricEnabled] = useState(false)
  const [masterPasswordStrong, setMasterPasswordStrong] = useState(true)
  const [passwordsEncrypted, setPasswordsEncrypted] = useState(true)
  const { toast } = useToast()

  // Mock weak passwords data
  const [weakPasswordsList, setWeakPasswordsList] = useState([
    {
      id: 1,
      site: "Twitter",
      username: "user@example.com",
      strength: "weak",
      suggestions: ["Add special characters", "Make it longer"],
    },
    {
      id: 2,
      site: "Instagram",
      username: "user@example.com",
      strength: "weak",
      suggestions: ["Add numbers", "Add uppercase letters"],
    },
    {
      id: 3,
      site: "Reddit",
      username: "user@example.com",
      strength: "weak",
      suggestions: ["Avoid common words", "Add more variety"],
    },
  ])

  const handleFixWeakPasswords = () => {
    setIsFixingWeakPasswords(true)
  }

  const handleFixReusedPasswords = () => {
    setIsFixingReusedPasswords(true)

    // Simulate API call
    setTimeout(() => {
      setReusedPasswords(0)
      setSecurityScore(securityScore + 8)
      setIsFixingReusedPasswords(false)

      toast({
        title: "Passwords updated",
        description: "All reused passwords have been replaced with unique ones.",
      })
    }, 2000)
  }

  const handleFixOldPasswords = () => {
    setIsFixingOldPasswords(true)

    // Simulate API call
    setTimeout(() => {
      setOldPasswords(0)
      setSecurityScore(securityScore + 5)
      setIsFixingOldPasswords(false)

      toast({
        title: "Passwords updated",
        description: "All old passwords have been updated.",
      })
    }, 2000)
  }

  const handleEnableBiometric = () => {
    setIsEnablingBiometric(true)

    // Simulate API call
    setTimeout(() => {
      setBiometricEnabled(true)
      setSecurityScore(securityScore + 5)
      setIsEnablingBiometric(false)

      toast({
        title: "Biometric authentication enabled",
        description: "You can now use biometric authentication for faster access.",
      })
    }, 2000)
  }

  const handleGenerateStrongPassword = (id: number) => {
    // Generate a strong password and update the list
    const updatedList = weakPasswordsList.filter((password) => password.id !== id)
    setWeakPasswordsList(updatedList)

    if (updatedList.length === 0) {
      setWeakPasswords(0)
      setSecurityScore(securityScore + 10)
      setIsFixingWeakPasswords(false)

      toast({
        title: "All weak passwords fixed",
        description: "Your password security has been significantly improved.",
      })
    }
  }

  const closeWeakPasswordsDialog = () => {
    setIsFixingWeakPasswords(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security Score
          </CardTitle>
          <CardDescription>
            Your overall security score based on your password health and security settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl font-bold">{securityScore}%</span>
            <span className="text-sm text-muted-foreground">
              {securityScore >= 80 ? "Excellent" : securityScore >= 60 ? "Good" : "Needs Improvement"}
            </span>
          </div>
          <Progress value={securityScore} className="h-2" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Weak Passwords</span>
                <span className={`${weakPasswords > 0 ? "text-destructive" : "text-green-500"}`}>
                  {weakPasswords}/{totalPasswords}
                </span>
              </div>
              <Progress value={((totalPasswords - weakPasswords) / totalPasswords) * 100} className="h-1.5" />
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Reused Passwords</span>
                <span className={`${reusedPasswords > 0 ? "text-yellow-500" : "text-green-500"}`}>
                  {reusedPasswords}/{totalPasswords}
                </span>
              </div>
              <Progress value={((totalPasswords - reusedPasswords) / totalPasswords) * 100} className="h-1.5" />
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Old Passwords</span>
                <span className={`${oldPasswords > 0 ? "text-yellow-500" : "text-green-500"}`}>
                  {oldPasswords}/{totalPasswords}
                </span>
              </div>
              <Progress value={((totalPasswords - oldPasswords) / totalPasswords) * 100} className="h-1.5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="issues">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="issues">Security Issues</TabsTrigger>
          <TabsTrigger value="settings">Security Settings</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security Issues Found</CardTitle>
              <CardDescription>These issues need your attention to improve your security</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weakPasswords > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <div>
                      <h4 className="font-medium">Weak Passwords Detected</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        You have {weakPasswords} passwords that are vulnerable to brute force attacks.
                      </p>
                      <Button size="sm" variant="destructive" onClick={handleFixWeakPasswords}>
                        Fix Weak Passwords
                      </Button>
                    </div>
                  </div>
                )}

                {reusedPasswords > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Reused Passwords</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        You're using the same password for {reusedPasswords} different accounts.
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleFixReusedPasswords}
                        disabled={isFixingReusedPasswords}
                      >
                        {isFixingReusedPasswords ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Generating Unique Passwords...
                          </>
                        ) : (
                          "Generate Unique Passwords"
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {oldPasswords > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <RefreshCw className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Passwords Need Rotation</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {oldPasswords} passwords haven't been changed in over 90 days.
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleFixOldPasswords}
                        disabled={isFixingOldPasswords}
                      >
                        {isFixingOldPasswords ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Updating Old Passwords...
                          </>
                        ) : (
                          "Update Old Passwords"
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {!biometricEnabled && (
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg border">
                    <Key className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Biometric Authentication Not Enabled</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Enable biometric authentication for faster and more secure access.
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleEnableBiometric}
                        disabled={isEnablingBiometric}
                      >
                        {isEnablingBiometric ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Enabling Biometrics...
                          </>
                        ) : (
                          "Enable Biometrics"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security Settings Status</CardTitle>
              <CardDescription>Review your current security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-card border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-full ${biometricEnabled ? "bg-green-500/20" : "bg-destructive/20"}`}>
                      {biometricEnabled ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">Multi-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">Enabled</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Manage
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-card border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-full ${masterPasswordStrong ? "bg-green-500/20" : "bg-destructive/20"}`}
                    >
                      {masterPasswordStrong ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">Master Password Strength</h4>
                      <p className="text-sm text-muted-foreground">{masterPasswordStrong ? "Strong" : "Weak"}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-card border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-full ${passwordsEncrypted ? "bg-green-500/20" : "bg-destructive/20"}`}
                    >
                      {passwordsEncrypted ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">End-to-End Encryption</h4>
                      <p className="text-sm text-muted-foreground">{passwordsEncrypted ? "Enabled" : "Disabled"}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" disabled={passwordsEncrypted}>
                    {passwordsEncrypted ? "Enabled" : "Enable"}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-card border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-full ${biometricEnabled ? "bg-green-500/20" : "bg-destructive/20"}`}>
                      {biometricEnabled ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">Biometric Authentication</h4>
                      <p className="text-sm text-muted-foreground">{biometricEnabled ? "Enabled" : "Disabled"}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={biometricEnabled ? "outline" : "default"}
                    onClick={biometricEnabled ? undefined : handleEnableBiometric}
                    disabled={isEnablingBiometric}
                  >
                    {biometricEnabled ? "Manage" : isEnablingBiometric ? "Enabling..." : "Enable"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI-Powered Recommendations</CardTitle>
              <CardDescription>Personalized suggestions to enhance your security</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h4 className="font-medium flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Enable Password Rotation
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Regularly changing passwords for critical accounts can significantly reduce the risk of unauthorized
                    access.
                  </p>
                  <Button size="sm" variant="outline">
                    Set Up Rotation Reminders
                  </Button>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h4 className="font-medium flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Use Longer Passwords
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our analysis shows that increasing your password length to at least 16 characters would improve your
                    security score by 15%.
                  </p>
                  <Button size="sm" variant="outline">
                    Generate Longer Passwords
                  </Button>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h4 className="font-medium flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Add Recovery Methods
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Set up additional recovery methods to ensure you never lose access to your vault.
                  </p>
                  <Button size="sm" variant="outline">
                    Add Recovery Options
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Fix Weak Passwords Dialog */}
      <Dialog open={isFixingWeakPasswords} onOpenChange={closeWeakPasswordsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Fix Weak Passwords</DialogTitle>
            <DialogDescription>
              Generate strong, unique passwords for these accounts to improve your security.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            {weakPasswordsList.map((password) => (
              <div key={password.id} className="p-3 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{password.site}</h4>
                  <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full">
                    {password.strength}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{password.username}</p>
                <div className="text-xs text-muted-foreground mb-3">
                  <span className="font-medium">Suggestions: </span>
                  {password.suggestions.join(", ")}
                </div>
                <Button size="sm" className="w-full" onClick={() => handleGenerateStrongPassword(password.id)}>
                  Generate Strong Password
                </Button>
              </div>
            ))}

            {weakPasswordsList.length === 0 && (
              <div className="text-center py-6">
                <Check className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <h3 className="text-lg font-medium mb-1">All Passwords Fixed!</h3>
                <p className="text-sm text-muted-foreground">Your password security has been significantly improved.</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeWeakPasswordsDialog}>
              {weakPasswordsList.length === 0 ? "Close" : "Cancel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
