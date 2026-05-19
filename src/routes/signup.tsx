import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { AuthShell, Field, Divider, SocialButtons } from "./login";
import { useState } from "react";
import { useAuth } from "@/store/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Glowus Beauty" }] }),
  component: Signup,
});

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, loading, signInWithGoogle, signInWithApple } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const { success } = await signUp(email, password, firstName, lastName);
    if (success) {
      navigate({ to: "/" });
    }
  };

  return (
    <Layout>
      <AuthShell title={<>Begin your <span className="italic">ritual</span></>} subtitle="Create a Glowus account for early access, rewards, and free shipments.">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Glowus"
              required
            />
            <Field
              label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Shopper"
              required
            />
          </div>
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
          <p className="text-[10px] text-muted-foreground leading-normal">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#2A5EE1] py-4 text-xs font-bold uppercase tracking-[0.25em] text-white flex items-center justify-center gap-2 hover:bg-[#1E40AF] disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : null}
            Create account
          </button>
        </form>
        <Divider />
        <SocialButtons onGoogle={() => signInWithGoogle(email)} onApple={() => signInWithApple(email)} />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Already have an account? <Link to="/login" className="text-[#2A5EE1] font-bold underline-offset-4 hover:underline">Sign in</Link>
        </p>
      </AuthShell>
    </Layout>
  );
}
