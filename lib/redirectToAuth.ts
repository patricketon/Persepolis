export function redirectToAuth() {
  const returnPath =
    window.location.pathname + window.location.search;

  window.location.href = `/auth?returnTo=${encodeURIComponent(returnPath)}`;
}