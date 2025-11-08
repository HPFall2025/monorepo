import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Building2, ListChecks } from "lucide-react";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type RegisterResponse = {
  accountId: string;
  onboardingChecklist: string[];
  payload: RegisterPayload;
};

function RegisterPage() {
  const [formData, setFormData] = useState<RegisterPayload>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const formIsValid = useMemo(
    () =>
      formData.firstName.length > 1 &&
      formData.lastName.length > 1 &&
      formData.email.includes("@") &&
      formData.password.length >= 8,
    [formData],
  );

  const { mutate, data, isPending } = useMutation<
    RegisterResponse,
    Error,
    RegisterPayload
  >({
    mutationFn: async (payload: RegisterPayload) => {
      await new Promise((resolve) => setTimeout(resolve, 1100));
      const accountId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `demo-${Date.now()}`;
      return {
        accountId,
        onboardingChecklist: ["Connect Knot TransactionLink", "Review reimbursements", "Explore insights"],
        payload,
      };
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/50 px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-3xl border bg-card/80 p-10 shadow-xl backdrop-blur">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Create your account
          </p>
          <h1 className="text-4xl font-semibold">Register in under two minutes</h1>
          <p className="text-sm text-muted-foreground">
            We integrate with Knot’s TransactionLink API, but operate as a standalone intelligence layer.
          </p>
        </div>

        <form
          className="mt-10 grid gap-6 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            if (!formIsValid || isPending) return;
            mutate(formData);
          }}
        >
          <label className="space-y-2 text-sm">
            <span className="font-medium">First name</span>
            <input
              type="text"
              value={formData.firstName}
              onChange={(event) => setFormData((state) => ({ ...state, firstName: event.target.value }))}
              placeholder="Jordan"
              className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none"
              required
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium">Last name</span>
            <input
              type="text"
              value={formData.lastName}
              onChange={(event) => setFormData((state) => ({ ...state, lastName: event.target.value }))}
              placeholder="Vega"
              className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none"
              required
            />
          </label>
          <label className="space-y-2 text-sm md:col-span-2">
            <span className="font-medium">Work email</span>
            <input
              type="email"
              value={formData.email}
              onChange={(event) => setFormData((state) => ({ ...state, email: event.target.value }))}
              placeholder="you@carrier.com"
              className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none"
              required
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium">Create password</span>
            <input
              type="password"
              value={formData.password}
              onChange={(event) => setFormData((state) => ({ ...state, password: event.target.value }))}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none"
              minLength={8}
              required
            />
          </label>

          <Button
            type="submit"
            size="lg"
            className="md:col-span-2"
            disabled={!formIsValid || isPending}
          >
            {isPending ? "Creating account..." : "Create account"}
          </Button>
        </form>

        {data && (
          <div className="mt-8 grid gap-4 rounded-3xl border border-border/80 bg-background/70 p-6 md:grid-cols-2">
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-base font-semibold">
                <Building2 className="size-5 text-primary" />
                Account ready
              </p>
              <p className="text-muted-foreground">
                ID: <span className="font-mono text-foreground">{data.accountId}</span>
              </p>
              <p className="text-muted-foreground">
                Owner: {data.payload.firstName} {data.payload.lastName}
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-base font-semibold">
                <ListChecks className="size-5 text-primary" />
                Next steps
              </p>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                {data.onboardingChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/sign-in" className="font-semibold text-primary hover:underline">
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
