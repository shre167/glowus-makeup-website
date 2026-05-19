import { createClient } from "@supabase/supabase-js";

// Read environment variables supporting both Client-side Vite and Server-side Node SSR
const getEnv = (key: string): string | undefined => {
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key];
  }
  return undefined;
};

const supabaseUrl = 
  getEnv("VITE_SUPABASE_URL") || 
  getEnv("NEXT_PUBLIC_SUPABASE_URL");

const supabaseAnonKey = 
  getEnv("VITE_SUPABASE_ANON_KEY") || 
  getEnv("VITE_SUPABASE_PUBLISHABLE_KEY") ||
  getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") || 
  getEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");

// Check if credentials exist and are not placeholders
const isConfigured = !!supabaseUrl && !!supabaseAnonKey && supabaseUrl !== "PLACEHOLDER";

// Type definitions matching Supabase Auth return shapes
export interface MockUser {
  id: string;
  email: string;
  user_metadata: {
    first_name?: string;
    last_name?: string;
    [key: string]: any;
  };
}

export interface MockSession {
  access_token: string;
  user: MockUser;
  expires_at: number;
}

// -------------------------------------------------------------
// HIGH-FIDELITY MOCK SUPABASE CLIENT
// -------------------------------------------------------------
class MockAuthClient {
  private listeners: Array<(event: string, session: MockSession | null) => void> = [];

  constructor() {
    // Listen for storage events across tabs if needed
    if (typeof window !== "undefined") {
      window.addEventListener("storage", (e) => {
        if (e.key === "mock_session") {
          const session = this.getStoredSession();
          this.triggerListeners(session ? "SIGNED_IN" : "SIGNED_OUT", session);
        }
      });
    }
  }

  private triggerListeners(event: string, session: MockSession | null) {
    this.listeners.forEach((cb) => {
      try {
        cb(event, session);
      } catch (err) {
        console.error("Error in auth state change listener:", err);
      }
    });
  }

  private getStoredSession(): MockSession | null {
    if (typeof window === "undefined") return null;
    const sessionStr = localStorage.getItem("mock_session");
    if (!sessionStr) return null;
    try {
      return JSON.parse(sessionStr);
    } catch {
      return null;
    }
  }

  private getStoredUsers(): MockUser[] {
    if (typeof window === "undefined") return [];
    const usersStr = localStorage.getItem("mock_users");
    if (!usersStr) return [];
    try {
      return JSON.parse(usersStr);
    } catch {
      return [];
    }
  }

  async signUp({
    email,
    password,
    options,
  }: {
    email: string;
    password?: string;
    options?: { data?: Record<string, any> };
  }) {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network latency

    if (!email || !password) {
      return { data: { user: null, session: null }, error: new Error("Email and password are required") };
    }

    const users = this.getStoredUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { data: { user: null, session: null }, error: new Error("User already exists with this email") };
    }

    const newUser: MockUser = {
      id: Math.random().toString(36).substring(2, 15),
      email: email.toLowerCase(),
      user_metadata: options?.data || {},
    };

    users.push(newUser);
    localStorage.setItem("mock_users", JSON.stringify(users));

    const session: MockSession = {
      access_token: "mock_jwt_token_" + Math.random().toString(36).substring(7),
      user: newUser,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
    };

    localStorage.setItem("mock_session", JSON.stringify(session));
    this.triggerListeners("SIGNED_IN", session);

