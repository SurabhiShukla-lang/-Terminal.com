// ============================================================
//  SkillBridge — Shared Auth Helper (auth.js)
//  Include this in every page AFTER the Supabase SDK script
// ============================================================

const SUPABASE_URL  = 'https://zqcgjtwvwndrieixhjgc.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxY2dqdHd2d25kcmllaXhoamdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTE5MDMsImV4cCI6MjA5MzI4NzkwM30.Rs0glR7Zcb_n1ALkSZgbvMDdIWll6x3GnZ5ACa1WOZ8';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON);

// ---- Logout: clears localStorage (mock auth for development) ----
async function logout() {
  // await db.auth.signOut(); // Commented out for mock auth
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

// ---- Auth Guard: redirects to login if not authenticated ----
async function requireAuth() {
  // Check localStorage for mock user
  const cached = localStorage.getItem('user');
  if (!cached) {
    window.location.href = 'index.html';
    return null;
  }
  // For development: no Supabase session check
  // const { data: { session } } = await db.auth.getSession();
  // if (!session) {
  //   localStorage.removeItem('user');
  //   window.location.href = 'index.html';
  //   return null;
  // }
  return JSON.parse(cached);
}

// ---- Get current user from localStorage ----
function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}');
  } catch {
    return {};
  }
}

// expose both legacy and new global logout hooks for pages
window.__skillBridgeLogout = logout;
window.__sprmsLogout = logout;
