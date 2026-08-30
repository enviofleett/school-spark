import { createFileRoute, Link } from "@tanstack/react-router";
import { attendanceFor, demo, scoresFor } from "@/lib/demo/data";
import { useApp } from "@/lib/app-state";
import { Avatar, PageTitle, Panel, Pill, toneFromName } from "@/components/app/ui";

export const Route = createFileRoute("/parent/")({
  head: () => ({
    meta: [
      { title: "Parent portal — Almanac" },
      { name: "description", content: "Follow your child's attendance, results, report cards and messages from school." },
      { property: "og:title", content: "Parent portal — Almanac" },
      { property: "og:description", content: "Follow your child's attendance, results, report cards and messages." },
    ],
  }),
  component: ParentHome,
});

function ParentHome() {
  const data = demo();
  const { parentChildren, currentUserName } = useApp();

  return (
    <div className="fade-rise space-y-6">
      <PageTitle eyebrow="Parent portal" title={`Hello, ${currentUserName}`} subtitle="Everything the school has shared with you, in one place." />

      <div className="grid gap-4 sm:grid-cols-2">
        {parentChildren.map((c) => {
          const att = attendanceFor(c.id);
          const avg = Math.round(data.subjects.slice(0, 6).reduce((a, s) => a + scoresFor(c.id, s.id).total, 0) / 6);
          return (
            <Link key={c.id} to="/students/$studentId" params={{ studentId: c.id }} className="rounded-xl bg-panel p-5 text-panel-foreground ring-1 ring-black/25">
              <div className="flex items-center gap-3">
                <Avatar name={c.name} tone={toneFromName(c.name)} size={44} />
                <div className="min-w-0">
                  <p className="truncate font-display text-[17px] font-medium">{c.name}</p>
                  <p className="font-mono text-[11px] text-mist">{data.classes.find((x) => x.id === c.classSectionId)?.name}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-3">
                <div>
                  <p className="label-mono text-mist">Average</p>
                  <p className="font-mono text-[20px]">{avg}%</p>
                </div>
                <div>
                  <p className="label-mono text-mist">Attendance</p>
                  <p className="font-mono text-[20px]">{att.rate}%</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <section>
        <h2 className="mb-2 font-display text-[17px] font-medium">Quick links</h2>
        <Panel>
          {[
            { to: "/parent/results" as const, label: "Results", note: "Term 2 scores by subject" },
            { to: "/parent/attendance" as const, label: "Attendance", note: "Daily register history" },
            { to: "/parent/reports" as const, label: "Report cards", note: "Download published reports" },
            { to: "/parent/messages" as const, label: "Messages", note: "From teachers and the school office" },
          ].map((l) => (
            <Link key={l.to} to={l.to} className="flex items-center gap-3 p-3.5 hover:bg-foreground/[0.04]">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium">{l.label}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{l.note}</p>
              </div>
              <Pill tone="mist">Open</Pill>
            </Link>
          ))}
        </Panel>
      </section>
    </div>
  );
}
