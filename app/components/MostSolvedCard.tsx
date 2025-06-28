import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import type { UserStats } from "../types/leetcode"

interface MostSolvedCardProps {
  userStats: UserStats[]
}

export default function MostSolvedCard({ userStats }: MostSolvedCardProps) {
  const topUser = userStats.reduce((prev, current) => (prev.totalSolved > current.totalSolved ? prev : current))

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
        <Trophy className="h-4 w-4 text-yellow-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{topUser?.username || "N/A"}</div>
        <p className="text-xs text-muted-foreground">{topUser?.totalSolved || 0} problems solved</p>
        <div className="mt-4 space-y-2">
          {userStats
            .sort((a, b) => b.totalSolved - a.totalSolved)
            .slice(0, 3)
            .map((user, index) => (
              <div key={user.username} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                    }`}
                  />
                  {user.username}
                </span>
                <span className="font-medium">{user.totalSolved}</span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
