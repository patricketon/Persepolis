import { supabaseServer } from "@/lib/supabaseServer"

const WEEKLY_LIMIT_MINUTES = 300 // 5 hours

export async function getWeeklyUsage(userId: string): Promise<{
  usedMinutes: number
  remainingMinutes: number
  limitReached: boolean
}> {
  const supabase = supabaseServer()

  // Get start of current week (Monday 00:00 UTC)
  const now = new Date()
  const day = now.getUTCDay()
  const diff = day === 0 ? 6 : day - 1 // Monday = 0
  const monday = new Date(now)
  monday.setUTCDate(now.getUTCDate() - diff)
  monday.setUTCHours(0, 0, 0, 0)

  const { data, error } = await supabase
    .from("session_participants")
    .select("session_id, sessions(duration_minutes)")
    .eq("user_id", userId)
    .gte("joined_at", monday.toISOString())

  if (error || !data) {
    return { usedMinutes: 0, remainingMinutes: WEEKLY_LIMIT_MINUTES, limitReached: false }
  }

  const usedMinutes = data.reduce((sum, row) => {
    const duration = (row.sessions as any)?.duration_minutes ?? 0
    return sum + duration
  }, 0)

  return {
    usedMinutes,
    remainingMinutes: Math.max(0, WEEKLY_LIMIT_MINUTES - usedMinutes),
    limitReached: usedMinutes >= WEEKLY_LIMIT_MINUTES,
  }
}