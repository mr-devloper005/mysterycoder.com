import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  BookOpen,
  Bookmark,
  Building2,
  FileText,
  Image as ImageIcon,
  LayoutGrid,
  LifeBuoy,
  Search,
  Shield,
  Sparkles,
} from "lucide-react";

const quickLinks = [
  { href: "/register", label: "Create an account", hint: "Join the community" },
  { href: "/articles", label: "Browse articles", hint: "Long-form knowledge" },
  { href: "/community", label: "Community hub", hint: "Groups & discussions" },
  { href: "/status", label: "System status", hint: "Uptime & incidents" },
];

const guides = [
  {
    icon: Bookmark,
    title: "Bookmarks & collections",
    description:
      "Save links you care about, organize them into themed collections, and share curated sets with teammates or the public.",
  },
  {
    icon: LayoutGrid,
    title: "Social bookmarks (SBM)",
    description:
      "Submit links with context, tags, and summaries so others can discover high-signal resources faster than raw search.",
  },
  {
    icon: Building2,
    title: "Listings & local discovery",
    description:
      "Create or update business listings with photos, hours, and contact details so nearby readers can find you.",
  },
  {
    icon: FileText,
    title: "Articles & publishing",
    description:
      "Draft in sections, add cover imagery, and publish when you are ready. Edit history helps you iterate safely.",
  },
  {
    icon: ImageIcon,
    title: "Image sharing",
    description:
      "Upload albums or single shots with captions. Respect copyright—only share media you have rights to distribute.",
  },
  {
    icon: Shield,
    title: "Account security",
    description:
      "Use a unique password, sign out on shared devices, and review connected sessions periodically in settings.",
  },
];

const faqs = [
  {
    id: "faq-account",
    question: "How do I reset my password?",
    answer:
      "Open the sign-in page and choose “Forgot password.” We will email a secure link. If messages do not arrive, check spam filters and confirm you are using the same address you registered with.",
  },
  {
    id: "faq-content",
    question: "Can I make my profile or collections private?",
    answer:
      "Many modules support visibility controls. When creating or editing an item, look for audience or visibility settings. If a feature is public-only, that will be labeled in the editor.",
  },
  {
    id: "faq-billing",
    question: "Where do I manage subscriptions or receipts?",
    answer:
      "Head to your account settings and open the billing section when available. For policy questions, see our Payment Policy and contact support with your transaction reference.",
  },
  {
    id: "faq-report",
    question: "How do I report abuse or spam?",
    answer:
      "Use the report controls on the content or profile in question, or email support with links and screenshots. We review credible reports and may remove content or restrict accounts that break our rules.",
  },
  {
    id: "faq-api",
    question: "Is there an API for developers?",
    answer:
      "Developer surfaces may vary by deployment. Visit the Developers section of the site for current endpoints, scopes, and authentication requirements.",
  },
  {
    id: "faq-data",
    question: "How can I export or delete my data?",
    answer:
      "Privacy choices—including export or deletion where supported—are described in our Privacy Policy. Start from account settings or contact us for manual assistance on complex requests.",
  },
];

export default function HelpPage() {
  return (
    <PageShell
      title="Help Center"
      description={`Guides, shortcuts, and answers for getting the most out of ${SITE_CONFIG.name}.`}
      actions={
        <Button asChild className="bg-gradient-to-r from-[#4B2188] to-[#1E4BB5] text-white hover:opacity-95">
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <div className="space-y-12">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-gradient-to-br from-[#4B2188]/20 to-[#1E4BB5]/15 blur-2xl" />
            <div className="relative flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4B2188]/20 to-[#1E4BB5]/15 text-[#4B2188]">
                <LifeBuoy className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Start here</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Whether you are publishing your first article, curating bookmarks, or listing a business, these paths get you
                  moving without digging through menus.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="font-mono text-[11px]">
                    &lt; docs /&gt;
                  </Badge>
                  <Badge className="bg-gradient-to-r from-[#4B2188] to-[#1E4BB5] text-white">Always improving</Badge>
                </div>
              </div>
            </div>
          </div>
          <Card className="border-border bg-gradient-to-b from-secondary/50 to-card shadow-sm">
            <CardContent className="space-y-3 p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Search className="h-4 w-4 text-[#4B2188]" aria-hidden />
                Popular destinations
              </div>
              <ul className="space-y-2">
                {quickLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between rounded-lg border border-transparent px-3 py-2 text-sm transition-colors hover:border-border hover:bg-background"
                    >
                      <span>
                        <span className="font-medium text-foreground group-hover:text-[#4B2188]">{item.label}</span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">{item.hint}</span>
                      </span>
                      <Sparkles className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">Topic guides</h2>
              <p className="mt-1 text-sm text-muted-foreground">Deep dives into the main workflows on the platform.</p>
            </div>
            <BookOpen className="hidden h-8 w-8 text-[#1E4BB5]/40 sm:block" aria-hidden />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {guides.map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="border-border/80 bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#4B2188]/25 hover:shadow-md"
              >
                <CardContent className="flex gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4B2188]/12 to-[#1E4BB5]/12 text-[#4B2188]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="border-border bg-card shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Frequently asked questions</h2>
            <p className="mt-2 text-sm text-muted-foreground">Straight answers to common support themes.</p>
            <Accordion type="single" collapsible className="mt-6 w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-border/80">
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="rounded-2xl border border-dashed border-[#4B2188]/30 bg-gradient-to-r from-[#4B2188]/5 to-[#1E4BB5]/5 p-8 text-center">
          <p className="text-sm font-medium text-foreground">Still stuck?</p>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            Tell us what you were trying to do, what happened instead, and any links or screenshots. We typically respond
            faster when requests include those details.
          </p>
          <Button asChild className="mt-5 bg-gradient-to-r from-[#4B2188] to-[#1E4BB5] text-white hover:opacity-95">
            <Link href="/contact">Open a support thread</Link>
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
