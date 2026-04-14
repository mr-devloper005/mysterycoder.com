import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";
import { ArrowRight, Cpu, Globe2, HeartHandshake, LineChart, Users } from "lucide-react";

const roles = [
  {
    title: "Staff Product Designer",
    location: "Remote (US / EU overlap)",
    type: "Full-time",
    level: "Senior",
    focus: "Reader experience, design systems, and accessibility across light/dark surfaces.",
  },
  {
    title: "Senior Frontend Engineer",
    location: "Hybrid — New York",
    type: "Full-time",
    level: "Senior",
    focus: "Next.js, performance budgets, and polished UI for high-traffic content pages.",
  },
  {
    title: "Developer Relations Lead",
    location: "Remote",
    type: "Full-time",
    level: "Staff",
    focus: "Docs, sample apps, and community programs that meet developers where they are.",
  },
  {
    title: "Trust & Safety Specialist",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    focus: "Policy operations, user reports, and scaling humane moderation workflows.",
  },
];

const values = [
  {
    icon: Cpu,
    title: "Craft over noise",
    body: "We ship incremental improvements with measurable impact—not vanity refactors.",
  },
  {
    icon: Users,
    title: "Community in the loop",
    body: "Product decisions are informed by real reader and creator feedback.",
  },
  {
    icon: LineChart,
    title: "Transparent progress",
    body: "Roadmaps change; we communicate why, especially when we deprioritize a bet.",
  },
  {
    icon: Globe2,
    title: "Remote-friendly",
    body: "Async-first rituals with intentional synchronous time for alignment.",
  },
];

const process = [
  { step: "01", title: "Intro call", detail: "Role scope, team shape, and mutual expectations." },
  { step: "02", title: "Skills conversation", detail: "Deep dive with your future peers—no live whiteboard trivia." },
  { step: "03", title: "Take-home or pair", detail: "Choose a focused exercise or a collaborative session." },
  { step: "04", title: "Offer", detail: "Competitive package, equity where applicable, and clear start plan." },
];

const benefits = [
  "Medical, dental, and vision for employees and dependents (country-specific plans).",
  "Learning budget for conferences, books, and certifications.",
  "Home office stipend and ergonomic assessments.",
  "Flexible PTO with minimum encouraged time away.",
  "Parental leave and caregiver support policies.",
];

export default function CareersPage() {
  return (
    <PageShell
      title="Careers"
      description={`Build the platform where developers ${SITE_CONFIG.tagline.toLowerCase()}`}
      actions={
        <Button asChild className="bg-gradient-to-r from-[#4B2188] to-[#1E4BB5] text-white hover:opacity-95">
          <Link href="/contact">Talk with talent</Link>
        </Button>
      }
    >
      <div className="space-y-12">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-[#4B2188]/12 via-card to-[#1E4BB5]/10 p-6 shadow-sm sm:p-8">
          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 translate-x-1/4 -translate-y-1/4 rounded-full bg-[#1E4BB5]/25 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <Badge variant="outline" className="border-[#4B2188]/40 font-mono text-[11px]">
                {`{ hiring; }`}
              </Badge>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Help millions of builders find signal, faster
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {SITE_CONFIG.name} blends publishing, discovery, and community tools. We are a small, senior-heavy team looking
                for people who care about typography, latency, and inclusive defaults as much as new features.
              </p>
            </div>
            <Card className="border-border/80 bg-background/70 backdrop-blur-sm">
              <CardContent className="flex items-start gap-3 p-5">
                <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-[#4B2188]" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-foreground">Inclusive by default</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    We welcome applicants from non-traditional paths. If you are unsure whether to apply, send a short note—we
                    would rather read it than miss you.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">How we work</h2>
          <p className="mt-1 text-sm text-muted-foreground">Principles that show up in reviews, roadmaps, and on-call.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="border-border bg-card shadow-sm">
                <CardContent className="flex gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4B2188]/12 to-[#1E4BB5]/12 text-[#4B2188]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Open roles</h2>
            {roles.map((role) => (
              <Card
                key={role.title}
                className="border-border bg-card transition-all hover:-translate-y-0.5 hover:border-[#4B2188]/30 hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-gradient-to-r from-[#4B2188] to-[#1E4BB5] text-white">{role.level}</Badge>
                    <Badge variant="secondary">{role.type}</Badge>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{role.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{role.location}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{role.focus}</p>
                  <Button variant="outline" className="mt-4 border-[#4B2188]/40 hover:bg-[#4B2188]/5" asChild>
                    <Link href="/contact">
                      Apply or ask questions
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="space-y-6">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">Interview flow</h3>
                <ol className="mt-4 space-y-4">
                  {process.map((p) => (
                    <li key={p.step} className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-[#4B2188]">
                        {p.step}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{p.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{p.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">Benefits snapshot</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {benefits.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[#4B2188] to-[#1E4BB5]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
