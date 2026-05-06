"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tab = { id: string; label: string; content: React.ReactNode };

export function ProfileDetailTabs({
  tabs,
  rightRail,
}: {
  tabs: Tab[];
  rightRail?: React.ReactNode;
}) {
  const [active, setActive] = React.useState(tabs[0]?.id ?? "about");

  React.useEffect(() => {
    if (!tabs.some((tab) => tab.id === active)) setActive(tabs[0]?.id ?? "about");
  }, [active, tabs]);

  const activeTab = tabs.find((tab) => tab.id === active) ?? tabs[0];

  return (
    <div className="rounded-[1.9rem] border border-border/60 bg-background/60 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-wrap items-center gap-2 border-b border-border/50 px-4 py-3 sm:px-6">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            type="button"
            size="sm"
            variant={active === tab.id ? "default" : "ghost"}
            onClick={() => setActive(tab.id)}
            className={cn(
              "rounded-full",
              active === tab.id ? "" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-8 p-4 sm:p-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="min-w-0">{activeTab?.content}</div>
        <div className="space-y-5">{rightRail}</div>
      </div>
    </div>
  );
}

