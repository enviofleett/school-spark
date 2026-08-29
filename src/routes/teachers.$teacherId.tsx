import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { classStudents, demo, syllabusProgress } from "@/lib/demo/data";
import { Avatar, Meter, Panel, Pill, SectionHeading } from "@/components/app/ui";

export const Route = createFileRoute("/teachers/$teacherId")({
  head: () => ({
    meta: [
      { title: "Teacher profile — Almanac" },
      { name: "description", content: "Teacher profile with assigned classes, subjects, syllabus progress and recent lessons." },
      { property: "og:title", content: "Teacher profile — Almanac" },
      { property: "og:description", content: "Teacher profile with assigned classes, subjects and syllabus progress." },
    ],
  }),
  component: TeacherProfile,
});

function TeacherProfile() {
  const { teacherId } = Route.useParams();
  const data = demo();
  const teacher = data.teachers.find((t) => t.id === teacherId);
  if (!teacher) throw notFound();

  const classes = data.classes.filter((c) => c.teacherId === teacher.id || c.assistantId === teacher.id || c.minderId === teacher.id);
  const subjects = teacher.subjectIds.map((id) => data.subjects.find((s) => s.id === id)).filter(Boolean);
  const lessons = data.lessons.filter((l) => l.teacherId === teacher.id).slice(0, 6);

  return (
    <div className="fade-rise space-y-6 pt-5">
      <div className="flex flex-wrap items-center gap-4 rounded-xl bg-panel p-5 text-panel-foreground ring-1 ring-black/25 sm:p-6">
        <Avatar name={teacher.name} tone="moss" size={60} />
        <div>
          <h1 className="font-display text-[26px] font-semibold">{teacher.name}</h1>
          <p className="mt-1 font-mono text-[12px] text-mist">
            {teacher.employeeId} · {teacher.role} · joined {teacher.joined}
          </p>
        </div>
        <div className="ml-auto">
          <Pill tone={teacher.status === "active" ? "moss" : "amber"}>{teacher.status}</Pill>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <SectionHeading title="Contact & qualification" />
          <Panel>
            {[
              ["Email", teacher.email],
              ["Phone", teacher.phone],
              ["Qualification", teacher.qualification],
              ["Subjects", subjects.map((s) => s!.name).join(", ") || "—"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 p-3.5">
                <span className="text-[13px] text-muted-foreground">{k}</span>
                <span className="max-w-[60%] text-right text-[13px] font-medium">{v}</span>
              </div>
            ))}
          </Panel>
        </section>

        <section>
          <SectionHeading title="Assigned classes" />
          <Panel>
            {classes.length === 0 ? (
              <div className="p-5 text-sm text-muted-foreground">No class assignment this session.</div>
            ) : (
              classes.map((c) => (
                <Link key={c.id} to="/classes/$classId" params={{ classId: c.id }} className="flex items-center gap-3 p-3.5 hover:bg-foreground/[0.04]">
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium">{c.name}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {c.room} · {classStudents(c.id).length} students
                    </p>
                  </div>
                  <Pill tone="mist">{c.teacherId === teacher.id ? "Class teacher" : c.assistantId === teacher.id ? "Assistant" : "Minder"}</Pill>
                </Link>
              ))
            )}
          </Panel>
        </section>

        <section>
          <SectionHeading title="Syllabus coverage" />
          <Panel>
            {subjects.map((s) => (
              <div key={s!.id} className="p-3.5">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-medium">{s!.name}</span>
                  <span className="font-mono text-muted-foreground">{syllabusProgress(s!.id)}%</span>
                </div>
                <div className="mt-2">
                  <Meter value={syllabusProgress(s!.id)} tone="moss" />
                </div>
              </div>
            ))}
          </Panel>
        </section>

        <section>
          <SectionHeading title="Recent lessons" />
          <Panel>
            {lessons.length === 0 ? (
              <div className="p-5 text-sm text-muted-foreground">No lessons recorded yet this term.</div>
            ) : (
              lessons.map((l) => (
                <div key={l.id} className="p-3.5">
                  <p className="text-[13px] font-medium">{l.topic}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {data.classes.find((c) => c.id === l.classSectionId)?.name} · {l.date} · {l.time}
                  </p>
                </div>
              ))
            )}
          </Panel>
        </section>
      </div>
    </div>
  );
}
