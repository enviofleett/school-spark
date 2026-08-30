import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { demo } from "@/lib/demo/data";
import { ActionButton, PageTitle, Panel, Pill } from "@/components/app/ui";

export const Route = createFileRoute("/platform/domains")({
  head: () => ({
    meta: [
      { title: "Domains — Almanac" },
      { name: "description", content: "Custom domains and fallback subdomains for every school, with DNS status." },
      { property: "og:title", content: "Domains — Almanac" },
      { property: "og:description", content: "Custom domains and fallback subdomains for every school, with DNS status." },
    ],
  }),
  component: DomainsPage,
});

function DomainsPage() {
  const data = demo();
  return (
    <div className="fade-rise space-y-5">
      <PageTitle eyebrow="Super admin" title="Domains" subtitle="Each school gets a fallback subdomain immediately and can connect its own domain." />
      <Panel>
        {data.tenants.map((t) => (
          <div key={t.id} className="flex flex-wrap items-center gap-3 p-3.5">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium">{t.domainStatus === "none" ? t.fallbackDomain : t.domain}</p>
              <p className="truncate font-mono text-[11px] text-muted-foreground">{t.name} · fallback {t.fallbackDomain}</p>
            </div>
            <Pill tone={t.domainStatus === "connected" ? "moss" : t.domainStatus === "pending" ? "amber" : "mist"}>{t.domainStatus}</Pill>
            <ActionButton variant="outline" onClick={() => toast.success(`DNS re-checked for ${t.shortName}`)}>Re-check</ActionButton>
          </div>
        ))}
      </Panel>
    </div>
  );
}
