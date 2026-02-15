import { supabaseServer } from "@/lib/supabaseServer"

/**
 * Check if a user has an active subscription (either trialing or paid).
 * Use this to gate access to joining sessions.
 */
export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const supabase = supabaseServer()

  const { data } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", userId)
    .in("status", ["active", "trialing"])
    .single()

  return !!data
}