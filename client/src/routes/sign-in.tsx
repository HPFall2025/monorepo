import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/sign-in")({
  component: SignInPage,
});

type SignInPayload = {
  email: string;
  password: string;
};

type SignInResponse = {
  nextStep: string;
  email: string;
  reimbursementsReady: number;
};

function SignInPage() {
  const [formData, setFormData] = useState<SignInPayload>({
    email: "",
    password: "",
  });

  const formIsValid = useMemo(
    () => formData.email.includes("@") && formData.password.length >= 8,
    [formData.email, formData.password],
  );

  const { mutate, isPending, data, error } = useMutation<
    SignInResponse,
    Error,
    SignInPayload
  >({
    mutationFn: async (payload: SignInPayload) => {
      await new Promise((resolve) => setTimeout(resolve, 900));
      return {
        nextStep: "dashboard",
        email: payload.email,
        reimbursementsReady: 3,
      };
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/40 px-6 py-12">
      <div className="mx-auto max-w-xl rounded-3xl border bg-card/70 p-10 shadow-lg backdrop-blur">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          ← Back to overview
        </Link>
        <div className="mt-6 flex flex-col gap-3 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="size-7" />
          </div>
          <h1 className="text-3xl font-semibold">Welcome back to PulseSpend</h1>
          <p className="text-sm text-muted-foreground">
            Pick up where you left off — our platform ingests data via Knot, but insights stay uniquely ours.
          </p>
        </div>

        <form
          className="mt-10 flex flex-col gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            if (!formIsValid || isPending) return;
            mutate(formData);
          }}
        >
          <label className="space-y-2 text-sm">
            <span className="font-medium">Work email</span>
            <input
              type="email"
              value={formData.email}
              onChange={(event) => setFormData((state) => ({ ...state, email: event.target.value }))}
              placeholder="you@benefits.co"
              className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none"
              required
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="flex items-center justify-between font-medium">
              Password
              <button
                type="button"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Forgot?
              </button>
            </span>
            <input
              type="password"
              value={formData.password}
              onChange={(event) =>
                setFormData((state) => ({ ...state, password: event.target.value }))
              }
              placeholder="••••••••"
              className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none"
              minLength={8}
              required
            />
          </label>

          <Button
            type="submit"
            size="lg"
            disabled={!formIsValid || isPending}
            className="w-full"
          >
            {isPending ? "Authenticating..." : "Access dashboard"}
          </Button>
        </form>

        <div className="mt-6 space-y-2 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6 text-sm">
          <p className="font-semibold text-primary">What happens next?</p>
          <p className="text-muted-foreground">
            We’ll refresh the latest records from Knot’s TransactionLink API and calculate pending reimbursements,
            trends, and procedure recommendations tied to your book of members.
          </p>
        </div>

        {error && (
          <p className="mt-4 text-sm text-destructive">
            Something went wrong. Please try again in a few moments.
          </p>
        )}
        {data && (
          <div className="mt-4 rounded-2xl border border-border/80 bg-background/60 p-4 text-sm text-muted-foreground">
            Logged in as <span className="font-semibold text-foreground">{data.email}</span>.{" "}
            {data.reimbursementsReady} reimbursements are ready for review.
          </div>
        )}

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Need an account?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Create one in minutes
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignInPage;
