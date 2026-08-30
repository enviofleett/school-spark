import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { FEATURES, planFeatures } from "@/lib/entitlements";
import { demo } from "@/lib/demo/data";
import { PageTitle, Panel, Pill } from "@/components/app/ui";

export const Route = createFileRoute("/platform/features")({
  head: () => ({
    meta: [
      { title: "Feature flags — Almanac" },
      { name: "description", content: "Entitlements per school: what each plan unlocks and which overrides are active." },
      { property: "og:title", content: "Feature flags — Almanac" },
      { property: "og:description", content: "Entitlements per school: what each plan unlocks and which overrides are active." },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  const data = demo();
  const [tenantId, setTenantId] = useState(data.tenants[0]!.id);
  const tenant = data.tenants.find((t) => t.id === tenantId)!;
  const enabled = planFeatures(tenant.plan);
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});

  return (
    <div className="fade-rise space-y-5">
      <PageTitle eyebrow="Super admin" title="Feature entitlements" subtitle="Plan sets the baseline; overrides let you open a module for one school." />
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {data.tenants.map((t) => (
          <button key={t.id} onClick={() => setTenantId(t.id)} className={`shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium ring-1 ${tenantId === t.id ? "bg-panel text-panel-foreground ring-transparent" : "bg-card ring-foreground/10"}`}>
            {t.shortName}
          </button>
        ))}
      </div>
      <Panel>
        {FEATURES.map((f) => {
          const on = overrides[f.id] ?? enabled.includes(f.id);
          return (
            <div key={f.id} className="flex items-center justify-between gap-3 p-3.5">
              <div>
                <p className="text-[13px] font-medium">{f.label}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{f.group}</p>
              </div>
              <button
                onClick={() => {
                  setOverrides((p) => ({ ...p, [f.id]: !on }));
                  toast.success(`${f.label} ${on ? "disabled" : "enabled"} for ${tenant.shortName}`);
                }}
              >
                <Pill tone={on ? "moss" : "mist"}>{on ? "Enabled" : "Off"}</Pill>
              </button>
            </div>
          );
        })}
      </Panel>
    </div>
  );
}
