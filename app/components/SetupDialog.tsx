"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, X, Users } from "lucide-react"

interface SetupDialogProps {
  isOpen: boolean
  onComplete: (usernames: string[], groupName: string) => void
  onClose?: () => void 
}

export default function SetupDialog({ isOpen, onComplete, onClose }: SetupDialogProps) {
  const [step, setStep] = useState(1)
  const [groupName, setGroupName] = useState("")
  const [usernames, setUsernames] = useState<string[]>([""]) 
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setGroupName("")
      setUsernames([""])
      setIsSubmitting(false)
    }
  }, [isOpen])

  const addUsernameField = () => {
    setUsernames([...usernames, ""])
  }

  const removeUsernameField = (index: number) => {
    if (usernames.length > 1) {
      setUsernames(usernames.filter((_, i) => i !== index))
    }
  }

  const extractUsernameFromUrl = (url: string): string => {
    try {
      const parsedUrl = new URL(url);
      const pathSegments = parsedUrl.pathname.split('/').filter(segment => segment);
      
      if (pathSegments.length >= 1) {
        if (pathSegments[0] === 'u' && pathSegments.length > 1) {
          return pathSegments[1]; 
        } else {
          const commonLeetCodePaths = ['problem', 'problems', 'contest', 'discuss', 'solution', 'tag', 'company', 'list', 'submissions', 'u'];
          if (!commonLeetCodePaths.includes(pathSegments[0].toLowerCase())) {
            return pathSegments[0]; 
          }
        }
      }
    } catch (e) {
      console.error(e)
    }
    return url; 
  };

  const handleUsernameInputChange = (index: number, value: string) => {
    const processedValue = extractUsernameFromUrl(value);
    const newUsernames = [...usernames];
    newUsernames[index] = processedValue;
    setUsernames(newUsernames); 
  }

  const handleNext = () => {
    if (step === 1 && groupName.trim()) {
      setStep(2)
    }
  }

  const handleComplete = async () => {
    setIsSubmitting(true)

    const validUsernames = usernames.filter((username) => username.trim() !== "")

    if (validUsernames.length === 0) {
      setIsSubmitting(false)
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))

    onComplete(validUsernames, groupName.trim())
    setIsSubmitting(false)
    onClose?.() 
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose?.() 
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md border-border bg-card p-6 flex flex-col max-h-[90vh]">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="text-2xl font-semibold">Welcome to LeetStats</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {step === 1
              ? "Create your coding group and start tracking progress together"
              : "Add LeetCode usernames to track"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto space-y-6 py-4 pr-2 custom-scrollbar">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="groupName" className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Group Name
                </Label>
                <Input
                  id="groupName"
                  type="text"
                  placeholder="e.g., Code Warriors, Study Group..."
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                />
              </div>

              <Button
                onClick={handleNext}
                disabled={!groupName.trim()}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                Continue
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  {usernames.map((username, index) => (
                    <div key={index} className={`flex items-center space-x-2 ${index > 0 ? "animate-fade-in" : ""}`}>
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder={index === 0 
                            ? "Your LeetCode username or profile link (e.g., LeetCode.com/u/user)" 
                            : "Friend's username or profile link (e.g., LeetCode.com/user)"}
                          value={username}
                          onChange={(e) => handleUsernameInputChange(index, e.target.value)} 
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                        />
                      </div>
                      {usernames.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeUsernameField(index)}
                          className="border-border hover:bg-accent flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={addUsernameField}
                  className="w-full border-border hover:bg-accent bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Friend
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="w-full sm:flex-1 border-border hover:bg-accent bg-transparent"
                >
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={isSubmitting || usernames.filter((u) => u.trim()).length === 0}
                  className="w-full sm:flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Setting up...
                    </div>
                  ) : (
                    "Create Dashboard"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}