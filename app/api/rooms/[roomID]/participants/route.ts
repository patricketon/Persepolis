import { NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"

export async function GET(
  req: NextRequest,
  { params }: { params: { roomId: string } }
) {
  const supabase = supabaseServer()

  const { data, error } = await supabase
    .from("room_participants")
    .select(`
      user_id,
      profiles (
        display_name
      )
    `)
    .eq("room_id", params.roomId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(
    data.map((row: any) => ({
      user_id: row.user_id,
      display_name: row.profiles?.display_name ?? "Anonymous"
    }))
  )
}