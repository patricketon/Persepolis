import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export default async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data, error } = await supabase.rpc("group_pending_sessions");

  if (error) {
    console.error("Grouping failed:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log("Grouped sessions:", data);

  return new Response(JSON.stringify({ results: data }), {
    headers: { "Content-Type": "application/json" },
  });
};
