"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Plus, Eye, EyeOff, Copy, Trash, Edit } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface PaymentCard {
  id: number
  name: string
  cardNumber: string
  cardholderName: string
  expiryMonth: string
  expiryYear: string
  cvv: string
  type: "visa" | "mastercard" | "amex" | "discover" | "other"
}

export function PaymentCards() {
  const [cards, setCards] = useState<PaymentCard[]>([
    {
      id: 1,
      name: "Personal Visa",
      cardNumber: "4111111111111111",
      cardholderName: "John Doe",
      expiryMonth: "09",
      expiryYear: "2025",
      cvv: "123",
      type: "visa",
    },
    {
      id: 2,
      name: "Work Mastercard",
      cardNumber: "5555555555554444",
      cardholderName: "John Doe",
      expiryMonth: "12",
      expiryYear: "2024",
      cvv: "321",
      type: "mastercard",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCard, setNewCard] = useState<Omit<PaymentCard, "id">>({
    name: "",
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "01",
    expiryYear: new Date().getFullYear().toString(),
    cvv: "",
    type: "visa",
  })

  const [visibleCardNumbers, setVisibleCardNumbers] = useState<Record<number, boolean>>({})
  const [visibleCVVs, setVisibleCVVs] = useState<Record<number, boolean>>({})

  const { toast } = useToast()

  const handleAddCard = () => {
    const newCardWithId: PaymentCard = {
      ...newCard,
      id: Date.now(),
    }

    setCards([...cards, newCardWithId])
    setIsAddDialogOpen(false)
    resetNewCard()

    toast({
      title: "Card Added",
      description: `${newCard.name} has been added to your vault.`,
      duration: 3000,
    })
  }

  const handleDeleteCard = (id: number, name: string) => {
    setCards(cards.filter((card) => card.id !== id))

    toast({
      title: "Card Deleted",
      description: `${name} has been removed from your vault.`,
      duration: 3000,
    })
  }

  const resetNewCard = () => {
    setNewCard({
      name: "",
      cardNumber: "",
      cardholderName: "",
      expiryMonth: "01",
      expiryYear: new Date().getFullYear().toString(),
      cvv: "",
      type: "visa",
    })
  }

  const toggleCardNumberVisibility = (id: number) => {
    setVisibleCardNumbers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const toggleCVVVisibility = (id: number) => {
    setVisibleCVVs((prev) => ({
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

  const formatCardNumber = (number: string, visible: boolean) => {
    if (!visible) {
      return "•••• •••• •••• " + number.slice(-4)
    }

    // Format based on card type
    const digits = number.replace(/\s/g, "")
    if (digits.startsWith("34") || digits.startsWith("37")) {
      // AMEX format: XXXX XXXXXX XXXXX
      return digits.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3")
    }
    // Default format: XXXX XXXX XXXX XXXX
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ")
  }

  const getCardTypeIcon = (type: string) => {
    switch (type) {
      case "visa":
        return "💳 Visa"
      case "mastercard":
        return "💳 Mastercard"
      case "amex":
        return "💳 American Express"
      case "discover":
        return "💳 Discover"
      default:
        return "💳 Card"
    }
  }

  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1
    return month < 10 ? `0${month}` : `${month}`
  })

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => `${currentYear + i}`)

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Payment Cards</CardTitle>
              <CardDescription>Securely store and manage your payment cards</CardDescription>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Card
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Cards</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="work">Work</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cards.map((card) => (
                  <Card key={card.id} className="overflow-hidden">
                    <div
                      className={`p-4 ${card.type === "visa" ? "bg-blue-950" : card.type === "mastercard" ? "bg-red-950" : card.type === "amex" ? "bg-green-950" : "bg-gray-800"}`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-white">{card.name}</h3>
                        <span className="text-white/80 text-sm">{getCardTypeIcon(card.type)}</span>
                      </div>

                      <div className="mt-4 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="font-mono text-white text-lg">
                            {formatCardNumber(card.cardNumber, visibleCardNumbers[card.id] || false)}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-white/80 hover:text-white hover:bg-white/10"
                            onClick={() => toggleCardNumberVisibility(card.id)}
                          >
                            {visibleCardNumbers[card.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-white/80 hover:text-white hover:bg-white/10"
                            onClick={() => copyToClipboard(card.cardNumber, "Card number")}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-white/90 text-sm">
                        <div>{card.cardholderName}</div>
                        <div>
                          {card.expiryMonth}/{card.expiryYear.slice(-2)}
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">CVV:</span>
                          <div className="flex items-center gap-1">
                            <span className="font-mono">{visibleCVVs[card.id] ? card.cvv : "•••"}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => toggleCVVVisibility(card.id)}
                            >
                              {visibleCVVs[card.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => copyToClipboard(card.cvv, "CVV")}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleDeleteCard(card.id, card.name)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {cards.length === 0 && (
                <div className="text-center py-12">
                  <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Cards Added</h3>
                  <p className="text-muted-foreground mb-4">You haven't added any payment cards to your vault yet.</p>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Card
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="personal" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cards
                  .filter((card) => card.name.toLowerCase().includes("personal"))
                  .map((card) => (
                    <Card key={card.id} className="overflow-hidden">
                      {/* Card content - same as above */}
                      <div
                        className={`p-4 ${card.type === "visa" ? "bg-blue-950" : card.type === "mastercard" ? "bg-red-950" : card.type === "amex" ? "bg-green-950" : "bg-gray-800"}`}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-white">{card.name}</h3>
                          <span className="text-white/80 text-sm">{getCardTypeIcon(card.type)}</span>
                        </div>

                        <div className="mt-4 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="font-mono text-white text-lg">
                              {formatCardNumber(card.cardNumber, visibleCardNumbers[card.id] || false)}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-white/80 hover:text-white hover:bg-white/10"
                              onClick={() => toggleCardNumberVisibility(card.id)}
                            >
                              {visibleCardNumbers[card.id] ? (
                                <EyeOff className="h-3 w-3" />
                              ) : (
                                <Eye className="h-3 w-3" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-white/80 hover:text-white hover:bg-white/10"
                              onClick={() => copyToClipboard(card.cardNumber, "Card number")}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-white/90 text-sm">
                          <div>{card.cardholderName}</div>
                          <div>
                            {card.expiryMonth}/{card.expiryYear.slice(-2)}
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">CVV:</span>
                            <div className="flex items-center gap-1">
                              <span className="font-mono">{visibleCVVs[card.id] ? card.cvv : "•••"}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => toggleCVVVisibility(card.id)}
                              >
                                {visibleCVVs[card.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => copyToClipboard(card.cvv, "CVV")}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => handleDeleteCard(card.id, card.name)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>

              {cards.filter((card) => card.name.toLowerCase().includes("personal")).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No personal cards found.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="work" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cards
                  .filter((card) => card.name.toLowerCase().includes("work"))
                  .map((card) => (
                    <Card key={card.id} className="overflow-hidden">
                      {/* Card content - same as above */}
                      <div
                        className={`p-4 ${card.type === "visa" ? "bg-blue-950" : card.type === "mastercard" ? "bg-red-950" : card.type === "amex" ? "bg-green-950" : "bg-gray-800"}`}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-white">{card.name}</h3>
                          <span className="text-white/80 text-sm">{getCardTypeIcon(card.type)}</span>
                        </div>

                        <div className="mt-4 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="font-mono text-white text-lg">
                              {formatCardNumber(card.cardNumber, visibleCardNumbers[card.id] || false)}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-white/80 hover:text-white hover:bg-white/10"
                              onClick={() => toggleCardNumberVisibility(card.id)}
                            >
                              {visibleCardNumbers[card.id] ? (
                                <EyeOff className="h-3 w-3" />
                              ) : (
                                <Eye className="h-3 w-3" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-white/80 hover:text-white hover:bg-white/10"
                              onClick={() => copyToClipboard(card.cardNumber, "Card number")}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-white/90 text-sm">
                          <div>{card.cardholderName}</div>
                          <div>
                            {card.expiryMonth}/{card.expiryYear.slice(-2)}
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">CVV:</span>
                            <div className="flex items-center gap-1">
                              <span className="font-mono">{visibleCVVs[card.id] ? card.cvv : "•••"}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => toggleCVVVisibility(card.id)}
                              >
                                {visibleCVVs[card.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => copyToClipboard(card.cvv, "CVV")}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => handleDeleteCard(card.id, card.name)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>

              {cards.filter((card) => card.name.toLowerCase().includes("work")).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No work cards found.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Card</DialogTitle>
            <DialogDescription>
              Enter your payment card details. All information is encrypted and stored securely.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="card-name">Card Name</Label>
              <Input
                id="card-name"
                placeholder="Personal Visa, Work Amex, etc."
                value={newCard.name}
                onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="card-type">Card Type</Label>
              <Select value={newCard.type} onValueChange={(value: any) => setNewCard({ ...newCard, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visa">Visa</SelectItem>
                  <SelectItem value="mastercard">Mastercard</SelectItem>
                  <SelectItem value="amex">American Express</SelectItem>
                  <SelectItem value="discover">Discover</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={newCard.cardNumber}
                onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value.replace(/\s/g, "") })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cardholder-name">Cardholder Name</Label>
              <Input
                id="cardholder-name"
                placeholder="John Doe"
                value={newCard.cardholderName}
                onChange={(e) => setNewCard({ ...newCard, cardholderName: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Expiry Date</Label>
                <div className="flex gap-2">
                  <Select
                    value={newCard.expiryMonth}
                    onValueChange={(value) => setNewCard({ ...newCard, expiryMonth: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={newCard.expiryYear}
                    onValueChange={(value) => setNewCard({ ...newCard, expiryYear: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  maxLength={4}
                  value={newCard.cvv}
                  onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCard}>Save Card</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
