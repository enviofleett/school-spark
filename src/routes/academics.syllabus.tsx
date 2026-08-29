import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { demo, syllabusProgress } from "@/lib/demo/data";
import { Meter, PageTitle, Panel, Pill } from "@/components/app/ui";

export const Route = createFileRoute("/academics/syllabus")({
  head: () => ({
    meta: [
      { title: "Syllabus — Almanac" },
      { name: "description", content: "Scheme of work by subject, unit and topic with live coverage tracking." },
      { property: "og:title", content: "Syllabus — Almanac" },
      { property: "og:description", content: "Scheme of work by subject, unit and topic with live coverage tracking." },
    ],
  }),
  component: SyllabusPage,
});

function SyllabusPage() {
  const data = demo();
  const first = data.subjects[0]!;
  const [subjectId, setSubjectId] = useState(first.id);
  const units = data.syllabus[subjectId] ?? [];

  return (
    <div className="fade-rise space-y-5">
      <PageTitle eyebrow="Academics" title="Syllabus" subtitle="Units and topics for the current session, with coverage as teachers record lessons." />
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {data.subjects.map((s) => (
          <button
            key={s.id}
            onClick={() => setSubjectId(s.id)}
            className={`shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium ring-1 transition-colors ${
              subjectId === s.id ? "bg-panel text-panel-foreground ring-transparent" : "bg-card ring-foreground/10"
            }`}
          >
            {s.short}
          </button>
        ))}
      </div>

      <Panel className="p-4">
        <div className="flex items-center justify-between text-[13px]">
          <span className="font-medium">{data.subjects.find((s) => s.id === subjectId)?.name} coverage</span>
          <span className="font-mono text-muted-foreground">{syllabusProgress(subjectId)}%</span>
        </div>
        <div className="mt-2">
          <Meter value={syllabusProgress(subjectId)} tone="moss" />
        </div>
      </Panel>

      <div className="space-y-4">
        {units.map((u) => (
          <section key={u.id}>
            <h2 className="mb-2 font-display text-[16px] font-medium">{u.name}</h2>
            <Panel>
              {u.topics.map((t) => (
                <div key={t.id} className="flex items-center justify-between gap-3 p-3.5">
                  <span className="text-[13px]">{t.name}</span>
                  <Pill tone={t.state === "done" ? "moss" : t.state === "active" ? "clay" : "mist"}>
                    {t.state === "done" ? "Covered" : t.state === "active" ? "In progress" : "Not started"}
                  </Pill>
                </div>
              ))}
            </Panel>
          </section>
        ))}
      </div>
    </div>
  );
}
