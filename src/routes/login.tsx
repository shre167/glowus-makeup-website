import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { useAuth } from "@/store/auth";
import { Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Glowus Beauty" }] }),
  component: Login,
});

function Login() {
  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("remembered_email") || "";
    }
    return "";
  });
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("remembered_email") ? true : false;
    }
    return false;
  });
  const { signIn, loading, signInWithGoogle, signInWithApple } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    
    const { success } = await signIn(email, password);
    if (success) {
      if (rememberMe) {
        localStorage.setItem("remembered_email", email.trim());
      } else {
        localStorage.removeItem("remembered_email");
      }
      navigate({ to: "/" });
    }
  };

  return (
    <Layout>
      <AuthShell title={<>Welcome <span className="italic">back</span></>} subtitle="Sign in to continue your beauty ritual.">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field
            label="Email"
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Field
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-muted-foreground cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-border text-[#2A5EE1] focus:ring-[#2A5EE1] cursor-pointer" 
              /> Remember me
            </label>
            <Link to="/login" className="underline-offset-4 hover:underline text-[#2A5EE1] font-semibold">Forgot password?</Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#2A5EE1] py-4 text-xs font-bold uppercase tracking-[0.25em] text-white flex items-center justify-center gap-2 hover:bg-[#1E40AF] disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : null}
            Sign in
          </button>
        </form>
        <Divider />
        <SocialButtons onGoogle={() => signInWithGoogle(email)} onApple={() => signInWithApple(email)} />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          New here? <Link to="/signup" className="text-[#2A5EE1] font-bold underline-offset-4 hover:underline">Create an account</Link>
        </p>
      </AuthShell>
    </Layout>
  );
}

export function AuthShell({ title, subtitle, children }: { title: React.ReactNode; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="grid min-h-[calc(100vh-80px)] md:grid-cols-2">
      <div className="hidden md:block relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop"
          alt="Glowus cosmetics"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2A5EE1]/10 mix-blend-multiply" />
      </div>
      <div className="flex items-center justify-center px-6 py-16 md:px-12 bg-white dark:bg-[#0B0F19]">
        <div className="w-full max-w-sm">
          <p className="text-[10px] uppercase font-black tracking-[0.3em] text-[#2A5EE1]">Glowus Beauty</p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl text-foreground font-bold tracking-tight">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Field({ label, ...p }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = p.type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : p.type;

  return (
    <label className="block relative select-none">
      <span className="text-[10px] uppercase font-bold tracking-[0.22em] text-muted-foreground">{label}</span>
      <div className="relative mt-2">
        <input 
          {...p} 
          type={inputType}
          className="w-full rounded-xl border border-border bg-background pl-4 pr-10 py-3.5 text-sm outline-none focus:border-[#2A5EE1] focus:ring-1 focus:ring-[#2A5EE1] transition" 
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
    </label>
  );
}

export function Divider() {
  return (
    <div className="my-6 flex items-center gap-4">
      <span className="h-px flex-1 bg-border" />
      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium">or</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export function SocialButtons({ onGoogle, onApple }: { onGoogle?: () => void; onApple?: () => void }) {
  return (
    <div className="grid gap-3">
      <button
        onClick={onGoogle}
        type="button"
        className="flex items-center justify-center gap-3 rounded-full border border-border bg-background py-3 text-xs uppercase tracking-[0.2em] font-bold text-foreground/80 hover:bg-muted/30 transition cursor-pointer"
      >
        <GoogleIcon /> Continue with Google
      </button>
      <button
        onClick={onApple}
        type="button"
        className="flex items-center justify-center gap-3 rounded-full border border-border bg-background py-3 text-xs uppercase tracking-[0.2em] font-bold text-foreground/80 hover:bg-muted/30 transition cursor-pointer"
      >
        <AppleIcon /> Continue with Apple
      </button>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h5.9c-.3 1.4-1 2.5-2.2 3.3v2.7h3.6c2.1-1.9 3.2-4.8 3.2-8.2z"/><path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.6-2.7c-1 .7-2.3 1.1-3.6 1.1-2.8 0-5.1-1.9-6-4.4H2.3v2.8C4.1 20.7 7.8 23 12 23z"/><path fill="#FBBC05" d="M6 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4V6.8H2.3C1.5 8.4 1 10.1 1 12s.5 3.6 1.3 5.2L6 14.4z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.4 2 14.9 1 12 1 7.8 1 4.1 3.3 2.3 6.8L6 9.6c.9-2.5 3.2-4.4 6-4.2z"/></svg>
  );
}
function AppleIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.9-.8-3.1-.8c-1.6 0-3 .9-3.8 2.4-1.6 2.8-.4 6.9 1.2 9.2.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3.1-.7s1.8.7 3.1.7c1.3 0 2.1-1.1 2.9-2.2.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.7-3.9zM14 4.9c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2-.5 2.7-1.3z"/></svg>;
}
