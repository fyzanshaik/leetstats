"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, User, ExternalLink } from "lucide-react";
import type { UserStats } from "../types/leetcode";
import Image from "next/image";

interface UserProfileCardProps {
  userStats: ReadonlyArray<UserStats>;
}

export default function UserProfileCard({
  userStats,
}: Readonly<UserProfileCardProps>) {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  if (userStats.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 h-full flex items-center justify-center">
        <CardContent className="text-muted-foreground text-center text-base">
          No user data available.
        </CardContent>
      </Card>
    );
  }

  const currentUser = userStats[currentUserIndex];
  const profile = currentUser.profile;

  const nextUser = () => {
    setCurrentUserIndex((prev) => (prev + 1) % userStats.length);
  };

  const prevUser = () => {
    setCurrentUserIndex(
      (prev) => (prev - 1 + userStats.length) % userStats.length,
    );
  };

  const getProgressPercentage = (solved: number, total: number) => {
    return total > 0 ? Math.round((solved / total) * 100) : 0;
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-3">
            <User className="w-5 h-5 text-primary" />
            User Profile
          </CardTitle>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={prevUser}
              disabled={userStats.length <= 1}
              className="h-8 w-8 p-0 rounded-md border-border hover:bg-accent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground font-mono">
              {currentUserIndex + 1}/{userStats.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={nextUser}
              disabled={userStats.length <= 1}
              className="h-8 w-8 p-0 rounded-md border-border hover:bg-accent"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        <div className="flex items-center gap-3 sm:gap-4 border-b border-border/50 pb-4">
          <Image
            src={
              profile?.profile?.userAvatar ??
              "/placeholder.svg?height=60&width=60"
            }
            alt={`${currentUser.username} avatar`}
            height={60}
            width={60}
            className="w-16 h-16 rounded-full border-2 border-primary/50 object-cover flex-shrink-0 shadow-md"
          />
          <div className="flex-1 space-y-1 min-w-0">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-foreground truncate">
                {currentUser.username}
              </h3>
              <a
                href={`https://leetcode.com/${currentUser.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors flex items-center justify-center p-1 rounded-full hover:bg-primary/10"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            {profile?.profile?.ranking && (
              <p className="text-sm text-muted-foreground font-mono">
                Global Rank:{" "}
                <span className="font-semibold text-foreground">
                  #{profile.profile.ranking.toLocaleString()}
                </span>
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-extrabold text-primary font-mono leading-tight">
              {currentUser.totalSolved.toLocaleString()}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Total Solved
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="text-center">
            <div className="text-sm text-green-400 font-semibold mb-2">
              Easy
            </div>
            <div className="text-xl font-bold font-mono text-foreground">
              {currentUser.easySolved}/{currentUser.easyTotal}
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className="bg-green-400 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${getProgressPercentage(currentUser.easySolved, currentUser.easyTotal)}%`,
                }}
              />
            </div>
            <div className="text-sm text-muted-foreground mt-2 font-mono">
              {getProgressPercentage(
                currentUser.easySolved,
                currentUser.easyTotal,
              )}
              %
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-yellow-400 font-semibold mb-2">
              Medium
            </div>
            <div className="text-xl font-bold font-mono text-foreground">
              {currentUser.mediumSolved}/{currentUser.mediumTotal}
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${getProgressPercentage(currentUser.mediumSolved, currentUser.mediumTotal)}%`,
                }}
              />
            </div>
            <div className="text-sm text-muted-foreground mt-2 font-mono">
              {getProgressPercentage(
                currentUser.mediumSolved,
                currentUser.mediumTotal,
              )}
              %
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-red-400 font-semibold mb-2">Hard</div>
            <div className="text-xl font-bold font-mono text-foreground">
              {currentUser.hardSolved}/{currentUser.hardTotal}
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className="bg-red-400 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${getProgressPercentage(currentUser.hardSolved, currentUser.hardTotal)}%`,
                }}
              />
            </div>
            <div className="text-sm text-muted-foreground mt-2 font-mono">
              {getProgressPercentage(
                currentUser.hardSolved,
                currentUser.hardTotal,
              )}
              %
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold font-mono text-foreground">
              {currentUser.solvedToday}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-mono text-foreground">
              {currentUser.solvedThisWeek}
            </div>
            <div className="text-sm text-muted-foreground mt-1">This Week</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-mono text-foreground">
              {currentUser.solvedThisMonth}
            </div>
            <div className="text-sm text-muted-foreground mt-1">This Month</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
