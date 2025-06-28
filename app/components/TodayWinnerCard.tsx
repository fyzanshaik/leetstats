"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Crown } from "lucide-react"
import type { UserStats } from "../types/leetcode"

interface TodayWinnerCardProps {
  userStats: UserStats[]
}

export default function TodayWinnerCard({ userStats }: TodayWinnerCardProps) {
  const todayWinner = userStats.reduce(
    (prev, current) =>
      prev.solvedToday > current.solvedToday ||
      (prev.solvedToday === current.solvedToday && prev.username < current.username) // Tie-breaker: alphabetical
        ? prev
        : current,
    { username: "No Data", solvedToday: 0 } as UserStats
  );

  const getRankBadgeColor = (rankIndex: number) => {
    switch (rankIndex) {
      case 0: // Gold for #1
        return "bg-amber-400/20 text-amber-300 border-amber-400/30";
      case 1: // Silver for #2
        return "bg-slate-400/20 text-slate-300 border-slate-400/30";
      case 2: // Bronze for #3
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: // Default color for others
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  if (!userStats || userStats.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 h-full flex flex-col justify-center items-center">
        <CardHeader className="pb-3 text-center">
          <CardTitle className="text-base font-semibold flex items-center justify-center gap-2 text-muted-foreground">
            <Crown className="w-5 h-5" />
            Today&apos;s Champion
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center text-muted-foreground">
          No user data available.
        </CardContent>
      </Card>
    );
  }

  const sortedUsersForLeaderboard = userStats
    .slice()
    .sort((a, b) => b.solvedToday - a.solvedToday); // Sort by solved today, descending

  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium flex items-center gap-3">
          <Crown className="w-5 h-5 text-primary" />
          Today&apos;s Champion
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-5"> {/* Adjusted space-y to 5 */}
        {/* Winner Highlight as a prominent Badge-like element */}
        <div className="relative text-center px-4 py-3 bg-primary/10 rounded-lg border border-primary/20 shadow-inner flex flex-col items-center justify-center">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center text-primary shadow-lg">
            <Trophy className="w-5 h-5" />
          </div>
          <p className="text-sm text-muted-foreground mt-4 mb-1">Champion</p>
          <span className="text-xl font-bold text-primary">
            {todayWinner?.username || "N/A"}
          </span>
          <p className="text-sm text-muted-foreground font-mono mt-1">
            {todayWinner?.solvedToday || 0} problems solved today
          </p>
        </div>

        <div className="space-y-3 pt-2"> {/* Added slight padding top for visual separation */}
          <h4 className="text-sm font-semibold text-muted-foreground">
            Top Daily Solvers
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-2">
            {sortedUsersForLeaderboard.map((user, index) => (
              <div
                key={user.username}
                className="flex items-center justify-between p-2 rounded-md bg-muted/20 hover:bg-muted/30 transition-colors border border-border/50" /* Slightly lighter bg for ranks */
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono w-6 text-muted-foreground flex-shrink-0">
                    #{index + 1}
                  </span>
                  <Badge className={getRankBadgeColor(index)} variant="secondary">
                    <span className="text-base font-medium">{user.username}</span>
                  </Badge>
                </div>
                <span className="text-base font-mono font-bold">
                  {user.solvedToday}
                </span>
              </div>
            ))}
            {userStats.every((user) => user.solvedToday === 0) && (
              <div className="text-center text-sm text-muted-foreground py-2">
                All members solved 0 problems today.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}