import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { classStudents, demo } from "@/lib/demo/data";
import { ActionButton, Avatar, Panel, Pill, toneFromName } from "@/components/app/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/teacher/class/$classId")({
  head: () => ({
    meta: [
      { title: "Class session — Almanac" },
      { name: "description", content: "Take the register, log the lesson taught and review the roster for this class." },
      { property: "og:title", content: "Class session — Almanac" },
      { property: "og:description", content: "Take the register, log the lesson taught and review the roster." },
    ],
  }),
  component: TeacherClassDetail,
});

function TeacherClassDetail() {
  const { classId } = Route.useParams();
  const data = demo();
  const cls = data.classes.find((c) => c.id === classId);
  if (!cls) throw notFound();
  const roster = classStudents(cls.id).slice(0, 20);
  const [absent, setAbsent] = useState<Record<string, boolean>>({});
  const [topic, setTopic] = useState("");

  return (
    <div className="fade-rise space-y-5 pt-5">
      <div className="rounded-xl bg-panel p-5 text-panel-foreground ring-1 ring-black/25">
        <p className="label-mono text-mist">{data.today}</p>
        <h1 className="mt-1 font-display text-[24px] font-semibold">{cls.name}</h1>
        <p className="mt-1 font-mono text-[12px] text-mist">{cls.room} · {roster.length} students</p>
      </div>

      <Tabs defaultValue="register">
        <TabsList className="bg-parch">
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="lesson">Log lesson</TabsTrigger>
        </TabsList>

        <TabsContent value="register" className="space-y-3 pt-4">
          <Panel>
            {roster.map((s) => (
              <button
                key={s.id}
                onClick={() => setAbsent((p) => ({ ...p, [s.id]: !p[s.id] }))}
                className="flex w-full items-center gap-3 p-3 text-left hover:bg-foreground/[0.04]"
              >
                <Avatar name={s.name} tone={toneFromName(s.name)} size={34} />
                <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{s.name}</span>
                <Pill tone={absent[s.id] ? "amber" : "moss"}>{absent[s.id] ? "Absent" : "Present"}</Pill>
              </button>
            ))}
          </Panel>
          <ActionButton
            onClick={() => {
              const n = Object.values(absent).filter(Boolean).length;
              toast.success("Register submitted", { description: `${roster.length - n} present · ${n} absent` });
            }}
          >
            Submit register
          </ActionButton>
        </TabsContent>

        <TabsContent value="lesson" className="space-y-3 pt-4">
          <Panel className="space-y-3 p-5">
            <div className="grid gap-1.5">
              <Label htmlFor="tp">Topic taught</Label>
              <Input id="tp" value={topic} maxLength={120} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Adding fractions with unlike denominators" />
            </div>
            <ActionButton
              onClick={() => {
                if (!topic.trim()) return toast.error("Add the topic you taught");
                toast.success("Lesson logged", { description: `${topic.trim()} · ${cls.name}` });
                setTopic("");
              }}
            >
              Log lesson
            </ActionButton>
          </Panel>
        </TabsContent>
      </Tabs>
    </div>
  );
}
