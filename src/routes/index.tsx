import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { CURRENT_SESSION, CURRENT_TERM, demo, syllabusProgress } from "@/lib/demo/data";
import { useApp } from "@/lib/app-state";
import { Avatar, Meter, Panel, Pill, SectionHeading, StatRegister, toneFromName } from "@/components/app/ui";
import { ArrowRight, Plus } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "School overview — Almanac" },
      { name: "description", content: "Today's classes, attendance, syllabus progress and school activity in one calm overview." },
      { property: "og:title", content: "School overview — Almanac" },
      { property: "og:description", content: "Today's classes, attendance, syllabus progress and school activity in one calm overview." },
    ],
  }),
  component: Overview,
});

function Overview() {
  const data = demo();
  const { currentUserName, tenant, students, resultOverrides, has } = useApp();

  const pending = useMemo(
    () =>
      data.results
        .map((r) => ({ ...r, status: resultOverrides[r.id] ?? r.status }))
        .filter((r) => r.status === "submitted" || r.status === "review")
        .slice(0, 4),
    [data.results, resultOverrides],
  );

  const roster = students.slice(0, 4);

  return (
    <div className="fade-rise space-y-8 pt-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label-mono">
            {CURRENT_TERM} · {CURRENT_SESSION}
          </p>
          <h1 className="mt-1 font-display text-[28px] leading-tight font-semibold sm:text-[34px]">
            Good morning, {currentUserName.split(" ")[0]}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            A quiet morning at {tenant.shortName}. 1,207 students have checked in so far.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/students" className="rounded-full bg-clay px-3.5 py-2 text-[13px] font-medium text-panel">
            <Plus className="mr-1 inline size-3.5" /> Add student
          </Link>
          <Link to="/import" className="rounded-full px-3.5 py-2 text-[13px] font-medium ring-1 ring-foreground/15">
            Import data
          </Link>
        </div>
      </div>

      <StatRegister
        items={[
          { label: "Students", value: "1,284", note: "+22 this term", tone: "moss" },
          { label: "Attendance", value: "94%", note: "today, all sections" },
          { label: "Teachers", value: "74", note: "62 on duty" },
          { label: "Classes", value: String(data.classes.length), note: `${pending.length} need review`, tone: "amber" },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <SectionHeading
            title="Today's classes"
            action={
              <Link to="/academics/timetable" className="font-mono text-[11px] text-clay">
                View all
              </Link>
            }
          />
          <Panel tone="slate">
            {data.schedule.map((s) => {
              const subject = data.subjects.find((x) => x.id === s.subjectId);
              const cls = data.classes.find((c) => c.id === s.classSectionId);
              return (
                <div key={s.id} className="flex items-center gap-3 p-3.5">
                  <span className={`w-11 shrink-0 font-mono text-[13px] ${s.state === "live" ? "text-clay" : s.state === "done" ? "text-mist" : "text-amber"}`}>
                    {s.time}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-medium">{subject?.name}</p>
                    <p className="truncate font-mono text-[11px] text-mist">
                      {cls?.name} · {s.topic}
                    </p>
                  </div>
                  <Link
                    to="/teacher/class/$classId"
                    params={{ classId: s.classSectionId }}
                    className="shrink-0 rounded-md px-2.5 py-1.5 text-[12px] ring-1 ring-white/15 hover:bg-white/5"
                  >
                    Open
                  </Link>
                </div>
              );
            })}
          </Panel>
        </section>

        <section>
          <SectionHeading title="Attendance alerts" action={<Link to="/attendance" className="font-mono text-[11px] text-clay">Review</Link>} />
          <Panel>
            <div className="flex items-center gap-3 p-3.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-amber/20 font-mono text-[12px] text-amber">3</span>
              <p className="text-[13px]">Primary 1 Alpha · 3 absent, no notice sent</p>
            </div>
            <div className="flex items-center gap-3 p-3.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-clay/20 font-mono text-[12px] text-clay">5</span>
              <p className="text-[13px]">Primary 2 Beta · 5 marked late this morning</p>
            </div>
            <div className="flex items-center gap-3 p-3.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-moss/20 font-mono text-[12px] text-moss">6</span>
              <p className="text-[13px]">6 students below 80% attendance this term</p>
            </div>
          </Panel>
        </section>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <section>
          <SectionHeading title="Syllabus progress" action={<span className="font-mono text-[11px] text-muted-foreground">Primary 3</span>} />
          <Panel>
            {data.subjects.slice(0, 3).map((s, i) => (
              <div key={s.id} className="p-3.5">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-medium">{s.name}</span>
                  <span className="font-mono text-muted-foreground">{syllabusProgress(s.id)}%</span>
                </div>
                <div className="mt-2">
                  <Meter value={syllabusProgress(s.id)} tone={i === 0 ? "clay" : i === 1 ? "moss" : "amber"} />
                </div>
              </div>
            ))}
          </Panel>
        </section>

        <section className="lg:col-span-2">
          <SectionHeading title="Recent activity" action={<Link to="/communication" className="font-mono text-[11px] text-clay">Feed</Link>} />
          <Panel tone="dark">
            {data.activity.slice(0, 5).map((a) => (
              <div key={a.id} className="flex gap-3 p-3.5">
                <Avatar name={a.actor} tone={a.tone} size={32} />
                <div className="min-w-0">
                  <p className="text-[13px] leading-snug">
                    <span>{a.actor}</span> <span className="text-mist">{a.action}</span>
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-mist">{a.detail}</p>
                </div>
              </div>
            ))}
          </Panel>
        </section>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <SectionHeading title="Pending results" action={<Link to="/results" className="font-mono text-[11px] text-clay">Results desk</Link>} />
          <Panel>
            {pending.map((r) => {
              const cls = data.classes.find((c) => c.id === r.classSectionId);
              const subject = data.subjects.find((s) => s.id === r.subjectId);
              return (
                <Link key={r.id} to="/results/$batchId" params={{ batchId: r.id }} className="flex items-center gap-3 p-3.5 hover:bg-foreground/[0.04]">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium">
                      {subject?.name} · {cls?.name}
                    </p>
                    <p className="font-mono text-[11px] text-muted-foreground">Updated {r.updated}</p>
                  </div>
                  <Pill tone={r.status === "review" ? "amber" : "clay"}>{r.status}</Pill>
                </Link>
              );
            })}
          </Panel>
        </section>

        <section>
          <SectionHeading title="Students" action={<Link to="/students" className="font-mono text-[11px] text-clay">Directory</Link>} />
          <Panel>
            {roster.map((s) => {
              const cls = data.classes.find((c) => c.id === s.classSectionId);
              return (
                <Link key={s.id} to="/students/$studentId" params={{ studentId: s.id }} className="flex items-center gap-3 p-3 hover:bg-foreground/[0.04]">
                  <Avatar name={s.name} tone={toneFromName(s.name)} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium">{s.name}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {s.admissionNo} · {cls?.name}
                    </p>
                  </div>
                  <Pill tone={s.status === "active" ? "moss" : "amber"}>{s.status}</Pill>
                </Link>
              );
            })}
          </Panel>
        </section>
      </div>

      {has("communication") ? (
        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <SectionHeading title="Recent parent communication" action={<Link to="/communication" className="font-mono text-[11px] text-clay">Open</Link>} />
            <Panel>
              {demo().messages.slice(0, 3).map((m) => (
                <div key={m.id} className="p-3.5">
                  <div className="flex items-center gap-2">
                    <p className="flex-1 truncate text-[13px] font-medium">{m.subject}</p>
                    <Pill tone={m.channel === "WhatsApp" ? "moss" : m.channel === "Email" ? "clay" : "mist"}>{m.channel}</Pill>
                  </div>
                  <p className="mt-1 line-clamp-1 text-[12px] text-muted-foreground">{m.body}</p>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    {m.audience} · {m.time}
                  </p>
                </div>
              ))}
            </Panel>
          </section>

          <section>
            <SectionHeading title="Upcoming" />
            <Panel>
              {data.events.map((e) => (
                <div key={e.id} className="flex items-center gap-3 p-3.5">
                  <span className="w-14 shrink-0 font-mono text-[12px] text-clay">{e.date}</span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium">{e.title}</p>
                    <p className="text-[12px] text-muted-foreground">{e.detail}</p>
                  </div>
                  <ArrowRight className="ml-auto size-4 text-muted-foreground" />
                </div>
              ))}
            </Panel>
          </section>
        </div>
      ) : null}
    </div>
  );
}
