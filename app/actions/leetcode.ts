"use server"

import type { UserProblemsData, UserStats, RecentSubmission } from "../types/leetcode"
import {
  USER_PROBLEMS_SOLVED,
  USER_PROFILE_CALENDAR,
  RECENT_AC_SUBMISSIONS,
  USER_PUBLIC_PROFILE,
} from "../lib/leetcode-queries"

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql/"

async function fetchLeetCodeData(query: string, variables: Record<string, any>) {
  try {
    const response = await fetch(LEETCODE_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; LeetCodeDashboard/1.0)",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("LeetCode API Error:", error)
    throw error
  }
}

function calculateUserStats(username: string, problemsData: UserProblemsData): UserStats {
  if (!problemsData.matchedUser) {
    return {
      username,
      totalSolved: 0,
      totalSubmissions: 0,
      easySolved: 0,
      easyTotal: 0,
      mediumSolved: 0,
      mediumTotal: 0,
      hardSolved: 0,
      hardTotal: 0,
      solvedToday: 0,
      solvedThisWeek: 0,
      recentSubmissions: [],
      submissionCalendar: "{}",
      streak: 0,
      totalActiveDays: 0,
      solvedThisMonth: 0,
      profile: null,
    }
  }

  const { submitStats } = problemsData.matchedUser
  const { allQuestionsCount } = problemsData

  const totalSolvedData = submitStats.acSubmissionNum.find((item) => item.difficulty === "All")
  const totalSubmissionsData = submitStats.totalSubmissionNum.find((item) => item.difficulty === "All")

  const easySolved = submitStats.acSubmissionNum.find((item) => item.difficulty === "Easy")?.count || 0
  const mediumSolved = submitStats.acSubmissionNum.find((item) => item.difficulty === "Medium")?.count || 0
  const hardSolved = submitStats.acSubmissionNum.find((item) => item.difficulty === "Hard")?.count || 0

  const easyTotal = allQuestionsCount.find((item) => item.difficulty === "Easy")?.count || 0
  const mediumTotal = allQuestionsCount.find((item) => item.difficulty === "Medium")?.count || 0
  const hardTotal = allQuestionsCount.find((item) => item.difficulty === "Hard")?.count || 0

  return {
    username,
    totalSolved: totalSolvedData?.count || 0,
    totalSubmissions: totalSubmissionsData?.submissions || 0,
    easySolved,
    easyTotal,
    mediumSolved,
    mediumTotal,
    hardSolved,
    hardTotal,
    solvedToday: 0,
    solvedThisWeek: 0,
    recentSubmissions: [],
    submissionCalendar: "{}",
    streak: 0,
    totalActiveDays: 0,
    solvedThisMonth: 0,
    profile: null,
  }
}

function calculateTimeBasedStats(recentSubmissions: RecentSubmission[]) {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

  const submissionsByDate = new Map<string, Set<string>>()

  recentSubmissions.forEach((submission) => {
    const submissionDate = new Date(submission.timestamp)
    const dateKey = submissionDate.toDateString()

    if (!submissionsByDate.has(dateKey)) {
      submissionsByDate.set(dateKey, new Set())
    }

    submissionsByDate.get(dateKey)!.add(submission.titleSlug)
  })

  let solvedToday = 0
  let solvedThisWeek = 0
  let solvedThisMonth = 0

  submissionsByDate.forEach((problemsSet, dateKey) => {
    const date = new Date(dateKey)
    const uniqueProblemsCount = problemsSet.size

    if (date.toDateString() === today.toDateString()) {
      solvedToday = uniqueProblemsCount
    }
    if (date >= weekAgo) {
      solvedThisWeek += uniqueProblemsCount
    }
    if (date >= monthAgo) {
      solvedThisMonth += uniqueProblemsCount
    }
  })

  return { solvedToday, solvedThisWeek, solvedThisMonth }
}

export async function fetchUserStats(usernames: string[]): Promise<UserStats[]> {
  const userStatsPromises = usernames.map(async (username) => {
    try {
      const problemsResponse = await fetchLeetCodeData(USER_PROBLEMS_SOLVED, { username })
      const baseStats = calculateUserStats(username, problemsResponse.data)

      const calendarResponse = await fetchLeetCodeData(USER_PROFILE_CALENDAR, { username })
      const calendarData = calendarResponse.data?.matchedUser?.userCalendar

      const profileResponse = await fetchLeetCodeData(USER_PUBLIC_PROFILE, { username })
      const profileData = profileResponse.data?.matchedUser

      const recentSubmissions = await fetchUserRecentSubmissions(username, 100)

      const { solvedToday, solvedThisWeek, solvedThisMonth } = calculateTimeBasedStats(recentSubmissions)

      return {
        ...baseStats,
        solvedToday,
        solvedThisWeek,
        solvedThisMonth,
        recentSubmissions: recentSubmissions.slice(0, 20),
        submissionCalendar: calendarData?.submissionCalendar || "{}",
        streak: calendarData?.streak || 0,
        totalActiveDays: calendarData?.totalActiveDays || 0,
        profile: profileData || null,
      }
    } catch (error) {
      console.error(`Error fetching data for ${username}:`, error)
      return calculateUserStats(username, { allQuestionsCount: [], matchedUser: null })
    }
  })

  return Promise.all(userStatsPromises)
}

export async function fetchUserRecentSubmissions(username: string, limit = 100): Promise<RecentSubmission[]> {
  try {
    const response = await fetchLeetCodeData(RECENT_AC_SUBMISSIONS, { username, limit })

    if (!response.data?.recentAcSubmissionList) {
      return []
    }

    return response.data.recentAcSubmissionList.map((submission: any) => ({
      id: submission.id,
      title: submission.title,
      titleSlug: submission.titleSlug,
      timestamp: Number.parseInt(submission.timestamp) * 1000,
      difficulty: getDifficultyFromTitle(submission.title),
    }))
  } catch (error) {
    console.error(`Error fetching recent submissions for ${username}:`, error)
    return []
  }
}

function getDifficultyFromTitle(title: string): string {
  const easyKeywords = [
    "Two Sum",
    "Single Number",
    "Missing Number",
    "Remove Duplicates",
    "Move Zeroes",
    "Max Consecutive Ones",
    "Running Sum",
    "Count Odd Numbers",
    "Palindrome Number",
    "Reverse String",
    "Valid Palindrome",
  ]
  const hardKeywords = [
    "Median",
    "Longest",
    "Maximum",
    "Minimum",
    "Sort Characters By Frequency",
    "Longest Common Prefix",
  ]

  if (easyKeywords.some((keyword) => title.includes(keyword))) return "Easy"
  if (hardKeywords.some((keyword) => title.includes(keyword))) return "Hard"
  return "Medium"
}

export async function fetchUserCalendar(username: string, year?: number) {
  try {
    const response = await fetchLeetCodeData(USER_PROFILE_CALENDAR, { username, year })
    return response.data?.matchedUser?.userCalendar || null
  } catch (error) {
    console.error(`Error fetching calendar for ${username}:`, error)
    return null
  }
}
