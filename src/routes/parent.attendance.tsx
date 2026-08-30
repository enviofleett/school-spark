import { createFileRoute } from "@tanstack/react-router";
import { attendanceFor } from "@/lib/demo/data";
import { useApp } from "@/lib/app-state";
import { PageTitle, Panel, StatRegister } from "@/components/app/ui";

export const Route = createFileRoute("/parent/attendance")({
  head: () => ({
    meta: [
      { title: "Child attendance — Almanac" },
      { name: "description", content: "Daily attendance history and term totals for your children." },
      { property: "og:title", content: "Child attendance — Almanac" },
      { property: "og:description", content: "Daily attendance history and term totals for your children." },
    ],
  }),
  component: ParentAttendance,
});

function ParentAttendance() {
  const { parentChildren } = useApp();
  return (
    <div className="fade-rise space-y-6">
      <PageTitle eyebrow="Parent portal" title="Attendance" subtitle="Term totals and the last two weeks of the daily register." />
      {parentChildren.map((c) => {
        const a = attendanceFor(c.id);
        return (
          <section key={c.id} className="space-y-3">
            <h2 className="font-display text-[17px] font-medium">{c.name}</h2>
            <StatRegister
              items={[
                { label: "Rate", value: `${a.rate}%` },
                { label: "Present", value: `${a.present}` },
                { label: "Absent", value: `${a.absent}`, tone: "amber" },
                { label: "Late", value: `${a.late}`, tone: "amber" },
              ]}
            />
            <Panel>
              {Array.from({ length: 10 }).map((_, i) => {
                const absent = (a.absent + i) % 7 === 0;
                return (
                  <div key={i} className="flex items-center justify-between p-3">
                    <span className="font-mono text-[12px] text-muted-foreground">{`${24 - i} Jun 2026`}</span>
                    <span className={`text-[13px] font-medium ${absent ? "text-amber" : ""}`}>{absent ? "Absent" : "Present"}</span>
                  </div>
                );
              })}
            </Panel>
          </section>
        );
      })}
    </div>
  );
}
