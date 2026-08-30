import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { demo } from "@/lib/demo/data";
import { useApp } from "@/lib/app-state";
import { ActionButton, PageTitle, Panel, Pill } from "@/components/app/ui";

export const Route = createFileRoute("/platform/schools")({
  head: () => ({
    meta: [
      { title: "Schools — Almanac" },
      { name: "description", content: "All tenant schools with plan, status, size and quick tenant switching." },
      { property: "og:title", content: "Schools — Almanac" },
      { property: "og:description", content: "All tenant schools with plan, status, size and quick tenant switching." },
    ],
  }),
  component: SchoolsPage,
});

function SchoolsPage() {
  const data = demo();
  const { setTenantId, tenantId } = useApp();
  const [status, setStatus] = useState("all");
  const rows = data.tenants.filter((t) => status === "all" || t.status === status);

  return (
    <div className="fade-rise space-y-5">
      <PageTitle eyebrow="Super admin" title="Schools" subtitle="Switch into any tenant to see exactly what that school sees." />
      <div className="flex flex-wrap gap-2">
        {["all", "active", "trial", "expired", "suspended"].map((s) => (
          <button key={s} onClick={() => setStatus(s)} className={`rounded-full px-3.5 py-2 text-[13px] font-medium capitalize ring-1 ${status === s ? "bg-panel text-panel-foreground ring-transparent" : "bg-card ring-foreground/10"}`}>
            {s}
          </button>
        ))}
      </div>
      <Panel>
        {rows.map((t) => (
          <div key={t.id} className="flex flex-wrap items-center gap-3 p-3.5">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-panel font-display text-[15px] text-panel-foreground">{t.initial}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium">{t.name}</p>
              <p className="truncate font-mono text-[11px] text-muted-foreground">{t.city} · {t.plan} · ₦{t.mrr.toLocaleString()} / term</p>
            </div>
            <Pill tone={t.status === "active" ? "moss" : t.status === "trial" ? "clay" : "amber"}>{t.status}</Pill>
            <ActionButton
              variant={tenantId === t.id ? "ghost" : "outline"}
              onClick={() => { setTenantId(t.id); toast.success(`Now viewing ${t.name}`); }}
            >
              {tenantId === t.id ? "Current tenant" : "Switch in"}
            </ActionButton>
          </div>
        ))}
      </Panel>
    </div>
  );
}
