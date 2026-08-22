import { useState } from "react";
import { BrandMark } from "../components/Avatar";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { TextInput, PasswordInput } from "../components/TextInput";
import { Checkbox } from "../components/CheckboxRadioSwitch";
import { Alert } from "../components/Alert";

// Visual reference implementation of patterns/auth.md. Deliberately NOT
// rendered inside AppShell — see that pattern's Purpose for why a
// signed-out page gets its own frame rather than the dashboard shell with
// the sidebar hidden. Demo scaffolding only — see ../../README.md and
// /AGENTS.md.

export type AuthVariant = "login" | "register" | "forgot";

const COPY: Record<AuthVariant, { title: string; submit: string }> = {
  login: { title: "Sign in", submit: "Sign in" },
  register: { title: "Create your account", submit: "Create account" },
  forgot: { title: "Reset your password", submit: "Send reset link" },
};

export function Auth({
  variant,
  onNavigate,
}: {
  variant: AuthVariant;
  onNavigate: (hash: string) => void;
}) {
  const [failed, setFailed] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const { title, submit } = COPY[variant];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No real backend in this demo — a submit always "succeeds" and returns
    // to the app, unless the failure banner below is showing it off.
    if (!failed) onNavigate("");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-muted px-4">
      <div className="w-full max-w-sm">
        <Card>
          <div className="mb-2 flex flex-col items-center gap-2 text-brand-primary">
            <BrandMark className="h-8 w-8" />
          </div>
          <h1 className="mb-4 text-center text-h2 font-semibold text-text-primary">{title}</h1>

          {failed && (
            <Alert
              severity="danger"
              liveness="alert"
              className="mb-4"
              onDismiss={() => setFailed(false)}
              dismissLabel="Dismiss sign-in error"
            >
              Incorrect email or password.
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {variant === "register" && <TextInput label="Full name" autoComplete="name" required />}
            <TextInput label="Email address" type="email" autoComplete="email" required />
            {variant !== "forgot" && (
              <PasswordInput
                label="Password"
                autoComplete={variant === "register" ? "new-password" : "current-password"}
                required
              />
            )}

            {variant === "login" && (
              <div className="flex items-center justify-between">
                <Checkbox label="Remember me" />
                <a href="#auth/forgot" onClick={(e) => (e.preventDefault(), onNavigate("#auth/forgot"))} className="text-sm font-medium text-text-accent-primary hover:underline">
                  Forgot your password?
                </a>
              </div>
            )}

            {variant === "register" && (
              <Checkbox
                label="I agree to the Terms of Service"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
              />
            )}

            <Button type="submit" className="w-full justify-center" disabled={variant === "register" && !agreed}>
              {submit}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-text-secondary">
            {variant === "login" && (
              <>
                Don&rsquo;t have an account?{" "}
                <a href="#auth/register" onClick={(e) => (e.preventDefault(), onNavigate("#auth/register"))} className="font-medium text-text-accent-primary hover:underline">
                  Register
                </a>
              </>
            )}
            {variant === "register" && (
              <>
                Already have an account?{" "}
                <a href="#auth" onClick={(e) => (e.preventDefault(), onNavigate("#auth"))} className="font-medium text-text-accent-primary hover:underline">
                  Sign in
                </a>
              </>
            )}
            {variant === "forgot" && (
              <a href="#auth" onClick={(e) => (e.preventDefault(), onNavigate("#auth"))} className="font-medium text-text-accent-primary hover:underline">
                Back to sign in
              </a>
            )}
          </p>
        </Card>

        {variant === "login" && (
          <p className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setFailed((f) => !f)}
              className="text-xs text-text-secondary underline"
            >
              {failed ? "Clear the error banner" : "Simulate a sign-in failure"}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
