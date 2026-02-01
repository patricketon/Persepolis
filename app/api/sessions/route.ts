import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseServer";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const bookId =
    searchParams.get("bookId") ??
    searchParams.get("book_id")

  if (!bookId) {
    return NextResponse.json({ error: "bookId is required" }, { status: 400 })
  }

  const supabase = createClient()

  const { data, error } = await supabase
  .from("sessions")
  .select("*")
  .eq("book_id", bookId)
  .gte("start_time_utc", new Date().toISOString()) // ✅ future only
  .order("start_time_utc", { ascending: true })


  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
