"use client";

import * as React from "react";
import { Copy, Link as LinkIcon, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ArticleActionPanel({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = React.useState(false);

  const flashCopied = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      flashCopied();
    } catch {
      // Ignore clipboard failures.
    }
  };

  const handleShare = async () => {
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      flashCopied();
    } catch {
      // Ignore share failures.
    }
  };

  return (
    <div className="grid gap-2">
      <Button onClick={handleShare} className="w-full justify-start">
        <Share2 className="h-4 w-4" />
        Share
      </Button>
      <Button onClick={handleCopy} variant="outline" className="w-full justify-start">
        {copied ? <LinkIcon className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied link" : "Copy link"}
      </Button>
    </div>
  );
}

