const AUTH_KEY = "sanchar_sarthi_auth";

export const auth = {
  isLoggedIn() {
    return !!localStorage.getItem(AUTH_KEY);
  },

  getUser() {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  async login({ userId, password }) {
    await new Promise((r) => setTimeout(r, 600)); // simulate network
    // TODO: replace with -> const { data } = await api.post('/auth/login', { userId, password });

    if (!userId || !password) {
      throw new Error("User ID and password are required.");
    }

    // Mock: any non-empty credentials succeed
    const user = {
      userId,
      name: userId.includes("@") ? userId.split("@")[0] : "Traveller",
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  },

  async register({ name, mobile, email, dob, password }) {
    await new Promise((r) => setTimeout(r, 600));
    // TODO: replace with -> const { data } = await api.post('/auth/register', { name, mobile, email, dob, password });

    if (!name || !mobile || !email || !dob || !password) {
      throw new Error("All fields are required.");
    }

    const user = { name, mobile, email, dob };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
  },
};