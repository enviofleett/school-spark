import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { attendanceFor, classStudents, demo, syllabusProgress } from "@/lib/demo/data";
import { Avatar, Meter, Panel, Pill, SectionHeading, toneFromName } from "@/components/app/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/classes/$classId")({
  head: () => ({
    meta: [
      { title: "Class workspace — Almanac" },
      { name: "description", content: "Class roster, staff, timetable, syllabus coverage and attendance in one workspace." },
      { property: "og:title", content: "Class workspace — Almanac" },
      { property: "og:description", content: "Class roster, staff, timetable, syllabus coverage and attendance." },
    ],
  }),
  component: ClassDetail,
});

function ClassDetail() {
  const { classId } = Route.useParams();
  const data = demo();
  const cls = data.classes.find((c) => c.id === classId);
  if (!cls) throw notFound();

  const roster = classStudents(cls.id);
  const teacher = data.teachers.find((t) => t.id === cls.teacherId);
  const assistant = data.teachers.find((t) => t.id === cls.assistantId);
  const minder = data.teachers.find((t) => t.id === cls.minderId);
  const schedule = data.schedule.filter((s) => s.classSectionId === cls.id);
  const avgAttendance = roster.length ? Math.round(roster.reduce((a, s) => a + attendanceFor(s.id).rate, 0) / roster.length) : 0;

  return (
    <div className="fade-rise space-y-6 pt-5">
      <div className="rounded-xl bg-panel p-5 text-panel-foreground ring-1 ring-black/25 sm:p-6">
        <p className="label-mono text-mist">{cls.stage} · {cls.room}</p>
        <h1 className="mt-1 font-display text-[28px] font-semibold">{cls.name}</h1>
        <div className="mt-4 grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
          {[
            ["Students", `${roster.length}`],
            ["Capacity", `${cls.capacity}`],
            ["Attendance", `${avgAttendance}%`],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="label-mono text-mist">{k}</p>
              <p className="mt-1 font-mono text-[22px]">{v}</p>
            </div>
          ))}
        </div>
      </div>

      <Tabs defaultValue="roster">
        <TabsList className="bg-parch">
          <TabsTrigger value="roster">Roster</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
          <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
        </TabsList>

        <TabsContent value="roster" className="pt-4">
          <Panel>
            {roster.map((s) => (
              <Link key={s.id} to="/students/$studentId" params={{ studentId: s.id }} className="flex items-center gap-3 p-3 hover:bg-foreground/[0.04]">
                <Avatar name={s.name} tone={toneFromName(s.name)} size={34} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">{s.name}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{s.admissionNo}</p>
                </div>
                <span className="font-mono text-[12px] text-muted-foreground">{attendanceFor(s.id).rate}%</span>
              </Link>
            ))}
          </Panel>
        </TabsContent>

        <TabsContent value="staff" className="pt-4">
          <Panel>
            {[
              ["Class teacher", teacher],
              ["Assistant teacher", assistant],
              ["Minder", minder],
            ].map(([label, t]) =>
              t && typeof t !== "string" ? (
                <Link key={label as string} to="/teachers/$teacherId" params={{ teacherId: t.id }} className="flex items-center gap-3 p-3.5 hover:bg-foreground/[0.04]">
                  <Avatar name={t.name} tone="moss" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium">{t.name}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{label as string}</p>
                  </div>
                  <Pill tone={t.status === "active" ? "moss" : "amber"}>{t.status}</Pill>
                </Link>
              ) : null,
            )}
          </Panel>
        </TabsContent>

        <TabsContent value="timetable" className="pt-4">
          <Panel>
            {schedule.length === 0 ? (
              <div className="p-5 text-sm text-muted-foreground">No periods scheduled for today.</div>
            ) : (
              schedule.map((s) => (
                <div key={s.id} className="flex items-center gap-3 p-3.5">
                  <span className="font-mono text-[12px] text-muted-foreground">{s.time}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium">{data.subjects.find((x) => x.id === s.subjectId)?.name}</p>
                    <p className="truncate font-mono text-[11px] text-muted-foreground">{s.topic}</p>
                  </div>
                  <Pill tone={s.state === "live" ? "clay" : s.state === "done" ? "moss" : "mist"}>{s.state}</Pill>
                </div>
              ))
            )}
          </Panel>
        </TabsContent>

        <TabsContent value="syllabus" className="pt-4">
          <SectionHeading title="Coverage by subject" />
          <Panel>
            {data.subjects.slice(0, 8).map((s) => (
              <div key={s.id} className="p-3.5">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-medium">{s.name}</span>
                  <span className="font-mono text-muted-foreground">{syllabusProgress(s.id)}%</span>
                </div>
                <div className="mt-2">
                  <Meter value={syllabusProgress(s.id)} />
                </div>
              </div>
            ))}
          </Panel>
        </TabsContent>
      </Tabs>
    </div>
  );
}
