"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function AuthTestPage() {
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const supabase = supabaseBrowser();

    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function sendMagicLink() {
    setStatus("Sending…");
    const supabase = supabaseBrowser();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // IMPORTANT: must match a route in your app
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    setStatus(error ? error.message : "Check your email for the login link.");
  }

  async function signOut() {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    setStatus("Signed out.");
  }

  return (
    <div style={{ maxWidth: 420, margin: "80px auto", fontFamily: "system-ui" }}>
      <h1>Auth test</h1>

      {userEmail ? (
        <>
          <p>Signed in as: {userEmail}</p>
          <button onClick={signOut}>Sign out</button>
          <p>{status}</p>
        </>
      ) : (
        <>
          <p>Not signed in</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />
          <button onClick={sendMagicLink} style={{ width: "100%", padding: 10 }}>
            Send magic link
          </button>
          <p>{status}</p>
        </>
      )}
    </div>
  );
}
