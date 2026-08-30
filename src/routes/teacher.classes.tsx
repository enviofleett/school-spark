import { createFileRoute, Link } from "@tanstack/react-router";
import { classStudents, demo } from "@/lib/demo/data";
import { useApp } from "@/lib/app-state";
import { EmptyState, PageTitle, Panel, Pill } from "@/components/app/ui";

export const Route = createFileRoute("/teacher/classes")({
  head: () => ({
    meta: [
      { title: "My classes — Almanac" },
      { name: "description", content: "The classes you teach, with rosters, registers and lesson logging." },
      { property: "og:title", content: "My classes — Almanac" },
      { property: "og:description", content: "The classes you teach, with rosters, registers and lesson logging." },
    ],
  }),
  component: TeacherClasses,
});

function TeacherClasses() {
  const data = demo();
  const { teacherId } = useApp();
  const mine = data.classes.filter((c) => c.teacherId === teacherId || c.assistantId === teacherId);
  const rows = mine.length ? mine : data.classes.slice(0, 3);

  return (
    <div className="fade-rise space-y-5">
      <PageTitle eyebrow="Teacher workspace" title="My classes" subtitle="Open a class to take the register, log a lesson or enter scores." />
      {rows.length === 0 ? (
        <EmptyState title="No classes assigned" body="Your school administrator will assign you a class for this session." />
      ) : (
        <Panel>
          {rows.map((c) => (
            <Link key={c.id} to="/teacher/class/$classId" params={{ classId: c.id }} className="flex items-center gap-3 p-3.5 hover:bg-foreground/[0.04]">
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium">{c.name}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{c.room} · {classStudents(c.id).length} students</p>
              </div>
              <Pill tone={c.teacherId === teacherId ? "clay" : "mist"}>{c.teacherId === teacherId ? "Class teacher" : "Assistant"}</Pill>
            </Link>
          ))}
        </Panel>
      )}
    </div>
  );
}
