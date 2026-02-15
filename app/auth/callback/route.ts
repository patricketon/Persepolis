import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const returnTo = url.searchParams.get("returnTo") || "/";

  if (!code) return NextResponse.redirect(`${url.origin}/`);

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  // await supabase.auth.exchangeCodeForSession(code);

  // return NextResponse.redirect(
  //   `${url.origin}/auth/complete?returnTo=${encodeURIComponent(returnTo)}`
  // );

  await supabase.auth.exchangeCodeForSession(code);

    // Check if user already completed profile
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(`${url.origin}/`);
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_21_plus")
      .eq("id", user.id)
      .maybeSingle();

    // If profile incomplete → send to complete page
    if (!profile || !profile.is_21_plus) {
      return NextResponse.redirect(
        `${url.origin}/auth/complete?returnTo=${encodeURIComponent(returnTo)}`
      );
    }

    // Otherwise go straight back where they intended
    return NextResponse.redirect(`${url.origin}${returnTo}`);
}
