import { Link } from "@tanstack/react-router";
import { createElement, type ComponentType, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { requiredPlanFor, type FeatureId } from "@/lib/entitlements";
import { useApp } from "@/lib/app-state";

/* --------------------------------- basics -------------------------------- */

export function PageTitle({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 pt-5 pb-1">
      <div className="min-w-0">
        {eyebrow ? <p className="label-mono">{eyebrow}</p> : null}
        <h1 className="mt-1 font-display text-[26px] leading-tight font-semibold sm:text-[32px]">{title}</h1>
        {subtitle ? <p className="mt-1.5 max-w-[62ch] text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function SectionHeading({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-2.5 flex items-center justify-between gap-3">
      <h2 className="font-display text-[16px] font-medium sm:text-[18px]">{title}</h2>
      {action}
    </div>
  );
}

export function Panel({
  children,
  tone = "paper",
  className,
}: {
  children: ReactNode;
  tone?: "paper" | "dark" | "slate";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl",
        tone === "paper" && "bg-parch ring-1 ring-foreground/5 divide-y divide-foreground/5",
        tone === "dark" && "bg-panel text-panel-foreground ring-1 ring-black/25 divide-y divide-white/8",
        tone === "slate" && "bg-panel-2 text-panel-foreground ring-1 ring-black/20 divide-y divide-white/8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Row({
  children,
  className,
  linkProps,
}: {
  children: ReactNode;
  className?: string;
  linkProps?: Record<string, unknown>;
}) {
  const content = <div className={cn("flex items-center gap-3 p-3.5", className)}>{children}</div>;
  if (!linkProps) return content;
  const AnyLink = Link as unknown as ComponentType<Record<string, unknown>>;
  return createElement(AnyLink, { ...linkProps, className: "block transition-colors hover:bg-foreground/[0.04]", children: content });
}

export function Avatar({ name, tone = "clay", size = 36 }: { name: string; tone?: "clay" | "moss" | "amber" | "mist"; size?: number }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
  const toneClass = {
    clay: "bg-clay/20 text-clay",
    moss: "bg-moss/20 text-moss",
    amber: "bg-amber/20 text-amber",
    mist: "bg-mist/25 text-mist",
  }[tone];
  return (
    <span
      className={cn("grid shrink-0 place-items-center rounded-full font-mono text-[12px] font-medium", toneClass)}
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  );
}

export function toneFromName(name: string): "clay" | "moss" | "amber" | "mist" {
  const tones = ["clay", "moss", "amber", "mist"] as const;
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h + name.charCodeAt(i)) % tones.length;
  return tones[h] ?? "clay";
}

export function Pill({ children, tone = "mist" }: { children: ReactNode; tone?: "clay" | "moss" | "amber" | "mist" | "ink" }) {
  const map = {
    clay: "bg-clay/15 text-clay",
    moss: "bg-moss/15 text-moss",
    amber: "bg-amber/20 text-amber",
    mist: "bg-foreground/8 text-muted-foreground",
    ink: "bg-foreground text-background",
  };
  return <span className={cn("shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wide", map[tone])}>{children}</span>;
}

export function Meter({ value, tone = "clay" }: { value: number; tone?: "clay" | "moss" | "amber" }) {
  const bar = { clay: "bg-clay", moss: "bg-moss", amber: "bg-amber" }[tone];
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
      <div className={cn("h-full rounded-full", bar)} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export function StatRegister({ items }: { items: { label: string; value: string; note?: string; tone?: "moss" | "amber" | "mist" }[] }) {
  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-xl bg-panel text-panel-foreground ring-1 ring-black/25 lg:grid-cols-4">
      {items.map((it, i) => (
        <div key={it.label} className={cn("border-white/8 p-4", i % 2 === 1 && "border-l", i < 2 && "border-b lg:border-b-0", i >= 2 && "lg:border-l")}>
          <p className="font-mono text-[11px] tracking-[0.14em] text-mist uppercase">{it.label}</p>
          <p className="mt-1.5 font-mono text-[24px] leading-none font-medium sm:text-[28px]">{it.value}</p>
          {it.note ? (
            <p className={cn("mt-1.5 text-[11px]", it.tone === "moss" ? "text-moss" : it.tone === "amber" ? "text-amber" : "text-mist")}>{it.note}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-foreground/15 bg-card/60 px-6 py-12 text-center">
      <h3 className="font-display text-[17px] font-medium">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-[42ch] text-sm text-muted-foreground">{body}</p>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Panel>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3.5">
          <div className="size-9 animate-pulse rounded-full bg-foreground/10" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 animate-pulse rounded bg-foreground/10" />
            <div className="h-2.5 w-1/4 animate-pulse rounded bg-foreground/8" />
          </div>
        </div>
      ))}
    </Panel>
  );
}

export function ErrorNote({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="rounded-xl border border-destructive/25 bg-destructive/8 p-4">
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}

/* ------------------------------ feature gating ---------------------------- */

export function UpgradePrompt({ feature, headline, body }: { feature: FeatureId; headline: string; body: string }) {
  return (
    <div className="rounded-xl bg-panel p-6 text-panel-foreground ring-1 ring-black/25 sm:p-8">
      <p className="font-mono text-[11px] tracking-[0.14em] text-amber uppercase">{requiredPlanFor(feature)} plan</p>
      <h3 className="mt-2 font-display text-[22px] font-semibold">{headline}</h3>
      <p className="mt-2 max-w-[52ch] text-sm text-mist">{body}</p>
      <Link to="/settings" className="mt-5 inline-flex items-center rounded-full bg-clay px-4 py-2 text-[13px] font-medium text-panel">
        View upgrade options
      </Link>
    </div>
  );
}

export function FeatureGate({
  feature,
  headline,
  body,
  children,
}: {
  feature: FeatureId;
  headline: string;
  body: string;
  children: ReactNode;
}) {
  const { has } = useApp();
  if (!has(feature)) return <UpgradePrompt feature={feature} headline={headline} body={body} />;
  return <>{children}</>;
}

/* -------------------------------- buttons -------------------------------- */

export function ActionButton({
  children,
  onClick,
  variant = "solid",
  type = "button",
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
        variant === "solid" && "bg-clay text-panel hover:bg-clay/90",
        variant === "outline" && "ring-1 ring-foreground/15 hover:bg-foreground/5",
        variant === "ghost" && "text-clay hover:bg-clay/10",
        className,
      )}
    >
      {children}
    </button>
  );
}
