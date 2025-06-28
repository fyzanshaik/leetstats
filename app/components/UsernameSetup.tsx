"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Plus, X } from "lucide-react"

interface UsernameSetupProps {
  onSubmit: (usernames: string[]) => void
}

export default function UsernameSetup({ onSubmit }: UsernameSetupProps) {
  const [usernames, setUsernames] = useState<string[]>([""])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addUsernameField = () => {
    setUsernames([...usernames, ""])
  }

  const removeUsernameField = (index: number) => {
    if (usernames.length > 1) {
      setUsernames(usernames.filter((_, i) => i !== index))
    }
  }

  const updateUsername = (index: number, value: string) => {
    const newUsernames = [...usernames]
    newUsernames[index] = value
    setUsernames(newUsernames)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const validUsernames = usernames.filter((username) => username.trim() !== "")

    if (validUsernames.length === 0) {
      alert("Please enter at least one username")
      setIsSubmitting(false)
      return
    }

    // Simulate API validation delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSubmit(validUsernames)
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">LeetCode Friends Dashboard</CardTitle>
          <CardDescription>Enter your LeetCode username and your friends&apos; usernames to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {usernames.map((username, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-1">
                  <Label htmlFor={`username-${index}`} className="sr-only">
                    {index === 0 ? "Your username" : `Friend ${index} username`}
                  </Label>
                  <Input
                    id={`username-${index}`}
                    type="text"
                    placeholder={index === 0 ? "Your LeetCode username" : `Friend's username`}
                    value={username}
                    onChange={(e) => updateUsername(index, e.target.value)}
                    className="w-full"
                  />
                </div>
                {usernames.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeUsernameField(index)}
                    className="flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addUsernameField} className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Friend
            </Button>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Setting up..." : "Create Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
