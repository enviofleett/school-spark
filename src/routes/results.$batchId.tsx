import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { classStudents, demo, gradeFor, scoresFor, type ResultStatus } from "@/lib/demo/data";
import { useApp } from "@/lib/app-state";
import { ActionButton, Panel, Pill } from "@/components/app/ui";

export const Route = createFileRoute("/results/$batchId")({
  head: () => ({
    meta: [
      { title: "Score entry — Almanac" },
      { name: "description", content: "Enter continuous assessment and exam scores, then submit the batch for approval." },
      { property: "og:title", content: "Score entry — Almanac" },
      { property: "og:description", content: "Enter continuous assessment and exam scores, then submit the batch for approval." },
    ],
  }),
  component: BatchPage,
});

function BatchPage() {
  const { batchId } = Route.useParams();
  const router = useRouter();
  const data = demo();
  const { resultOverrides, setResultStatus, role } = useApp();
  const batch = data.results.find((r) => r.id === batchId);
  if (!batch) throw notFound();

  const status: ResultStatus = resultOverrides[batch.id] ?? batch.status;
  const locked = status === "approved" || status === "published";
  const subject = data.subjects.find((s) => s.id === batch.subjectId);
  const cls = data.classes.find((c) => c.id === batch.classSectionId);
  const roster = classStudents(batch.classSectionId).slice(0, 18);
  const [edits, setEdits] = useState<Record<string, number>>({});

  return (
    <div className="fade-rise space-y-5 pt-5">
      <div className="rounded-xl bg-panel p-5 text-panel-foreground ring-1 ring-black/25">
        <p className="label-mono text-mist">{batch.term} · score entry</p>
        <h1 className="mt-1 font-display text-[26px] font-semibold">
          {subject?.name} · {cls?.name}
        </h1>
        <p className="mt-1 font-mono text-[12px] text-mist">
          {data.teachers.find((t) => t.id === batch.teacherId)?.name} · last updated {batch.updated}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
          <Pill tone={locked ? "moss" : status === "review" ? "amber" : "clay"}>{status}</Pill>
          {locked ? (
            <span className="font-mono text-[11px] text-mist">Locked — approved results cannot be edited</span>
          ) : (
            <>
              <ActionButton
                onClick={() => {
                  setResultStatus(batch.id, "submitted");
                  toast.success("Submitted for review");
                  router.invalidate();
                }}
              >
                Submit for review
              </ActionButton>
              {role === "school_admin" ? (
                <button
                  onClick={() => {
                    setResultStatus(batch.id, "approved");
                    toast.success("Batch approved and locked");
                  }}
                  className="rounded-full px-3.5 py-2 text-[13px] font-medium ring-1 ring-white/15"
                >
                  Approve & lock
                </button>
              ) : null}
            </>
          )}
        </div>
      </div>

      <Panel className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-[13px]">
          <thead className="bg-foreground/5 text-left font-mono text-[11px] uppercase">
            <tr>
              {["Student", "CA1 /10", "CA2 /10", "Assign /10", "Exam /70", "Total", "Grade"].map((h) => (
                <th key={h} className="p-3 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roster.map((s) => {
              const base = scoresFor(s.id, batch.subjectId, batch.term);
              const exam = edits[s.id] ?? base.exam;
              const total = base.ca1 + base.ca2 + base.assignment + exam;
              return (
                <tr key={s.id} className="border-t border-foreground/5">
                  <td className="p-3 font-medium">{s.name}</td>
                  <td className="p-3 font-mono">{base.ca1}</td>
                  <td className="p-3 font-mono">{base.ca2}</td>
                  <td className="p-3 font-mono">{base.assignment}</td>
                  <td className="p-2">
                    <input
                      type="number"
                      min={0}
                      max={70}
                      value={exam}
                      disabled={locked}
                      onChange={(e) => {
                        const v = Math.max(0, Math.min(70, Number(e.target.value) || 0));
                        setEdits((p) => ({ ...p, [s.id]: v }));
                      }}
                      className="w-16 rounded-md bg-card px-2 py-1 text-right font-mono text-[12px] ring-1 ring-foreground/10 disabled:opacity-50"
                    />
                  </td>
                  <td className="p-3 font-mono">{total}</td>
                  <td className="p-3">
                    <Pill tone={total >= 65 ? "moss" : total >= 45 ? "clay" : "amber"}>{gradeFor(total).grade}</Pill>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
