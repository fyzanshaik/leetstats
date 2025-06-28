"use client";

import { useState, useEffect, useCallback } from "react";
import { Settings, Code2, Users, Trophy, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecentSubmissions from "./RecentSubmissions";
import SettingsModal from "./SettingsModal";
import UserProfileCard from "./UserProfileCard";
import TodayWinnerCard from "./TodayWinnerCard";
import WeeklyMonthlyCard from "./WeeklyMonthlyCard";
import Footer from "./Footer";
import { fetchUserStats } from "../actions/leetcode";
import type { UserStats } from "../types/leetcode";

interface DashboardProps {
  usernames: string[];
  groupName: string;
  onUpdateUsernames: (usernames: string[]) => void;
  onOpenSetup: () => void;
}

export default function Dashboard({
  usernames,
  groupName,
  onUpdateUsernames,
  onOpenSetup,
}: DashboardProps) {
  const [userStats, setUserStats] = useState<UserStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const loadUserStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const stats = await fetchUserStats(usernames);
      setUserStats(stats);
    } catch (error) {
      console.error("Error loading user stats:", error);
    } finally {
      setIsLoading(false);
    }
  }, [usernames]);

  useEffect(() => {
    loadUserStats();
  }, [usernames, loadUserStats]);

  const handleClearData = () => {
    localStorage.clear();
    window.location.reload();
  };

  const ContentWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <header className="border-b border-border bg-card/30 py-3 backdrop-blur-sm shadow-md">
          <ContentWrapper>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Code2 className="h-7 w-7 text-primary" />
                <div className="min-w-0">
                  <h1 className="truncate text-2xl font-bold tracking-tight text-foreground">
                    LeetStats
                  </h1>
                  <div className="mt-0.5 flex items-center gap-2 text-base text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Loading group data...</span>
                  </div>
                </div>
              </div>
              <div className="h-9 w-full animate-pulse rounded-md bg-muted sm:w-36" />
            </div>
          </ContentWrapper>
        </header>

        <main className="flex-grow">
          <ContentWrapper>
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-lg bg-muted/20 p-6 shadow-sm"
                >
                  <div className="mb-3 h-6 w-3/4 rounded bg-muted" />
                  <div className="h-10 w-1/2 rounded bg-muted" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="animate-pulse rounded-lg bg-muted/20 p-8 shadow-sm lg:col-span-2">
                <div className="mb-6 h-8 w-1/4 rounded bg-muted" />
                <div className="h-64 rounded bg-muted" />
              </div>
              <div className="animate-pulse space-y-4 rounded-lg bg-muted/20 p-8 shadow-sm">
                <div className="mb-6 h-8 w-1/3 rounded bg-muted" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-16 rounded bg-muted" />
                ))}
              </div>
            </div>
          </ContentWrapper>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-gradient-to-r from-card/70 to-card/50 py-3 backdrop-blur-md shadow-lg">
        <ContentWrapper>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Code2 className="h-7 w-7 text-primary" />
              <div className="min-w-0">
                <h1 className="truncate text-2xl font-bold tracking-tight text-foreground">
                  LeetStats
                </h1>
                <div className="mt-0.5 flex flex-wrap items-center gap-2 text-base text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="font-semibold text-foreground/90">
                    {groupName}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="sm:truncate">
                    {usernames.length} Members
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setShowSettings(true)}
              variant="outline"
              size="default"
              className="w-full rounded-md border-border px-4 py-2 text-sm shadow-sm hover:bg-accent sm:w-auto"
            >
              <Settings className="mr-2 h-4 w-4" />
              Group Settings
            </Button>
          </div>
        </ContentWrapper>
      </header>

      <main className="flex-grow">
        <ContentWrapper>
          <div className="mb-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border/50 bg-card/50 p-6 shadow-md backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/20">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Today&apos;s Leader
                  </p>
                  <p className="mt-1 text-xl font-bold text-foreground">
                    {
                      userStats.reduce((a, b) =>
                        a.solvedToday > b.solvedToday ? a : b,
                      )?.username
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border/50 bg-card/50 p-6 shadow-md backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/20">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Today&apos;s Total
                  </p>
                  <p className="mt-1 font-mono text-xl font-bold text-foreground">
                    {userStats.reduce((sum, u) => sum + u.solvedToday, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <TodayWinnerCard userStats={userStats} />
                <WeeklyMonthlyCard userStats={userStats} />
              </div>

              <div className="flex w-full justify-center">
                <div className="w-full max-w-4xl">
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
        onClearData={handleClearData}
        groupName={groupName}
        onUpdateUsernames={onUpdateUsernames}
        onOpenSetup={onOpenSetup}
      />
      <Footer />
    </div>
  );
}
