import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CURRENT_TERM, demo, type ResultStatus } from "@/lib/demo/data";
import { useApp } from "@/lib/app-state";
import { EmptyState, PageTitle, Panel, Pill } from "@/components/app/ui";

const TONE: Record<ResultStatus, "clay" | "moss" | "amber" | "mist"> = {
  draft: "mist",
  submitted: "clay",
  review: "amber",
  approved: "moss",
  published: "moss",
};

export const Route = createFileRoute("/results/")({
  head: () => ({
    meta: [
      { title: "Results — Almanac" },
      { name: "description", content: "Score entry batches moving through submission, review, approval and publication." },
      { property: "og:title", content: "Results — Almanac" },
      { property: "og:description", content: "Score entry batches moving through submission, review, approval and publication." },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const data = demo();
  const { resultOverrides } = useApp();
  const [filter, setFilter] = useState<"all" | ResultStatus>("all");

  const rows = data.results
    .map((r) => ({ ...r, status: resultOverrides[r.id] ?? r.status }))
    .filter((r) => filter === "all" || r.status === filter);

  return (
    <div className="fade-rise space-y-5">
      <PageTitle eyebrow={`${CURRENT_TERM} · score entry`} title="Results" subtitle="Each batch is one subject for one class. Teachers submit, the principal approves, then results publish to parents." />

      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {(["all", "draft", "submitted", "review", "approved", "published"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium capitalize ring-1 transition-colors ${
              filter === f ? "bg-panel text-panel-foreground ring-transparent" : "bg-card ring-foreground/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <EmptyState title="Nothing in this state" body="Try another filter — batches move through draft, submitted, review, approved and published." />
      ) : (
        <Panel>
          {rows.map((r) => (
            <Link key={r.id} to="/results/$batchId" params={{ batchId: r.id }} className="flex items-center gap-3 p-3.5 hover:bg-foreground/[0.04]">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium">
                  {data.subjects.find((s) => s.id === r.subjectId)?.name} · {data.classes.find((c) => c.id === r.classSectionId)?.name}
                </p>
                <p className="truncate font-mono text-[11px] text-muted-foreground">
                  {data.teachers.find((t) => t.id === r.teacherId)?.name} · updated {r.updated}
                </p>
              </div>
              <Pill tone={TONE[r.status]}>{r.status}</Pill>
            </Link>
          ))}
        </Panel>
      )}
    </div>
  );
}
