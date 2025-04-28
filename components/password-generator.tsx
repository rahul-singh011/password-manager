"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, RefreshCw, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    generatePassword()
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  const generatePassword = () => {
    let charset = ""
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-="

    // Ensure at least one character set is selected
    if (charset === "") {
      setIncludeLowercase(true)
      charset = "abcdefghijklmnopqrstuvwxyz"
    }

    let generatedPassword = ""
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      generatedPassword += charset[randomIndex]
    }
    setPassword(generatedPassword)
    setCopied(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    toast({
      title: "Password Copied",
      description: "Password has been copied to your clipboard.",
      duration: 2000,
    })

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const calculatePasswordStrength = () => {
    const strength = 0
    let charsetSize = 0

    if (includeLowercase) charsetSize += 26
    if (includeUppercase) charsetSize += 26
    if (includeNumbers) charsetSize += 10
    if (includeSymbols) charsetSize += 33

    // Calculate entropy: log2(charsetSize^length)
    const entropy = Math.log2(Math.pow(charsetSize, length))

    if (entropy < 40) return { text: "Weak", color: "bg-destructive" }
    if (entropy < 60) return { text: "Fair", color: "bg-yellow-500" }
    if (entropy < 80) return { text: "Good", color: "bg-green-500" }
    return { text: "Strong", color: "bg-primary" }
  }

  const strength = calculatePasswordStrength()

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Generate Secure Passwords</CardTitle>
        <CardDescription>Create strong, random passwords to keep your accounts safe</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted p-4 rounded-md flex items-center justify-between">
          <div className="font-mono text-lg break-all">{password}</div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={generatePassword}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="length">Password Length: {length}</Label>
              <span className={`text-xs px-2 py-1 rounded-full ${strength.color} text-primary-foreground`}>
                {strength.text}
              </span>
            </div>
            <Slider
              id="length"
              min={8}
              max={32}
              step={1}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="uppercase">Include Uppercase Letters</Label>
              <Switch id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="lowercase">Include Lowercase Letters</Label>
              <Switch id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="numbers">Include Numbers</Label>
              <Switch id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="symbols">Include Symbols</Label>
              <Switch id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">Tip: Use a different password for each account</div>
        <Button onClick={generatePassword}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Generate New
        </Button>
      </CardFooter>
    </Card>
  )
}
