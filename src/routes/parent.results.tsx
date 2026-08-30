import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CURRENT_TERM, demo, scoresFor } from "@/lib/demo/data";
import { useApp } from "@/lib/app-state";
import { Meter, PageTitle, Panel } from "@/components/app/ui";

export const Route = createFileRoute("/parent/results")({
  head: () => ({
    meta: [
      { title: "Child results — Almanac" },
      { name: "description", content: "Subject-by-subject scores and grades for the current term." },
      { property: "og:title", content: "Child results — Almanac" },
      { property: "og:description", content: "Subject-by-subject scores and grades for the current term." },
    ],
  }),
  component: ParentResults,
});

function ParentResults() {
  const data = demo();
  const { parentChildren } = useApp();
  const [childId, setChildId] = useState(parentChildren[0]!.id);
  const child = parentChildren.find((c) => c.id === childId)!;
  const rows = data.subjects.slice(0, 8).map((s) => ({ s, ...scoresFor(child.id, s.id) }));

  return (
    <div className="fade-rise space-y-5">
      <PageTitle eyebrow={`${CURRENT_TERM} results`} title="Results" subtitle="Only results approved by the school are shown here." />
      <div className="flex gap-2">
        {parentChildren.map((c) => (
          <button key={c.id} onClick={() => setChildId(c.id)} className={`rounded-full px-3.5 py-2 text-[13px] font-medium ring-1 ${childId === c.id ? "bg-panel text-panel-foreground ring-transparent" : "bg-card ring-foreground/10"}`}>
            {c.firstName}
          </button>
        ))}
      </div>
      <Panel>
        {rows.map((r) => (
          <div key={r.s.id} className="p-3.5">
            <div className="flex items-center justify-between text-[13px]">
              <span className="font-medium">{r.s.name}</span>
              <span className="font-mono text-muted-foreground">{r.total}% · {r.grade}</span>
            </div>
            <div className="mt-2"><Meter value={r.total} tone={r.total >= 70 ? "moss" : r.total >= 50 ? "clay" : "amber"} /></div>
          </div>
        ))}
      </Panel>
    </div>
  );
}
