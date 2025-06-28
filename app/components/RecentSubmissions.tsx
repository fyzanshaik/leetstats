"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ExternalLink } from "lucide-react"
import type { UserStats } from "../types/leetcode"

interface RecentSubmissionsProps {
  userStats: UserStats[]
}

export default function RecentSubmissions({
  userStats,
}: RecentSubmissionsProps) {
  const allSubmissions = userStats
    .flatMap((user) =>
      user.recentSubmissions.map((submission) => ({
        ...submission,
        username: user.username,
      })),
    )
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 15)

  const formatTime = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d`
    if (hours > 0) return `${hours}h`
    if (minutes > 0) return `${minutes}m`
    return "now"
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "hard":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  const getUserColor = (username: string) => {
    const userIndex = userStats.findIndex((user) => user.username === username)
    const colors = [
      "bg-primary/20 text-primary border-primary/30",
      "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "bg-orange-500/20 text-orange-400 border-orange-500/30",
    ]
    return colors[userIndex % colors.length]
  }

  if (allSubmissions.length === 0) {
    return (
      <Card className="stat-card h-[300px] flex flex-col"> 
        <CardHeader>
          <CardTitle className=" font-medium  flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center"> 
          <div className="text-muted-foreground">
            No recent submissions found
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg h-[659px] flex flex-col"> 
      <CardHeader className="">
        <CardTitle className="text-md font-medium flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto custom-scrollbar pr-4">
        <div className="space-y-2">
          {allSubmissions.map((submission, index) => (
            <a
              key={`${submission.username}-${submission.id}-${index}`}
              href={`https://leetcode.com/problems/${submission.titleSlug}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors group border border-border/50"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-medium text-base truncate flex-1">
                  {submission.title}
                </h4>
                <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="secondary"
                  className={getDifficultyColor(submission.difficulty)}
                >
                  {submission.difficulty}
                </Badge>
                <Badge
                  variant="outline"
                  className={getUserColor(submission.username)}
                >
                  {submission.username}
                </Badge>
                <span className="text-sm text-muted-foreground font-mono ml-auto">
                  {formatTime(submission.timestamp)}
                </span>
              </div>
            </a>
          ))}
        </div>
        {allSubmissions.length === 15 && (
          <div className="text-center mt-3 pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing latest 15 submissions
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}