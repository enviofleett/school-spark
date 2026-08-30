import { createFileRoute } from "@tanstack/react-router";
import { demo } from "@/lib/demo/data";
import { PLANS } from "@/lib/entitlements";
import { PageTitle, Panel, Pill, StatRegister } from "@/components/app/ui";

export const Route = createFileRoute("/platform/subscriptions")({
  head: () => ({
    meta: [
      { title: "Subscriptions — Almanac" },
      { name: "description", content: "Plan mix, add-ons, renewal dates and revenue across every school." },
      { property: "og:title", content: "Subscriptions — Almanac" },
      { property: "og:description", content: "Plan mix, add-ons, renewal dates and revenue across every school." },
    ],
  }),
  component: SubscriptionsPage,
});

function SubscriptionsPage() {
  const data = demo();
  return (
    <div className="fade-rise space-y-5">
      <PageTitle eyebrow="Super admin" title="Subscriptions" subtitle="Plan mix and billing status across the platform." />
      <StatRegister
        items={PLANS.map((p) => ({
          label: p.name,
          value: `${data.tenants.filter((t) => t.plan === p.id).length}`,
          note: p.price,
        }))}
      />
      <Panel>
        {data.tenants.map((t) => (
          <div key={t.id} className="flex flex-wrap items-center gap-3 p-3.5">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium">{t.name}</p>
              <p className="truncate font-mono text-[11px] text-muted-foreground">
                {t.plan} · since {t.createdAt}{t.addOns.length ? ` · add-ons: ${t.addOns.join(", ")}` : ""}
              </p>
            </div>
            <span className="font-mono text-[12px]">₦{t.mrr.toLocaleString()}</span>
            <Pill tone={t.status === "active" ? "moss" : t.status === "trial" ? "clay" : "amber"}>{t.status}</Pill>
          </div>
        ))}
      </Panel>
    </div>
  );
}
