import { createFileRoute, Link } from "@tanstack/react-router";
import { classStudents, demo, syllabusProgress } from "@/lib/demo/data";
import { useApp } from "@/lib/app-state";
import { PageTitle, Panel, Pill, StatRegister, Meter } from "@/components/app/ui";

export const Route = createFileRoute("/teacher/")({
  head: () => ({
    meta: [
      { title: "Teacher workspace — Almanac" },
      { name: "description", content: "Your day at a glance: periods, registers to take, lessons to log and results to submit." },
      { property: "og:title", content: "Teacher workspace — Almanac" },
      { property: "og:description", content: "Your day at a glance: periods, registers, lessons and results." },
    ],
  }),
  component: TeacherHome,
});

function TeacherHome() {
  const data = demo();
  const { teacherId, currentUserName } = useApp();
  const myClasses = data.classes.filter((c) => c.teacherId === teacherId || c.assistantId === teacherId);
  const myPeriods = data.schedule.filter((s) => s.teacherId === teacherId);
  const periods = myPeriods.length ? myPeriods : data.schedule.slice(0, 4);
  const myResults = data.results.filter((r) => r.teacherId === teacherId).slice(0, 4);

  return (
    <div className="fade-rise space-y-6">
      <PageTitle eyebrow={data.today} title={`Good morning, ${currentUserName.split(" ")[0]}`} subtitle="Everything you need for today, in the order you'll need it." />

      <StatRegister
        items={[
          { label: "Periods today", value: `${periods.length}` },
          { label: "My classes", value: `${myClasses.length || 2}` },
          { label: "Students", value: `${myClasses.reduce((a, c) => a + classStudents(c.id).length, 0) || 48}` },
          { label: "Batches open", value: `${myResults.length}`, tone: "amber" },
        ]}
      />

      <section>
        <h2 className="mb-2 font-display text-[17px] font-medium">Today's periods</h2>
        <Panel>
          {periods.map((p) => (
            <Link key={p.id} to="/teacher/class/$classId" params={{ classId: p.classSectionId }} className="flex items-center gap-3 p-3.5 hover:bg-foreground/[0.04]">
              <span className="w-14 shrink-0 font-mono text-[12px] text-muted-foreground">{p.time}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium">
                  {data.subjects.find((s) => s.id === p.subjectId)?.name} · {data.classes.find((c) => c.id === p.classSectionId)?.name}
                </p>
                <p className="truncate font-mono text-[11px] text-muted-foreground">{p.topic}</p>
              </div>
              <Pill tone={p.state === "live" ? "clay" : p.state === "done" ? "moss" : "mist"}>{p.state}</Pill>
            </Link>
          ))}
        </Panel>
      </section>

      <section>
        <h2 className="mb-2 font-display text-[17px] font-medium">Syllabus coverage</h2>
        <Panel>
          {data.subjects.slice(0, 4).map((s) => (
            <div key={s.id} className="p-3.5">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium">{s.name}</span>
                <span className="font-mono text-muted-foreground">{syllabusProgress(s.id)}%</span>
              </div>
              <div className="mt-2"><Meter value={syllabusProgress(s.id)} tone="moss" /></div>
            </div>
          ))}
        </Panel>
      </section>

      <section>
        <h2 className="mb-2 font-display text-[17px] font-medium">Result batches</h2>
        <Panel>
          {myResults.length === 0 ? (
            <div className="p-5 text-sm text-muted-foreground">Nothing waiting on you right now.</div>
          ) : (
            myResults.map((r) => (
              <Link key={r.id} to="/results/$batchId" params={{ batchId: r.id }} className="flex items-center gap-3 p-3.5 hover:bg-foreground/[0.04]">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">
                    {data.subjects.find((s) => s.id === r.subjectId)?.name} · {data.classes.find((c) => c.id === r.classSectionId)?.name}
                  </p>
                  <p className="font-mono text-[11px] text-muted-foreground">updated {r.updated}</p>
                </div>
                <Pill tone={r.status === "approved" ? "moss" : "clay"}>{r.status}</Pill>
              </Link>
            ))
          )}
        </Panel>
      </section>
    </div>
  );
}
