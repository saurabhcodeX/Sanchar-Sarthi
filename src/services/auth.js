import { api } from "./api";

// Store user session in localStorage
const TOKEN_KEY = "ss_token";
const USER_KEY  = "ss_user";

export const auth = {
  // ── Login ──────────────────────────────────────────────────────────────────
  async login({ userId, password }) {
    // When backend is ready, replace mock with:
    // const data = await api.post("/auth/login", { userId, password });

    // ── MOCK (remove once backend is live) ────────────────────────────────
    await new Promise((r) => setTimeout(r, 1000)); // simulate network
    if (password === "wrong") throw new Error("Invalid credentials. Please try again.");
    const data = {
      token: "mock_jwt_token_" + Date.now(),
      user: { id: 1, name: "Traveller", mobile: userId, email: "" },
    };
    // ─────────────────────────────────────────────────────────────────────

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data.user;
  },

  // ── Register ───────────────────────────────────────────────────────────────
  async register({ name, mobile, email, dob, password }) {
    // When backend is ready, replace mock with:
    // const data = await api.post("/auth/register", { name, mobile, email, dob, password });

    // ── MOCK ──────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 1200));
    if (mobile === "0000000000") throw new Error("This mobile number is already registered.");
    const data = {
      token: "mock_jwt_token_" + Date.now(),
      user: { id: 2, name, mobile, email },
    };
    // ─────────────────────────────────────────────────────────────────────

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data.user;
  },

  // ── Logout ─────────────────────────────────────────────────────────────────
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // ── Helpers ────────────────────────────────────────────────────────────────
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
      return null;
    }
  },

  isLoggedIn() {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};