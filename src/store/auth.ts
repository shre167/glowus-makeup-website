import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  [key: string]: any;
}

interface AuthState {
  user: UserProfile | null;
  session: any | null;
  loading: boolean;
  initialized: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ success: boolean; error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  signOut: () => Promise<void>;
  signInWithGoogle: (email?: string) => Promise<void>;
  signInWithApple: (email?: string) => Promise<void>;
  initialize: () => () => void; // Returns unsubscribe function
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: false,
  initialized: false,

  signUp: async (email, password, firstName, lastName) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        toast.error(error.message || "Registration failed");
        return { success: false, error: error.message };
      }

      // Supabase sometimes requires email verification. In our high-fidelity mock, it signs in instantly.
      // Let's notify user accordingly.
      const isVerificationRequired = data.session === null && data.user !== null;
      if (isVerificationRequired) {
        toast.success("Account created! Please check your email inbox to verify your account.");
      } else {
        toast.success(`Welcome to Glowus, ${firstName}! ✨`);
      }

      return { success: true, error: null };
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred during signup");
      return { success: false, error: err.message };
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (email, password) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Sign in failed");
        return { success: false, error: error.message };
      }

      const name = data.user?.user_metadata?.first_name || "Beauty Lover";
      toast.success(`Welcome back, ${name}! 💄`);
      return { success: true, error: null };
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred during signin");
      return { success: false, error: err.message };
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    set({ loading: true });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message || "Error logging out");
      } else {
        toast.success("Successfully logged out. Come back soon! 👋");
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred during signout");
    } finally {
      set({ user: null, session: null, loading: false });
    }
  },

  signInWithGoogle: async (email?: string) => {
    set({ loading: true });
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
          queryParams: email ? { preferredEmail: email } : undefined,
        } as any,
      });
      if (error) {
        toast.error(error.message || "Failed to initiate Google sign in");
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred during Google sign in");
    } finally {
      set({ loading: false });
    }
  },

  signInWithApple: async (email?: string) => {
    set({ loading: true });
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: {
          redirectTo: window.location.origin,
          queryParams: email ? { preferredEmail: email } : undefined,
        } as any,
      });
      if (error) {
        toast.error(error.message || "Failed to initiate Apple sign in");
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred during Apple sign in");
    } finally {
      set({ loading: false });
    }
  },

  initialize: () => {
    if (get().initialized) {
      // Return a no-op unsubscribe if already initialized
      return () => {};
    }

    set({ loading: true });

    // Read initial session
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      if (session) {
        const u = session.user;
        set({
          session,
          user: {
            id: u.id,
            email: u.email || "",
            first_name: u.user_metadata?.first_name,
            last_name: u.user_metadata?.last_name,
          },
          loading: false,
          initialized: true,
        });
      } else {
        set({ loading: false, initialized: true });
      }
    });

    // Subscribe to auth state updates
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, session: any) => {
      if (session) {
        const u = session.user;
        set({
          session,
          user: {
            id: u.id,
            email: u.email || "",
            first_name: u.user_metadata?.first_name,
            last_name: u.user_metadata?.last_name,
          },
          initialized: true,
        });
      } else {
        set({
          session: null,
          user: null,
          initialized: true,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  },
}));
