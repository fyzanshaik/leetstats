"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Settings, Code2, Users, Trophy, TrendingUp, Clock, User } from "lucide-react"
import RecentSubmissions from "./RecentSubmissions"
import SettingsModal from "./SettingsModal"
import UserProfileCard from "./UserProfileCard"
import { fetchUserStats } from "../actions/leetcode"
import type { UserStats } from "../types/leetcode"
import TodayWinnerCard from "./TodayWinnerCard"
import WeeklyMonthlyCard from "./WeeklyMonthlyCard"
import Footer from "./Footer"

interface DashboardProps {
  usernames: string[]
  groupName: string
  onUpdateUsernames: (usernames: string[]) => void
  onOpenSetup: () => void
}

export default function Dashboard({ usernames, groupName, onUpdateUsernames, onOpenSetup }: DashboardProps) {
  const [userStats, setUserStats] = useState<UserStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showSettings, setShowSettings] = useState(false)

  const loadUserStats = useCallback(async () => {
    setIsLoading(true)
    try {
      const stats = await fetchUserStats(usernames)
      setUserStats(stats)
    } catch (error) {
      console.error("Error loading user stats:", error)
    } finally {
      setIsLoading(false)
    }
  }, [usernames])

  useEffect(() => {
    loadUserStats()
  }, [usernames, loadUserStats])

  const ContentWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4"> {}
      {children}
    </div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {}
        <header className="border-b border-border bg-card/30 backdrop-blur-sm shadow-md py-4"> {}
          <ContentWrapper>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3"> {}
                <Code2 className="w-7 h-7 text-primary" /> {}
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-foreground">LeetStats</h1> {}
                  <div className="flex items-center gap-2 text-base text-muted-foreground mt-0.5"> {}
                    <Users className="w-4 h-4" /> {}
                    <span>Loading group data...</span>
                  </div>
                </div>
              </div>
              <div className="h-9 w-36 bg-muted rounded-md animate-pulse"></div> {}
            </div>
          </ContentWrapper>
        </header>

        {}
        <main className="flex-grow">
          <ContentWrapper> {}
            {}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="metric-card bg-muted/20 p-6 rounded-lg shadow-sm animate-pulse">
                  <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
                  <div className="h-10 bg-muted rounded w-1/2"></div>
                </div>
              ))}
            </div>
            {}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 stat-card bg-muted/20 p-8 rounded-lg shadow-sm animate-pulse">
                <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
                <div className="h-64 bg-muted rounded"></div>
              </div>
              <div className="stat-card bg-muted/20 p-8 rounded-lg shadow-sm animate-pulse">
                <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-16 bg-muted rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </ContentWrapper>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      <header className="border-b border-border bg-gradient-to-r from-card/70 to-card/50 backdrop-blur-md shadow-lg py-4"> 
        <ContentWrapper>
          <div className="flex items-center justify-between"> 
            
            <div className="flex items-center gap-3"> 
              <Code2 className="w-7 h-7 text-primary" /> 
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">LeetStats</h1> {}
                <div className="flex items-center gap-2 text-base text-muted-foreground mt-0.5"> {}
                  <Users className="w-4 h-4" /> {}
                  <span className="font-semibold text-foreground/90">{groupName}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{usernames.length} Members</span>
                </div>
              </div>
            </div>
            
            <Button
              onClick={() => setShowSettings(true)}
              variant="outline"
              size="default" 
              className="border-border hover:bg-accent px-4 py-2 text-sm rounded-md shadow-sm" 
            >
              <Settings className="w-4 h-4 mr-2" /> 
              Group Settings
            </Button>
          </div>
        </ContentWrapper>
      </header>

      
      <main className="flex-grow">
        <ContentWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="metric-card bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Today&apos;s Leader</p>
                  <p className="text-xl font-bold text-foreground mt-1">
                    {userStats.reduce((prev, current) => (prev.solvedToday > current.solvedToday ? prev : current))
                      ?.username || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="metric-card bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Solved</p>
                  <p className="text-xl font-bold font-mono text-foreground mt-1">
                    {userStats.reduce((sum, user) => sum + user.totalSolved, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="metric-card bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Today&apos;s Total</p>
                  <p className="text-xl font-bold font-mono text-foreground mt-1">
                    {userStats.reduce((sum, user) => sum + user.solvedToday, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="metric-card bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Members</p>
                  <p className="text-xl font-bold font-mono text-foreground mt-1">
                    {userStats.filter((user) => user.solvedToday > 0).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TodayWinnerCard userStats={userStats} />
                <WeeklyMonthlyCard userStats={userStats} />
              </div>

              <div className="w-full flex justify-center"> 
              <div className="max-w-4xl w-full"> 
                 <UserProfileCard userStats={userStats} />
              </div>
            </div>                 
            </div>
            <RecentSubmissions userStats={userStats} />
          </div>
        </ContentWrapper>
      </main>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        usernames={usernames}
        groupName={groupName}
        onUpdateUsernames={onUpdateUsernames}
        onOpenSetup={onOpenSetup}
      />
      <Footer />
    </div>
  )
}