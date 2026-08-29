import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { attendanceFor, classStudents, demo } from "@/lib/demo/data";
import { ActionButton, Avatar, EmptyState, PageTitle, Panel, Pill, StatRegister, toneFromName } from "@/components/app/ui";

type Mark = "present" | "absent" | "late" | "excused";

export const Route = createFileRoute("/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance — Almanac" },
      { name: "description", content: "Take daily attendance by class and review rates, lateness and absence alerts." },
      { property: "og:title", content: "Attendance — Almanac" },
      { property: "og:description", content: "Take daily attendance by class and review rates, lateness and absence alerts." },
    ],
  }),
  component: AttendancePage,
});

function AttendancePage() {
  const data = demo();
  const [classId, setClassId] = useState(data.classes[0]!.id);
  const [marks, setMarks] = useState<Record<string, Mark>>({});
  const [saved, setSaved] = useState(false);
  const roster = useMemo(() => classStudents(classId).slice(0, 24), [classId]);

  const counts = roster.reduce(
    (acc, s) => {
      const m = marks[s.id] ?? "present";
      acc[m] += 1;
      return acc;
    },
    { present: 0, absent: 0, late: 0, excused: 0 } as Record<Mark, number>,
  );

  return (
    <div className="fade-rise space-y-5">
      <PageTitle
        eyebrow="Daily register"
        title="Attendance"
        subtitle={`${data.today} · mark the register for a class, then submit it to the school record.`}
        actions={
          <ActionButton
            onClick={() => {
              setSaved(true);
              toast.success("Register submitted", { description: `${counts.present} present · ${counts.absent} absent` });
            }}
          >
            Submit register
          </ActionButton>
        }
      />

      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {data.classes.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setClassId(c.id);
              setMarks({});
              setSaved(false);
            }}
            className={`shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium ring-1 transition-colors ${
              classId === c.id ? "bg-panel text-panel-foreground ring-transparent" : "bg-card ring-foreground/10"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <StatRegister
        items={[
          { label: "Present", value: `${counts.present}` },
          { label: "Absent", value: `${counts.absent}`, tone: "amber" },
          { label: "Late", value: `${counts.late}`, tone: "amber" },
          { label: "Excused", value: `${counts.excused}`, tone: "mist" },
        ]}
      />

      {saved ? (
        <p className="rounded-xl bg-moss/10 px-4 py-3 text-[13px] text-foreground ring-1 ring-moss/25">
          Register saved for {data.classes.find((c) => c.id === classId)?.name}. Parents of absent students were notified.
        </p>
      ) : null}

      {roster.length === 0 ? (
        <EmptyState title="No students in this class yet" body="Add or import students to start taking attendance for this section." />
      ) : (
        <Panel>
          {roster.map((s) => {
            const mark = marks[s.id] ?? "present";
            return (
              <div key={s.id} className="flex flex-wrap items-center gap-3 p-3">
                <Avatar name={s.name} tone={toneFromName(s.name)} size={34} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">{s.name}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {s.admissionNo} · term rate {attendanceFor(s.id).rate}%
                  </p>
                </div>
                <div className="flex gap-1">
                  {(["present", "absent", "late", "excused"] as Mark[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMarks((p) => ({ ...p, [s.id]: m }))}
                      className={`rounded-full px-2.5 py-1 font-mono text-[11px] uppercase transition-colors ${
                        mark === m ? "bg-panel text-panel-foreground" : "text-muted-foreground ring-1 ring-foreground/10"
                      }`}
                    >
                      {m.slice(0, 1)}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </Panel>
      )}

      <section>
        <h2 className="mb-2 font-display text-[17px] font-medium">Absence alerts</h2>
        <Panel>
          {data.students
            .filter((s) => attendanceFor(s.id).rate < 80)
            .slice(0, 6)
            .map((s) => (
              <div key={s.id} className="flex items-center gap-3 p-3.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">{s.name}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{data.classes.find((c) => c.id === s.classSectionId)?.name}</p>
                </div>
                <Pill tone="amber">{attendanceFor(s.id).rate}% this term</Pill>
              </div>
            ))}
        </Panel>
      </section>
    </div>
  );
}
