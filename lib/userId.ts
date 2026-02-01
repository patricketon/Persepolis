// lib/userId.ts

export function getOrCreateUserId() {
  if (typeof window === "undefined") return null;

  const key = "persepolis_user_id";
  let id = localStorage.getItem(key);

  if (!id) {
    id = crypto.randomUUID(); // ✅ built-in
    localStorage.setItem(key, id);
  }

  return id;
}
