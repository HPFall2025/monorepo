import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  CreditCard,
  Pill,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

const featureHighlights = [
  {
    title: "Automatic HSA / FSA detection",
    description:
      "Connect to Knot’s TransactionLink API to flag reimbursable purchases instantly.",
    icon: ShieldCheck,
  },
  {
    title: "Behavioral insights",
    description:
      "Spot recurring spend, category spikes, and seasonal changes with built‑in trend logic.",
    icon: TrendingUp,
  },
  {
    title: "Procedure price lookup",
    description:
      "Surface local procedure pricing (à la MDsave) so members can plan care confidently.",
    icon: Target,
  },
];

const pillarData = [
  "Real-time reimbursement calculations (Part 1).",
  "Trend detection for members and providers (Part 2).",
  "Market-aware procedure pricing (Part 3).",
  "Business insights dashboard (Part 4).",
  "GoodRx / CostPlus drug lookups (Part 5).",
];

const insightCards = [
  {
    title: "Recurring spend radar",
    description:
      "Flag monthly auto-refills or recurring OT C orders and show if they remain eligible.",
    icon: Sparkles,
  },
  {
    title: "Regional medication activity",
    description:
      "Highlight cities with upticks in prescriptions so care managers can respond early.",
    icon: Pill,
  },
  {
    title: "Benefit utilization",
    description:
      "Aggregate contribution vs. reimbursement so carriers know what’s working.",
    icon: BarChart3,
  },
];

const workflow = [
  {
    title: "Connect accounts",
    body: "Users link their cards via Knot. We hydrate purchase details within seconds.",
  },
  {
    title: "Classify transactions",
    body: "We match merchant + SKU data against our HSA/FSA rule engine to mark eligibility.",
  },
  {
    title: "Surface insights",
    body: "Members see reimbursements owed, while businesses see anonymized spend signals.",
  },
  {
    title: "Optimize costs",
    body: "Recommend cheaper procedures and prescriptions before members spend unnecessarily.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/40">
      <div className="px-6 py-6 lg:px-10 max-w-6xl mx-auto">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              PulseSpend
            </p>
            <h1 className="text-2xl font-semibold">Independent health spend copilot</h1>
          </div>
          <nav className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Overview
            </Link>
            <Link to="/sign-in" className="hover:text-foreground transition-colors">
              Sign in
            </Link>
            <Link to="/register" className="hover:text-foreground transition-colors">
              Register
            </Link>
          </nav>
        </header>

        <main className="mt-16 space-y-16">
          <section className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 px-4 py-1 text-xs uppercase tracking-widest text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" />
              Powered by Knot TransactionLink
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Build proactive HSA/FSA experiences on top of our own platform.
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
                We’re a standalone insights layer that taps Knot’s TransactionLink API to ingest raw
                card data, classify eligibility, and surface reimbursements, local procedure pricing,
                and Rx options before members even ask.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Button size="lg" asChild>
                <Link to="/register">
                  Start for free
                  <CreditCard className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/sign-in">
                  Sign in to my account
                  <TrendingUp className="size-4" />
                </Link>
              </Button>
            </div>
            <dl className="grid gap-6 sm:grid-cols-3">
              {[
                { label: "Eligible spend analyzed", value: "$12.4M" },
                { label: "Avg. reimbursements surfaced", value: "$460 / member" },
                { label: "Procedure markets indexed", value: "260+" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border bg-card p-6 text-left shadow-sm"
                >
                  <dt className="text-sm text-muted-foreground">{item.label}</dt>
                  <dd className="text-2xl font-semibold">{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            {featureHighlights.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border bg-card p-8 shadow-sm h-full flex flex-col gap-4"
              >
                <feature.icon className="size-10 text-primary" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </article>
            ))}
          </section>

          <section className="rounded-3xl border bg-card/60 p-10 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Product pillars
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {pillarData.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4"
                >
                  <Target className="size-5 text-primary" />
                  <p className="text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            {insightCards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border bg-background/70 p-6 shadow-inner"
              >
                <card.icon className="size-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </article>
            ))}
          </section>

          <section className="rounded-3xl border bg-card px-6 py-10 sm:px-10">
            <div className="flex flex-col gap-4 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Workflow
              </p>
              <h3 className="text-3xl font-semibold">From swipe to insight</h3>
              <p className="text-muted-foreground">
                Every step is API-first, so you can wire this flow directly into your
                hackathon demo or future production stack.
              </p>
            </div>
            <ol className="mt-10 grid gap-6 md:grid-cols-2">
              {workflow.map((step, idx) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-border/80 p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {idx + 1}
                    </span>
                    <p className="font-semibold">{step.title}</p>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Index;
