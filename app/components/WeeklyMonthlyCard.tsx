"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"
import type { UserStats } from "../types/leetcode"

interface WeeklyMonthlyCardProps {
  userStats: UserStats[]
}

export default function WeeklyMonthlyCard({ userStats }: WeeklyMonthlyCardProps) {
  const [timeframe, setTimeframe] = useState<"week" | "month">("week")

  const sortedUsers = userStats.slice().sort((a, b) => {
    const aValue = timeframe === "week" ? a.solvedThisWeek : a.solvedThisMonth
    const bValue = timeframe === "week" ? b.solvedThisWeek : b.solvedThisMonth
    return bValue - aValue
  })

  const chartData = sortedUsers.slice(0, 4).map((user) => ({
    username: user.username.length > 7 ? user.username.slice(0, 5) + "..." : user.username, 
    solved: timeframe === "week" ? user.solvedThisWeek : user.solvedThisMonth,
  }))

  const winner = sortedUsers[0]
  const winnerCount = timeframe === "week" ? winner?.solvedThisWeek : winner?.solvedThisMonth

  const hasData = sortedUsers.some((user) =>
    timeframe === "week" ? user.solvedThisWeek > 0 : user.solvedThisMonth > 0,
  )

  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            {timeframe === "week" ? "Weekly" : "Monthly"} Progress
          </CardTitle>
          <div className="flex gap-2 p-1 rounded-md bg-muted/30 border border-border/50">
            <Button
              variant={timeframe === "week" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeframe("week")}
              className={`h-7 px-3 text-sm font-medium ${
                timeframe === "week"
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                  : "hover:bg-muted/50 text-muted-foreground"
              }`}
            >
              Week
            </Button>
            <Button
              variant={timeframe === "month" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeframe("month")}
              className={`h-7 px-3 text-sm font-medium ${
                timeframe === "month"
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                  : "hover:bg-muted/50 text-muted-foreground"
              }`}
            >
              Month
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-5">
        <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20 shadow-inner">
          <div className="font-bold text-xl text-primary">
            {winner?.username || "N/A"}
          </div>
          <p className="text-sm text-muted-foreground font-mono mt-1">
            {winnerCount || 0} problems this {timeframe}
          </p>
        </div>

        {hasData ? (
          <>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <XAxis
                    dataKey="username"
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                    interval={0} 
                  />
                  <Bar dataKey="solved" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={20} /> 
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-sm font-semibold text-muted-foreground mb-1">Top Solvers</h4>
              {sortedUsers.slice(0, 3).map((user, index) => {
                const solved = timeframe === "week" ? user.solvedThisWeek : user.solvedThisMonth;
                const colors = [
                  "text-amber-300", 
                  "text-slate-300", 
                  "text-orange-400" 
                ];
                return (
                  <div key={user.username} className="flex items-center justify-between text-base"> 
                    <span className={`font-semibold ${colors[index]}`}>
                      #{index + 1} {user.username}
                    </span>
                    <span className="font-mono text-foreground font-bold">{solved}</span> 
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-48 text-muted-foreground text-base"> 
            No activity this {timeframe}.
          </div>
        )}
      </CardContent>
    </Card>
  )
}