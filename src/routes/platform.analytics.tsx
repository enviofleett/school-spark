import { createFileRoute } from "@tanstack/react-router";
import { demo } from "@/lib/demo/data";
import { Meter, PageTitle, Panel, StatRegister } from "@/components/app/ui";

export const Route = createFileRoute("/platform/analytics")({
  head: () => ({
    meta: [
      { title: "Platform analytics — Almanac" },
      { name: "description", content: "Adoption, active users, result publication and attendance capture across all schools." },
      { property: "og:title", content: "Platform analytics — Almanac" },
      { property: "og:description", content: "Adoption, active users and academic operations across all schools." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const data = demo();
  return (
    <div className="fade-rise space-y-5">
      <PageTitle eyebrow="Super admin" title="Analytics" subtitle="How schools are actually using Almanac this term." />
      <StatRegister
        items={[
          { label: "Weekly active staff", value: "612" },
          { label: "Parent logins", value: "3,480" },
          { label: "Registers taken", value: "94%", tone: "moss" },
          { label: "Results published", value: "71%", tone: "amber" },
        ]}
      />
      <Panel>
        {data.tenants.map((t, i) => {
          const adoption = 58 + ((t.students + i * 13) % 40);
          return (
            <div key={t.id} className="p-3.5">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium">{t.name}</span>
                <span className="font-mono text-muted-foreground">{adoption}% adoption</span>
              </div>
              <div className="mt-2"><Meter value={adoption} tone={adoption > 80 ? "moss" : adoption > 65 ? "clay" : "amber"} /></div>
            </div>
          );
        })}
      </Panel>
    </div>
  );
}
