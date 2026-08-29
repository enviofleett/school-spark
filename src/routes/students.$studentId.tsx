import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { attendanceFor, CURRENT_SESSION, demo, scoresFor } from "@/lib/demo/data";
import { useApp } from "@/lib/app-state";
import { ActionButton, Avatar, Meter, Panel, Pill, SectionHeading, toneFromName } from "@/components/app/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/students/$studentId")({
  head: () => ({
    meta: [
      { title: "Student profile — Almanac" },
      { name: "description", content: "A rich student profile: academics, attendance, results, guardians, health and a full academic timeline." },
      { property: "og:title", content: "Student profile — Almanac" },
      { property: "og:description", content: "A rich student profile with a permanent, year-by-year academic history." },
    ],
  }),
  component: StudentProfile,
});

function StudentProfile() {
  const { studentId } = Route.useParams();
  const data = demo();
  const { students, updateStudent, has } = useApp();
  const student = students.find((s) => s.id === studentId);
  if (!student) throw notFound();

  const cls = data.classes.find((c) => c.id === student.classSectionId);
  const parents = data.parents.filter((p) => student.parentIds.includes(p.id));
  const attendance = attendanceFor(student.id);
  const subjects = data.subjects.slice(0, 6);
  const results = subjects.map((s) => ({ subject: s, ...scoresFor(student.id, s.id) }));
  const average = Math.round(results.reduce((a, r) => a + r.total, 0) / results.length);
  const [openYear, setOpenYear] = useState(CURRENT_SESSION);

  return (
    <div className="fade-rise space-y-6 pt-5">
      <div className="overflow-hidden rounded-xl bg-panel text-panel-foreground ring-1 ring-black/25">
        <div className="flex flex-wrap items-center gap-4 p-5 sm:p-6">
          <Avatar name={student.name} tone={toneFromName(student.name)} size={64} />
          <div className="min-w-0">
            <h1 className="font-display text-[26px] leading-tight font-semibold">{student.name}</h1>
            <p className="mt-1 font-mono text-[12px] text-mist">
              {student.admissionNo} · {cls?.name} · {student.gender}, {student.age}
            </p>
          </div>
          <div className="ml-auto flex flex-wrap gap-2">
            <MessageParentDialog parentName={parents[0]?.name ?? "guardian"} studentName={student.firstName} />
            <Link to="/reports" className="rounded-full px-3.5 py-2 text-[13px] font-medium ring-1 ring-white/15">
              View report
            </Link>
            <EditStudentDialog
              initial={{ firstName: student.firstName, lastName: student.lastName }}
              onSave={(patch) => {
                updateStudent(student.id, { ...patch, name: `${patch.firstName} ${patch.lastName}` });
                toast.success("Student record updated");
              }}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="no-scrollbar w-full justify-start overflow-x-auto bg-parch">
          {["overview", "academic", "attendance", "results", "parents", "health", "history", "documents"].map((t) => (
            <TabsTrigger key={t} value={t} className="capitalize">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <Panel>
            {[
              ["Current class", cls?.name ?? "—"],
              ["Class teacher", data.teachers.find((t) => t.id === cls?.teacherId)?.name ?? "—"],
              ["Admission date", student.admittedOn],
              ["Date of birth", `${student.dob} (${student.age} yrs)`],
              ["Primary guardian", parents[0]?.name ?? "Not linked"],
              ["Emergency contact", parents[0]?.phone ?? "—"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 p-3.5">
                <span className="text-[13px] text-muted-foreground">{k}</span>
                <span className="text-[13px] font-medium">{v}</span>
              </div>
            ))}
          </Panel>
          <div className="grid gap-4 sm:grid-cols-3">
            <Panel className="p-4">
              <p className="label-mono">Term average</p>
              <p className="mt-1 font-mono text-[26px]">{average}%</p>
            </Panel>
            <Panel className="p-4">
              <p className="label-mono">Attendance</p>
              <p className="mt-1 font-mono text-[26px]">{attendance.rate}%</p>
            </Panel>
            <Panel className="p-4">
              <p className="label-mono">Sessions on record</p>
              <p className="mt-1 font-mono text-[26px]">{student.enrollments.length}</p>
            </Panel>
          </div>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4 pt-4">
          <SectionHeading title="Subject performance this term" />
          <Panel>
            {results.map((r) => (
              <div key={r.subject.id} className="p-3.5">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-medium">{r.subject.name}</span>
                  <span className="font-mono text-muted-foreground">
                    {r.total}% · {r.grade}
                  </span>
                </div>
                <div className="mt-2">
                  <Meter value={r.total} tone={r.total >= 70 ? "moss" : r.total >= 50 ? "clay" : "amber"} />
                </div>
              </div>
            ))}
          </Panel>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4 pt-4">
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              ["Present", attendance.present],
              ["Absent", attendance.absent],
              ["Late", attendance.late],
              ["Excused", attendance.excused],
            ].map(([k, v]) => (
              <Panel key={k as string} className="p-4">
                <p className="label-mono">{k}</p>
                <p className="mt-1 font-mono text-[24px]">{v}</p>
              </Panel>
            ))}
          </div>
          <Panel className="p-4">
            <p className="label-mono">Weekly trend · this term</p>
            <div className="mt-4 flex h-28 items-end gap-1.5">
              {Array.from({ length: 12 }).map((_, i) => {
                const h = 45 + ((attendance.rate + i * 7) % 55);
                return <div key={i} className="flex-1 rounded-t bg-clay/70" style={{ height: `${h}%` }} />;
              })}
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="results" className="space-y-4 pt-4">
          <Panel className="overflow-x-auto">
            <table className="w-full min-w-[540px] text-[13px]">
              <thead className="bg-foreground/5 text-left font-mono text-[11px] tracking-wide uppercase">
                <tr>
                  {["Subject", "CA1", "CA2", "Assign.", "Exam", "Total", "Grade"].map((h) => (
                    <th key={h} className="p-3 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.subject.id} className="border-t border-foreground/5">
                    <td className="p-3 font-medium">{r.subject.name}</td>
                    <td className="p-3 font-mono">{r.ca1}</td>
                    <td className="p-3 font-mono">{r.ca2}</td>
                    <td className="p-3 font-mono">{r.assignment}</td>
                    <td className="p-3 font-mono">{r.exam}</td>
                    <td className="p-3 font-mono">{r.total}</td>
                    <td className="p-3">
                      <Pill tone={r.total >= 65 ? "moss" : r.total >= 45 ? "clay" : "amber"}>{r.grade}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </TabsContent>

        <TabsContent value="parents" className="space-y-4 pt-4">
          <Panel>
            {parents.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">No guardian linked to this record yet.</div>
            ) : (
              parents.map((p) => (
                <div key={p.id} className="flex items-center gap-3 p-3.5">
                  <Avatar name={p.name} tone="amber" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium">{p.name}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {p.relation} · {p.phone}
                    </p>
                  </div>
                  <MessageParentDialog parentName={p.name} studentName={student.firstName} />
                </div>
              ))
            )}
          </Panel>
        </TabsContent>

        <TabsContent value="health" className="pt-4">
          <Panel>
            {[
              ["Blood group", student.health.bloodGroup],
              ["Genotype", student.health.genotype],
              ["Allergies", student.health.allergies],
              ["Medical notes", student.health.notes],
              ["Emergency contact", parents[0] ? `${parents[0].name} · ${parents[0].phone}` : "—"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 p-3.5">
                <span className="text-[13px] text-muted-foreground">{k}</span>
                <span className="text-[13px] font-medium">{v}</span>
              </div>
            ))}
          </Panel>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 pt-4">
          <p className="max-w-[60ch] text-sm text-muted-foreground">
            Promotion never creates a new student. Each session adds an enrollment to this same permanent record.
          </p>
          <div className="ml-1 space-y-4 border-l border-foreground/15 pl-5">
            {[...student.enrollments].reverse().map((e) => {
              const open = openYear === e.session;
              return (
                <div key={e.session} className="relative">
                  <span className="absolute top-1.5 -left-[27px] size-2.5 rounded-full bg-clay" />
                  <button onClick={() => setOpenYear(open ? "" : e.session)} className="text-left">
                    <p className="font-mono text-[12px] text-muted-foreground">{e.session}</p>
                    <p className="font-display text-[17px] font-medium">{e.className}</p>
                  </button>
                  {open ? (
                    <Panel className="mt-3">
                      <div className="grid grid-cols-3 divide-x divide-foreground/5">
                        {[
                          ["Average", `${e.average}%`],
                          ["Position", `${e.position}`],
                          ["Attendance", `${e.attendance}%`],
                        ].map(([k, v]) => (
                          <div key={k} className="p-3.5">
                            <p className="label-mono">{k}</p>
                            <p className="mt-1 font-mono text-[18px]">{v}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-3.5">
                        <p className="label-mono">Teacher comment</p>
                        <p className="mt-1 text-[13px]">{e.teacherComment}</p>
                      </div>
                      <div className="flex items-center justify-between p-3.5">
                        <span className="text-[13px] text-muted-foreground">Promotion status</span>
                        <Pill tone={e.promoted ? "moss" : "amber"}>{e.promoted ? "Promoted" : "In progress"}</Pill>
                      </div>
                    </Panel>
                  ) : null}
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="pt-4">
          <Panel>
            {["Birth certificate.pdf", "Previous school report.pdf", "Immunisation record.pdf"].map((d) => (
              <div key={d} className="flex items-center justify-between p-3.5">
                <span className="text-[13px]">{d}</span>
                <button onClick={() => toast("Preview opened", { description: d })} className="font-mono text-[11px] text-clay">
                  Preview
                </button>
              </div>
            ))}
          </Panel>
        </TabsContent>
      </Tabs>

      {has("parent_portal") ? null : (
        <p className="text-[13px] text-muted-foreground">
          Parents cannot see this profile on your current plan.{" "}
          <Link to="/settings" className="text-clay">
            Compare plans
          </Link>
        </p>
      )}
    </div>
  );
}

function MessageParentDialog({ parentName, studentName }: { parentName: string; studentName: string }) {
  const { addMessage } = useApp();
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded-full bg-clay px-3.5 py-2 text-[13px] font-medium text-panel">Message parent</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display">Message {parentName}</DialogTitle>
        </DialogHeader>
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          placeholder={`A quick note about ${studentName}…`}
          maxLength={1000}
        />
        <DialogFooter>
          <ActionButton
            onClick={() => {
              if (!body.trim()) {
                toast.error("Write a short message first", { description: "Empty messages are not sent to guardians." });
                return;
              }
              addMessage({
                from: "Adaeze Nwosu",
                fromRole: "School Administrator",
                audience: parentName,
                channel: "In-app",
                subject: `About ${studentName}`,
                body: body.trim(),
                time: "Just now",
                state: "sent",
                delivered: 1,
                read: 0,
              });
              setBody("");
              setOpen(false);
              toast.success(`Message sent to ${parentName}`);
            }}
          >
            Send message
          </ActionButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditStudentDialog({
  initial,
  onSave,
}: {
  initial: { firstName: string; lastName: string };
  onSave: (patch: { firstName: string; lastName: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState(initial.firstName);
  const [lastName, setLastName] = useState(initial.lastName);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded-full px-3.5 py-2 text-[13px] font-medium ring-1 ring-white/15">Edit student</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display">Edit student</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="fn">First name</Label>
            <Input id="fn" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ln">Surname</Label>
            <Input id="ln" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <ActionButton
            onClick={() => {
              if (!firstName.trim() || !lastName.trim()) {
                toast.error("Both names are required");
                return;
              }
              onSave({ firstName: firstName.trim(), lastName: lastName.trim() });
              setOpen(false);
            }}
          >
            Save changes
          </ActionButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
