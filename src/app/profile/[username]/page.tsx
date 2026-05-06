import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { Button } from "@/components/ui/button";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { ProfileDetailTabs } from "@/components/tasks/profile-detail-tabs";
import { ChevronRight, ExternalLink, Star } from "lucide-react";

export const revalidate = 3;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

const formatRichHtml = (raw?: string | null, fallback = "Profile details will appear here once available.") => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source);
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, " ").trim())}</p>`)
    .join("");
};

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }
  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />

        <section className="relative overflow-hidden rounded-[2.4rem] border border-border/60 bg-slate-950 text-white shadow-[0_28px_80px_rgba(15,23,42,0.25)]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),rgba(0,0,0,0.75)_60%)]" />
            <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:40px_40px]" />
            {logoUrl ? (
              <div className="absolute inset-0 opacity-35">
                <ContentImage src={logoUrl} alt="" fill className="object-cover blur-[2px]" />
              </div>
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/70 to-slate-950" />
          </div>

          <div className="relative px-6 pb-9 pt-7 sm:px-10 sm:pb-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white/70">
              <Link href="/" className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/15">
                Home
              </Link>
              <span className="text-white/40">/</span>
              <Link href="/profile" className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/15">
                Profiles
              </Link>
              <span className="text-white/40">/</span>
              <span className="rounded-full bg-white/10 px-3 py-1">{brandName}</span>
            </div>

            <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex items-start gap-5">
                <div className="relative size-20 overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.35)] sm:size-24">
                  {logoUrl ? (
                    <ContentImage
                      src={logoUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="96px"
                      intrinsicWidth={192}
                      intrinsicHeight={192}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-white/70">
                      {post.title.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="max-w-2xl">
                  <h1 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                    {brandName}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70">
                    {domain ? <span className="font-medium text-white/80">{domain}</span> : null}
                    <span className="inline-flex items-center gap-2">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-white/80">Featured</span>
                    </span>
                    {website ? (
                      <a
                        href={website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-white"
                      >
                        Official link <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {website ? (
                  <Button asChild size="lg" className="rounded-full bg-emerald-500 px-7 text-base font-semibold text-emerald-950 hover:bg-emerald-400">
                    <a href={website} target="_blank" rel="noreferrer">
                      Visit website <ChevronRight className="h-4 w-4" />
                    </a>
                  </Button>
                ) : null}
                <Button asChild size="lg" variant="secondary" className="rounded-full px-7 text-base font-semibold">
                  <Link href="/profile">Browse profiles</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <ProfileDetailTabs
            tabs={[
              {
                id: "about",
                label: "About",
                content: (
                  <div className="rounded-2xl border border-border/60 bg-background p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      Audience
                    </p>
                    <p className="mt-3 text-sm leading-7 text-foreground/80">
                      Builders, creators, and teams looking for tools and services like this.
                    </p>
                    <div className="mt-6 border-t border-border/50 pt-6">
                      <h2 className="text-lg font-semibold text-foreground">About {brandName}</h2>
                      <article
                        className="article-content prose prose-slate mt-4 max-w-none text-base leading-relaxed prose-p:my-4 prose-a:text-primary prose-a:underline prose-strong:font-semibold"
                        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
            rightRail={
              <>
                <div className="rounded-2xl border border-border/60 bg-background p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Quick facts</p>
                  <div className="mt-4 grid gap-3 text-sm">
                    {domain ? (
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Domain</span>
                        <span className="truncate font-medium text-foreground">{domain}</span>
                      </div>
                    ) : null}
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">Category</span>
                      <span className="truncate font-medium text-foreground">Profile</span>
                    </div>
                  </div>
                  {website ? (
                    <Button asChild className="mt-5 w-full rounded-full">
                      <Link href={website} target="_blank" rel="noopener noreferrer">
                        Open website
                      </Link>
                    </Button>
                  ) : null}
                </div>
              </>
            }
          />
        </section>

      </main>
      <Footer />
    </div>
  );
}
