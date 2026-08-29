import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ASSESSMENT_SCHEME, CURRENT_SESSION, CURRENT_TERM, classStudents, demo, scoresFor } from "@/lib/demo/data";
import { useApp } from "@/lib/app-state";
import { ActionButton, FeatureGate, PageTitle, Panel, Pill } from "@/components/app/ui";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Report cards — Almanac" },
      { name: "description", content: "Generate, preview and publish branded end-of-term report cards for any class." },
      { property: "og:title", content: "Report cards — Almanac" },
      { property: "og:description", content: "Generate, preview and publish branded end-of-term report cards." },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  const data = demo();
  const { tenant } = useApp();
  const [classId, setClassId] = useState(data.classes[0]!.id);
  const [published, setPublished] = useState(false);
  const roster = classStudents(classId);
  const sample = roster[0];
  const subjects = data.subjects.slice(0, 6);
  const results = sample ? subjects.map((s) => ({ s, ...scoresFor(sample.id, s.id) })) : [];
  const average = results.length ? Math.round(results.reduce((a, r) => a + r.total, 0) / results.length) : 0;

  return (
    <div className="fade-rise space-y-5">
      <PageTitle
        eyebrow={`${CURRENT_TERM} · ${CURRENT_SESSION}`}
        title="Report cards"
        subtitle="Report cards use your school branding and only include approved results."
        actions={
          <ActionButton
            onClick={() => {
              setPublished(true);
              toast.success(`Published ${roster.length} report cards`, { description: "Guardians were notified in the parent portal." });
            }}
          >
            Publish to parents
          </ActionButton>
        }
      />

      <FeatureGate feature="report_cards" headline="Branded report cards" body="Generate termly report cards with your logo, grading scheme and teacher comments, then publish them straight to guardians.">
        <>
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {data.classes.map((c) => (
              <button
                key={c.id}
                onClick={() => { setClassId(c.id); setPublished(false); }}
                className={`shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium ring-1 transition-colors ${classId === c.id ? "bg-panel text-panel-foreground ring-transparent" : "bg-card ring-foreground/10"}`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Pill tone={published ? "moss" : "amber"}>{published ? "Published" : "Ready to publish"}</Pill>
            <span className="font-mono text-[11px] text-muted-foreground">{roster.length} students in this class</span>
          </div>

          <div className="rounded-xl bg-card p-5 ring-1 ring-foreground/10 sm:p-8">
            <div className="flex items-center gap-3 border-b border-foreground/10 pb-4">
              <div className="grid size-11 place-items-center rounded-lg bg-panel font-display text-[18px] text-panel-foreground">{tenant.initial}</div>
              <div>
                <p className="font-display text-[18px] font-semibold">{tenant.name}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{tenant.domain} · {tenant.city}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="label-mono">Term report</p>
                <p className="font-mono text-[12px]">{CURRENT_TERM} · {CURRENT_SESSION}</p>
              </div>
            </div>

            <div className="grid gap-2 py-4 sm:grid-cols-3">
              {[["Student", sample?.name ?? "—"], ["Admission no.", sample?.admissionNo ?? "—"], ["Class", data.classes.find((c) => c.id === classId)?.name ?? "—"]].map(([k, v]) => (
                <div key={k}>
                  <p className="label-mono">{k}</p>
                  <p className="text-[14px] font-medium">{v}</p>
                </div>
              ))}
            </div>

            <table className="w-full text-[13px]">
              <thead className="border-y border-foreground/10 text-left font-mono text-[11px] uppercase">
                <tr>
                  {["Subject", "CA1", "CA2", "Assign.", "Exam", "Total", "Grade"].map((h) => (
                    <th key={h} className="py-2 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.s.id} className="border-b border-foreground/5">
                    <td className="py-2 font-medium">{r.s.name}</td>
                    <td className="py-2 font-mono">{r.ca1}</td>
                    <td className="py-2 font-mono">{r.ca2}</td>
                    <td className="py-2 font-mono">{r.assignment}</td>
                    <td className="py-2 font-mono">{r.exam}</td>
                    <td className="py-2 font-mono">{r.total}</td>
                    <td className="py-2 font-mono">{r.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="label-mono">Assessment scheme</p>
                <p className="font-mono text-[11px] text-muted-foreground">
                  {ASSESSMENT_SCHEME.map((a) => `${a.label} ${a.weight}%`).join(" · ")}
                </p>
              </div>
              <div className="text-right">
                <p className="label-mono">Term average</p>
                <p className="font-mono text-[24px]">{average}%</p>
              </div>
            </div>
          </div>
        </>
      </FeatureGate>
    </div>
  );
}
