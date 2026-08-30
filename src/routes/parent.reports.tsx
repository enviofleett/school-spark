import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { SESSIONS } from "@/lib/demo/data";
import { useApp } from "@/lib/app-state";
import { ActionButton, PageTitle, Panel, Pill } from "@/components/app/ui";

export const Route = createFileRoute("/parent/reports")({
  head: () => ({
    meta: [
      { title: "Report cards — Almanac" },
      { name: "description", content: "Download published term report cards for every session your child has attended." },
      { property: "og:title", content: "Report cards — Almanac" },
      { property: "og:description", content: "Download published term report cards for every session." },
    ],
  }),
  component: ParentReports,
});

function ParentReports() {
  const { parentChildren } = useApp();
  return (
    <div className="fade-rise space-y-6">
      <PageTitle eyebrow="Parent portal" title="Report cards" subtitle="Every published report stays available — the record follows your child year after year." />
      {parentChildren.map((c) => (
        <section key={c.id} className="space-y-2">
          <h2 className="font-display text-[17px] font-medium">{c.name}</h2>
          <Panel>
            {SESSIONS.flatMap((s) => ["Term 1", "Term 2", "Term 3"].map((t) => ({ s, t }))).map(({ s, t }, i) => {
              const published = i < 7;
              return (
                <div key={`${s}-${t}`} className="flex items-center gap-3 p-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium">{t}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{s}</p>
                  </div>
                  {published ? (
                    <ActionButton variant="ghost" onClick={() => toast.success("Report downloaded", { description: `${c.firstName} · ${t} ${s}` })}>Download</ActionButton>
                  ) : (
                    <Pill tone="mist">Not published</Pill>
                  )}
                </div>
              );
            })}
          </Panel>
        </section>
      ))}
    </div>
  );
}
