import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";

const values = [
  {
    title: "Reading-first experience",
    description:
      "We prioritize clarity, pacing, and structure so people can read, browse, and discover without noise.",
  },
  {
    title: "Connected content surfaces",
    description:
      "Articles, visual posts, listings, resources, and profiles stay connected so discovery feels natural across the site.",
  },
  {
    title: "Simple and trustworthy",
    description:
      "We focus on clean navigation and clear page structure to help visitors find useful content faster.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a reading-first platform for articles, visual posts, and connected content discovery.`}
      actions={
        <>
          <Button asChild>
            {/* <Link href="/contact">Contact Us</Link> */}
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Our Story</Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              A calmer, clearer way to explore content.
            </h2>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.name} is built to make long-form reading, visual discovery, and supporting resources feel
              like one unified experience. Instead of splitting everything into disconnected pages, the platform keeps
              related content easy to move through and easy to understand.
            </p>
            <p className="text-sm text-muted-foreground">
              Whether someone starts with an article, listing, image post, or resource page, they can continue
              exploring without losing context.
            </p>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
