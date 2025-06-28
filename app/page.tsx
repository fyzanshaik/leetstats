"use client"

import { useEffect, useState } from "react"
import SetupDialog from "./components/SetupDialog" 
import Dashboard from "./components/Dashboard" 

export default function Home() {
  const [usernames, setUsernames] = useState<string[]>([])
  const [groupName, setGroupName] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [showSetup, setShowSetup] = useState(false)

  useEffect(() => {
    const storedUsernames = localStorage.getItem("leetstats-usernames")
    const storedGroupName = localStorage.getItem("leetstats-group-name")

    let initialUsernames: string[] = []
    if (storedUsernames) {
      try {
        initialUsernames = JSON.parse(storedUsernames)
        setUsernames(initialUsernames)
      } catch (error) {
        console.error("Failed to parse stored usernames:", error);
        localStorage.removeItem("leetstats-usernames");
      }
    }
    if (storedGroupName) {
      setGroupName(storedGroupName)
    }

    setIsLoading(false)

    if (!storedUsernames || initialUsernames.length === 0) {
      setShowSetup(true)
    }
  }, [])

  const handleSetupComplete = (newUsernames: string[], newGroupName: string) => {
    localStorage.setItem("leetstats-usernames", JSON.stringify(newUsernames))
    localStorage.setItem("leetstats-group-name", newGroupName)
    setUsernames(newUsernames)
    setGroupName(newGroupName)
    setShowSetup(false) 
  }

  const handleUpdateUsernames = (newUsernames: string[]) => {
    localStorage.setItem("leetstats-usernames", JSON.stringify(newUsernames))
    setUsernames(newUsernames)
  }

  const handleSetupClose = () => {
    setShowSetup(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
      <SetupDialog
        isOpen={showSetup}
        onComplete={handleSetupComplete}
        onClose={handleSetupClose} 
      />
      {usernames.length > 0 && ( 
        <Dashboard
          usernames={usernames}
          groupName={groupName}
          onUpdateUsernames={handleUpdateUsernames}
          onOpenSetup={() => setShowSetup(true)} 
        />
      )}
      {usernames.length === 0 && !showSetup && (
        <div className="min-h-screen flex items-center justify-center text-muted-foreground">
          No group configured. Please set up your group.
        </div>
      )}
    </>
  )
}