export interface UserProfile {
  contestBadge: {
    name: string
    expired: boolean
    hoverText: string
    icon: string
  } | null
  username: string
  githubUrl: string | null
  twitterUrl: string | null
  linkedinUrl: string | null
  profile: {
    ranking: number
    userAvatar: string
    realName: string
    aboutMe: string
    school: string | null
    websites: string[]
    countryName: string | null
    company: string | null
    jobTitle: string | null
    skillTags: string[]
    postViewCount: number
    postViewCountDiff: number
    reputation: number
    reputationDiff: number
    solutionCount: number
    solutionCountDiff: number
    categoryDiscussCount: number
    categoryDiscussCountDiff: number
    certificationLevel: string
  }
}

export interface LanguageStats {
  languageName: string
  problemsSolved: number
}

export interface SkillStats {
  advanced: Array<{
    tagName: string
    tagSlug: string
    problemsSolved: number
  }>
  intermediate: Array<{
    tagName: string
    tagSlug: string
    problemsSolved: number
  }>
  fundamental: Array<{
    tagName: string
    tagSlug: string
    problemsSolved: number
  }>
}

export interface ContestRanking {
  attendedContestsCount: number
  rating: number
  globalRanking: number
  totalParticipants: number
  topPercentage: number
  badge: {
    name: string
  } | null
}

export interface ContestHistory {
  attended: boolean
  trendDirection: string
  problemsSolved: number
  totalProblems: number
  finishTimeInSeconds: number
  rating: number
  ranking: number
  contest: {
    title: string
    startTime: number
  }
}

export interface QuestionProgress {
  numAcceptedQuestions: Array<{
    count: number
    difficulty: string
  }>
  numFailedQuestions: Array<{
    count: number
    difficulty: string
  }>
  numUntouchedQuestions: Array<{
    count: number
    difficulty: string
  }>
  userSessionBeatsPercentage: Array<{
    difficulty: string
    percentage: number
  }>
  totalQuestionBeatsPercentage: number
}

export interface SubmissionStats {
  acSubmissionNum: Array<{
    difficulty: string
    count: number
    submissions: number
  }>
  totalSubmissionNum: Array<{
    difficulty: string
    count: number
    submissions: number
  }>
}

export interface UserCalendar {
  activeYears: number[]
  streak: number
  totalActiveDays: number
  dccBadges: Array<{
    timestamp: number
    badge: {
      name: string
      icon: string
    }
  }>
  submissionCalendar: string 
}

export interface RecentSubmission {
  id: string
  title: string
  titleSlug: string
  timestamp: number
  difficulty: string
}

export interface UserBadge {
  id: string
  name: string
  shortName: string
  displayName: string
  icon: string
  hoverText: string
  medal: {
    slug: string
    config: {
      iconGif: string
      iconGifBackground: string
    }
  } | null
  creationDate: string
  category: string
}

export interface UpcomingBadge {
  name: string
  icon: string
  progress: number
}


export interface QuestionCount {
  difficulty: string
  count: number
}

export interface SubmissionCount {
  difficulty: string
  count: number
  submissions: number
}

export interface UserSubmitStats {
  acSubmissionNum: SubmissionCount[]
  totalSubmissionNum: SubmissionCount[]
}

export interface UserProblemsData {
  allQuestionsCount: QuestionCount[]
  matchedUser: {
    submitStats: UserSubmitStats
  } | null
}

export interface UserStats {
  username: string
  totalSolved: number
  totalSubmissions: number
  easySolved: number
  easyTotal: number
  mediumSolved: number
  mediumTotal: number
  hardSolved: number
  hardTotal: number
  solvedToday: number
  solvedThisWeek: number
  solvedThisMonth: number
  recentSubmissions: RecentSubmission[]
  submissionCalendar: string
  streak: number
  totalActiveDays: number
  profile: UserProfile | null
}

export interface GraphQLQuery {
  query: string
  variables?: Record<string, any>
  operationName?: string
}

export interface GraphQLResponse<T> {
  data: T
  errors?: Array<{
    message: string
    locations?: Array<{
      line: number
      column: number
    }>
    path?: string[]
  }>
}
