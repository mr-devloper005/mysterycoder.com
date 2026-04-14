"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { SITE_CONFIG } from "@/lib/site-config";
import { Download, Mail, Newspaper, Palette, Sparkles } from "lucide-react";

const pressAssets = [
  {
    id: "brand-pack",
    title: "Mystery Coder — brand logo pack",
    description: "Full-color, reversed, and monochrome lockups plus safe-space rules for the MC mark and wordmark.",
    fileType: "ZIP",
    previewUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=675&fit=crop",
  },
  {
    id: "product-ui",
    title: "Product UI captures",
    description: "High-resolution screenshots of reader mode, dashboards, and community surfaces for reviews and features.",
    fileType: "ZIP",
    previewUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop",
  },
  {
    id: "guidelines",
    title: "Voice, tone & color",
    description: "Gradient usage (purple → blue), typography pairings, and messaging pillars: code, solve, elevate.",
    fileType: "PDF",
    previewUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=675&fit=crop",
  },
];

const coverage = [
  {
    id: "c1",
    outlet: "Dev Chronicle",
    headline: `${SITE_CONFIG.name} reframes how engineering teams surface trusted knowledge.`,
    date: "Mar 2026",
  },
  {
    id: "c2",
    outlet: "Product Craft Weekly",
    headline: "From bookmarks to publishing: one hub for technical storytelling.",
    date: "Feb 2026",
  },
  {
    id: "c3",
    outlet: "Open Source Observer",
    headline: "Community-first discovery meets business listings in a single reader experience.",
    date: "Jan 2026",
  },
];

const milestones = [
  { year: "2025", label: "Private beta with core reader and SBM modules." },
  { year: "2026", label: "Public launch of unified search across articles, listings, and media." },
  { year: "2026", label: "Expanded help center and developer documentation." },
];

export default function PressPage() {
  const { toast } = useToast();
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null);
  const activeAsset = pressAssets.find((asset) => asset.id === activeAssetId);

  return (
    <PageShell
      title="Press"
      description="Brand assets, product context, and recent coverage for journalists and partners."
      actions={
        <Button asChild variant="outline" className="border-[#4B2188]/40 bg-background hover:bg-[#4B2188]/5">
          <Link href="/contact">
            <Mail className="mr-2 h-4 w-4" aria-hidden />
            Media inbox
          </Link>
        </Button>
      }
    >
      <div className="space-y-10">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[#4B2188]/15 via-card to-[#1E4BB5]/10 p-6 shadow-sm sm:p-8">
            <div className="pointer-events-none absolute -left-10 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[#4B2188]/20 blur-3xl" />
            <div className="relative">
              <Badge className="bg-gradient-to-r from-[#4B2188] to-[#1E4BB5] text-white">For editors & producers</Badge>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Story angles that fit {SITE_CONFIG.name}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                We are building a reader-friendly home for technical content—articles, curated bookmarks, listings, and visual
                stories—so practitioners spend less time hunting tabs and more time shipping. Mention our gradient brand system
                and the MC monogram with embedded <span className="font-mono text-foreground/90">&lt;/&gt;</span> motif when
                describing the product identity.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {milestones.map((m) => (
                  <div key={m.year + m.label} className="rounded-xl border border-border/80 bg-background/60 p-3 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#4B2188]">{m.year}</p>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Card className="border-border bg-card shadow-sm">
            <CardContent className="flex h-full flex-col justify-between p-6">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                  <Newspaper className="h-5 w-5 text-[#1E4BB5]" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">Boilerplate</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {SITE_CONFIG.name} is a community platform for developers and technical teams to publish, bookmark, and
                  discover high-signal content alongside practical listings and media. {SITE_CONFIG.description}
                </p>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Tagline for pull quotes: <span className="font-medium text-foreground">Code. Solve. Elevate.</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-border bg-card shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Press kit downloads</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Preview assets before you publish.</p>
                </div>
                <Palette className="h-6 w-6 text-[#4B2188]/50" aria-hidden />
              </div>
              <div className="mt-6 grid gap-3">
                {pressAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="rounded-xl border border-border bg-secondary/30 p-4 transition-colors hover:bg-secondary/45"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{asset.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{asset.description}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{asset.fileType}</Badge>
                        <Button size="sm" variant="outline" onClick={() => setActiveAssetId(asset.id)}>
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-[#4B2188] to-[#1E4BB5] text-white hover:opacity-95"
                          onClick={() =>
                            toast({
                              title: "Download started",
                              description: `${asset.title} is downloading.`,
                            })
                          }
                        >
                          <Download className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Recent coverage</h2>
            {coverage.map((item) => (
              <Card
                key={item.id}
                className="border-border bg-card transition-all hover:-translate-y-0.5 hover:border-[#4B2188]/25 hover:shadow-md"
              >
                <CardContent className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-[#4B2188]">{item.outlet}</div>
                  <p className="mt-2 text-sm font-medium leading-snug text-foreground">{item.headline}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{item.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-border bg-secondary/20 py-6 text-center">
          <Sparkles className="h-5 w-5 text-[#1E4BB5]" aria-hidden />
          <p className="text-sm text-muted-foreground">
            Need a quote, executive bio, or custom render?{" "}
            <Link href="/contact" className="font-semibold text-foreground underline-offset-4 hover:underline">
              Contact the press desk
            </Link>
            .
          </p>
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          )}
          <p className="text-sm text-muted-foreground">{activeAsset?.description}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className="bg-gradient-to-r from-[#4B2188] to-[#1E4BB5] text-white hover:opacity-95"
              onClick={() =>
                toast({
                  title: "Download started",
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
