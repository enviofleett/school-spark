import { createFileRoute, Link } from "@tanstack/react-router";
import { demo } from "@/lib/demo/data";
import { PageTitle, Panel, Pill, StatRegister } from "@/components/app/ui";

export const Route = createFileRoute("/platform/")({
  head: () => ({
    meta: [
      { title: "Platform overview — Almanac" },
      { name: "description", content: "Cross-tenant view of schools, subscriptions, revenue and platform health." },
      { property: "og:title", content: "Platform overview — Almanac" },
      { property: "og:description", content: "Cross-tenant view of schools, subscriptions, revenue and platform health." },
    ],
  }),
  component: PlatformHome,
});

function PlatformHome() {
  const data = demo();
  const mrr = data.tenants.reduce((a, t) => a + t.mrr, 0);
  const active = data.tenants.filter((t) => t.status === "active").length;

  return (
    <div className="fade-rise space-y-6">
      <PageTitle eyebrow="Super admin" title="Platform overview" subtitle="Every school running on Almanac, with plan, status and revenue." />
      <StatRegister
        items={[
          { label: "Schools", value: `${data.tenants.length}` },
          { label: "Active", value: `${active}`, tone: "moss" },
          { label: "Students", value: `${data.tenants.reduce((a, t) => a + t.students, 0).toLocaleString()}` },
          { label: "MRR", value: `₦${(mrr / 1000).toFixed(0)}k` },
        ]}
      />
      <section>
        <h2 className="mb-2 font-display text-[17px] font-medium">Schools</h2>
        <Panel>
          {data.tenants.map((t) => (
            <Link key={t.id} to="/platform/schools" className="flex items-center gap-3 p-3.5 hover:bg-foreground/[0.04]">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-panel font-display text-[15px] text-panel-foreground">{t.initial}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium">{t.name}</p>
                <p className="truncate font-mono text-[11px] text-muted-foreground">{t.domain} · {t.students} students</p>
              </div>
              <Pill tone={t.status === "active" ? "moss" : t.status === "trial" ? "clay" : "amber"}>{t.status}</Pill>
            </Link>
          ))}
        </Panel>
      </section>
    </div>
  );
}
