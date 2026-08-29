import { createFileRoute, Link } from "@tanstack/react-router";
import { demo } from "@/lib/demo/data";
import { PageTitle, Panel, Pill } from "@/components/app/ui";

export const Route = createFileRoute("/academics/timetable")({
  head: () => ({
    meta: [
      { title: "Timetable — Almanac" },
      { name: "description", content: "Today's period-by-period timetable across classes, subjects and teachers." },
      { property: "og:title", content: "Timetable — Almanac" },
      { property: "og:description", content: "Today's period-by-period timetable across classes, subjects and teachers." },
    ],
  }),
  component: TimetablePage,
});

function TimetablePage() {
  const data = demo();
  return (
    <div className="fade-rise space-y-5">
      <PageTitle eyebrow="Academics" title="Timetable" subtitle={`${data.today} · ${data.schedule.length} periods scheduled today.`} />
      <Panel>
        {data.schedule.map((s) => (
          <Link key={s.id} to="/classes/$classId" params={{ classId: s.classSectionId }} className="flex items-center gap-3 p-3.5 hover:bg-foreground/[0.04]">
            <span className="w-16 shrink-0 font-mono text-[12px] text-muted-foreground">{s.time}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium">
                {data.subjects.find((x) => x.id === s.subjectId)?.name} · {data.classes.find((c) => c.id === s.classSectionId)?.name}
              </p>
              <p className="truncate font-mono text-[11px] text-muted-foreground">
                {s.topic} · {data.teachers.find((t) => t.id === s.teacherId)?.name}
              </p>
            </div>
            <Pill tone={s.state === "live" ? "clay" : s.state === "done" ? "moss" : "mist"}>{s.state}</Pill>
          </Link>
        ))}
      </Panel>
    </div>
  );
}