    return { data: { user: newUser, session }, error: null };
  }

  async signInWithPassword({ email, password }: { email: string; password?: string }) {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network latency

    if (!email || !password) {
      return { data: { user: null, session: null }, error: new Error("Email and password are required") };
    }

    const users = this.getStoredUsers();
    const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!foundUser) {
      // Create a default mock user if none exists, to facilitate easier direct testing!
      const defaultUser: MockUser = {
        id: "mock-user-id",
        email: email.toLowerCase(),
        user_metadata: { first_name: "Glowus", last_name: "Shopper" },
      };
      users.push(defaultUser);
      localStorage.setItem("mock_users", JSON.stringify(users));
      
      const session: MockSession = {
        access_token: "mock_jwt_token_" + Math.random().toString(36).substring(7),
        user: defaultUser,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
      };
      localStorage.setItem("mock_session", JSON.stringify(session));
      this.triggerListeners("SIGNED_IN", session);
      return { data: { user: defaultUser, session }, error: null };
    }

    const session: MockSession = {
      access_token: "mock_jwt_token_" + Math.random().toString(36).substring(7),
      user: foundUser,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
    };

    localStorage.setItem("mock_session", JSON.stringify(session));
    this.triggerListeners("SIGNED_IN", session);

    return { data: { user: foundUser, session }, error: null };
  }

  async signInWithOAuth({ provider, options }: { provider: string; options?: { redirectTo?: string; queryParams?: { preferredEmail?: string } } }) {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate delay
    
    let mockEmail = options?.queryParams?.preferredEmail;
    
    // If no email was pre-filled, prompt the user for their Google/Apple social email
    if (!mockEmail && typeof window !== "undefined") {
      const inputEmail = window.prompt(
        `Enter your simulated ${provider.charAt(0).toUpperCase() + provider.slice(1)} account email for social sign-in:`,
        `${provider}.user@gmail.com`
      );
      if (inputEmail === null) {
        // User cancelled the prompt
        return { data: { provider, url: "" }, error: new Error("Authentication cancelled by user") };
      }
      if (inputEmail.trim()) {
        mockEmail = inputEmail.trim();
      }
    }
    
    if (!mockEmail) {
      mockEmail = `${provider}.user@gmail.com`;
    }
    
    // Parse name beautifully from the email (e.g. shreya.sharma@gmail.com -> Shreya Sharma)
    const emailParts = mockEmail.split("@")[0] || provider;
    const cleanName = emailParts
      .split(/[\._\-]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    const defaultUser: MockUser = {
      id: `mock-${provider}-${Math.random().toString(36).substring(2, 10)}`,
      email: mockEmail.toLowerCase(),
      user_metadata: { 
        first_name: cleanName, 
        last_name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User` 
      },
    };
    
    const users = this.getStoredUsers();
    const existing = users.find(u => u.email.toLowerCase() === mockEmail!.toLowerCase());
    const finalUser = existing || defaultUser;
    
    if (!existing) {
      users.push(defaultUser);
      localStorage.setItem("mock_users", JSON.stringify(users));
    }
    
    const session: MockSession = {
      access_token: `mock_oauth_jwt_${provider}_` + Math.random().toString(36).substring(7),
      user: finalUser,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
    };
    
    localStorage.setItem("mock_session", JSON.stringify(session));
    this.triggerListeners("SIGNED_IN", session);
    
    return { data: { provider, url: options?.redirectTo || window.location.origin }, error: null };
  }

  async signOut() {
    await new Promise((resolve) => setTimeout(resolve, 400));
    localStorage.removeItem("mock_session");
    this.triggerListeners("SIGNED_OUT", null);
    return { error: null };
  }

  async getSession() {
    return { data: { session: this.getStoredSession() }, error: null };
  }

  async getUser() {
    const session = this.getStoredSession();
    return { data: { user: session ? session.user : null }, error: null };
  }

  onAuthStateChange(callback: (event: string, session: MockSession | null) => void) {
    this.listeners.push(callback);
    
    // Call listener immediately with current state
    const currentSession = this.getStoredSession();
    setTimeout(() => {
      callback(currentSession ? "INITIAL_SESSION" : "SIGNED_OUT", currentSession);
    }, 0);

    return {
      data: {
        subscription: {
          unsubscribe: () => {
            this.listeners = this.listeners.filter((cb) => cb !== callback);
          },
        },
      },
    };
  }
}

// Instantiate fallback simulator or real Supabase client
export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (new (class {
      auth = new MockAuthClient();
    })() as any);

console.log(
  isConfigured
    ? "[Supabase] Connected to live backend at " + supabaseUrl
    : "[Supabase] Operating in local high-fidelity mock simulator mode."
);
