import { createClient } from "@supabase/supabase-js";

export default async () => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  await supabase
    .from("session_participants")
    .update({ status: "left" })
    .lt("last_seen_at", new Date(Date.now() - 30_000).toISOString())
    .eq("status", "joined");

  return new Response("ok");
};
