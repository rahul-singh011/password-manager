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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, FileText, Trash, Edit, Search, Tag } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

interface SecureNote {
  id: number
  title: string
  content: string
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export function SecureNotes() {
  const [notes, setNotes] = useState<SecureNote[]>([
    {
      id: 1,
      title: "WiFi Passwords",
      content: "Home WiFi: HomeNetwork123\nOffice WiFi: Office@2023\nCafe WiFi: CafeGuest2023",
      category: "Passwords",
      tags: ["wifi", "home", "office"],
      createdAt: "2023-05-15T10:30:00Z",
      updatedAt: "2023-05-15T10:30:00Z",
    },
    {
      id: 2,
      title: "Passport Information",
      content: "Passport Number: AB123456\nIssue Date: 2020-01-15\nExpiry Date: 2030-01-14\nIssued By: United States",
      category: "Personal",
      tags: ["travel", "documents", "important"],
      createdAt: "2023-04-10T14:20:00Z",
      updatedAt: "2023-04-10T14:20:00Z",
    },
    {
      id: 3,
      title: "Server Credentials",
      content:
        "Production Server:\nUsername: admin\nPassword: Pr0d@Server2023\n\nStaging Server:\nUsername: staging_user\nPassword: St@g1ng2023",
      category: "Work",
      tags: ["servers", "credentials", "work"],
      createdAt: "2023-06-05T09:15:00Z",
      updatedAt: "2023-06-05T09:15:00Z",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const [newNote, setNewNote] = useState<Omit<SecureNote, "id" | "createdAt" | "updatedAt">>({
    title: "",
    content: "",
    category: "Personal",
    tags: [],
  })

  const [tagInput, setTagInput] = useState("")

  const { toast } = useToast()

  const handleAddNote = () => {
    const now = new Date().toISOString()

    const newNoteWithId: SecureNote = {
      ...newNote,
      id: Date.now(),
      createdAt: now,
      updatedAt: now,
    }

    setNotes([...notes, newNoteWithId])
    setIsAddDialogOpen(false)
    resetNewNote()

    toast({
      title: "Note Added",
      description: `"${newNote.title}" has been saved to your vault.`,
      duration: 3000,
    })
  }

  const handleDeleteNote = (id: number, title: string) => {
    setNotes(notes.filter((note) => note.id !== id))

    toast({
      title: "Note Deleted",
      description: `"${title}" has been removed from your vault.`,
      duration: 3000,
    })
  }

  const resetNewNote = () => {
    setNewNote({
      title: "",
      content: "",
      category: "Personal",
      tags: [],
    })
    setTagInput("")
  }

  const addTag = () => {
    if (tagInput.trim() && !newNote.tags.includes(tagInput.trim())) {
      setNewNote({
        ...newNote,
        tags: [...newNote.tags, tagInput.trim()],
      })
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setNewNote({
      ...newNote,
      tags: newNote.tags.filter((t) => t !== tag),
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory ? note.category === selectedCategory : true

    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(notes.map((note) => note.category)))

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Secure Notes</CardTitle>
              <CardDescription>Store sensitive information securely</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search notes..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedCategory || ""} onValueChange={(value) => setSelectedCategory(value || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Note
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <Card key={note.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    <Badge>{note.category}</Badge>
                  </div>
                  <CardDescription>Updated {formatDate(note.updatedAt)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-line mb-4 text-sm h-24 overflow-hidden relative">
                    {note.content}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent"></div>
                  </div>

                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {note.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteNote(note.id, note.title)}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNotes.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Notes Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || selectedCategory
                  ? "No notes match your search criteria."
                  : "You haven't added any secure notes yet."}
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Note
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Secure Note</DialogTitle>
            <DialogDescription>Create a new encrypted note to store sensitive information.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="note-title">Title</Label>
              <Input
                id="note-title"
                placeholder="WiFi Passwords, Passport Info, etc."
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="note-category">Category</Label>
              <Select value={newNote.category} onValueChange={(value) => setNewNote({ ...newNote, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Work">Work</SelectItem>
                  <SelectItem value="Passwords">Passwords</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="note-content">Content</Label>
              <Textarea
                id="note-content"
                placeholder="Enter your secure note content here..."
                rows={6}
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="note-tags">Tags</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="note-tags"
                    placeholder="Add tags..."
                    className="pl-9"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTag()
                      }
                    }}
                  />
                </div>
                <Button type="button" variant="outline" onClick={addTag}>
                  Add
                </Button>
              </div>

              {newNote.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {newNote.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 rounded-full"
                        onClick={() => removeTag(tag)}
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNote}>Save Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
