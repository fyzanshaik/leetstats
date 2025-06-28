"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, X, Users, Settings } from "lucide-react"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  usernames: string[]
  groupName: string
  onUpdateUsernames: (usernames: string[]) => void
  onOpenSetup: () => void
}

export default function SettingsModal({
  isOpen,
  onClose,
  usernames,
  groupName,
  onUpdateUsernames,
  onOpenSetup,
}: SettingsModalProps) {
  const [editedUsernames, setEditedUsernames] = useState<string[]>(usernames)

  const addUsernameField = () => {
    setEditedUsernames([...editedUsernames, ""])
  }

  const removeUsernameField = (index: number) => {
    if (editedUsernames.length > 1) {
      setEditedUsernames(editedUsernames.filter((_, i) => i !== index))
    }
  }

  const updateUsername = (index: number, value: string) => {
    const newUsernames = [...editedUsernames]
    newUsernames[index] = value
    setEditedUsernames(newUsernames)
  }

  const handleSave = () => {
    const validUsernames = editedUsernames.filter((username) => username.trim() !== "")
    if (validUsernames.length > 0) {
      onUpdateUsernames(validUsernames)
      onClose()
    }
  }

  const handleCancel = () => {
    setEditedUsernames(usernames)
    onClose()
  }

  const handleReconfigure = () => {
    onClose()
    onOpenSetup()
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border p-6 flex flex-col max-h-[90vh]"> {/* Added p-6, flex flex-col, and max-h-[90vh] */}
        <DialogHeader className="pb-4"> {/* Added pb-4 for spacing */}
          <div className="flex items-center gap-3"> {/* Removed mb-2 here, moved padding to header */}
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold">Configuration</DialogTitle>
              <DialogDescription className="text-muted-foreground">Manage your group settings</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto space-y-6 py-4 pr-2 custom-scrollbar"> 
          <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Current Group</span>
            </div>
            <p className="text-lg font-semibold text-primary">{groupName}</p>
          </div>

          {/* Users Management */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Manage Users</Label>
            <div className="space-y-2"> 
              {editedUsernames.map((username, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder={`Username ${index + 1}`}
                      value={username}
                      onChange={(e) => updateUsername(index, e.target.value)}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                    />
                  </div>
                  {editedUsernames.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeUsernameField(index)}
                      className="border-border hover:bg-accent flex-shrink-0" 
                    >
                      <X className="w-4 h-4" />
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
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-4"> 
          <Button
            variant="outline"
            onClick={handleReconfigure}
            className="w-full sm:w-auto border-border hover:bg-accent bg-transparent order-last sm:order-first" 
          >
            Reconfigure Group
          </Button>
          <div className="flex flex-1 sm:flex-none gap-2 w-full sm:w-auto"> 
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 border-border hover:bg-accent bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}