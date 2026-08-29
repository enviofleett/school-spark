import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { demo } from "@/lib/demo/data";
import { useApp } from "@/lib/app-state";
import { ActionButton, PageTitle, Panel, Pill } from "@/components/app/ui";

const SAMPLE = [
  ["Chiamaka Eze", "F", "2016-03-12", "Primary 4 Alpha", "Mrs. Eze", "0803 441 2290"],
  ["Tunde Bakare", "M", "2015-11-02", "Primary 5 Beta", "Mr. Bakare", "0805 220 8841"],
  ["Amina Yusuf", "F", "2017-07-21", "Primary 3 Alpha", "Mrs. Yusuf", "0812 776 1130"],
  ["Ebube Okonkwo", "M", "2014-01-09", "JSS 1 Alpha", "Mr. Okonkwo", "0809 553 7712"],
];

const STEPS = ["Upload file", "Map columns", "Review & fix", "Import"];

export const Route = createFileRoute("/import")({
  head: () => ({
    meta: [
      { title: "Import data — Almanac" },
      { name: "description", content: "Bring students, guardians and staff in from a spreadsheet with column mapping and validation." },
      { property: "og:title", content: "Import data — Almanac" },
      { property: "og:description", content: "Bring students, guardians and staff in from a spreadsheet with validation." },
    ],
  }),
  component: ImportPage,
});

function ImportPage() {
  const router = useRouter();
  const data = demo();
  const { registerImport, importedCount } = useApp();
  const [step, setStep] = useState(0);
  const [fileName, setFileName] = useState("");
  const [mapping, setMapping] = useState<Record<string, string>>({
    "Column A": "Full name",
    "Column B": "Gender",
    "Column C": "Date of birth",
    "Column D": "Class",
    "Column E": "Guardian name",
    "Column F": "Guardian phone",
  });

  return (
    <div className="fade-rise space-y-5">
      <PageTitle eyebrow="Setup" title="Import wizard" subtitle="Four steps: upload, map your columns, fix anything flagged, then import." />

      <div className="flex flex-wrap gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] ring-1 ${i === step ? "bg-panel text-panel-foreground ring-transparent" : i < step ? "bg-moss/10 ring-moss/25" : "ring-foreground/10"}`}>
            <span className="font-mono text-[11px]">{i + 1}</span>
            {s}
          </div>
        ))}
      </div>

      {step === 0 ? (
        <Panel className="p-8 text-center">
          <p className="font-display text-[19px] font-medium">Drop your spreadsheet here</p>
          <p className="mx-auto mt-1.5 max-w-[46ch] text-sm text-muted-foreground">CSV or XLSX up to 10MB. One row per student, with guardian details in the same row.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <ActionButton onClick={() => { setFileName("greenfield-students-2026.csv"); setStep(1); }}>Choose a file</ActionButton>
            <ActionButton variant="outline" onClick={() => toast("Template downloaded", { description: "almanac-student-template.csv" })}>Download template</ActionButton>
          </div>
        </Panel>
      ) : null}

      {step === 1 ? (
        <>
          <p className="font-mono text-[11px] text-muted-foreground">{fileName} · 128 rows detected</p>
          <Panel>
            {Object.entries(mapping).map(([col, field]) => (
              <div key={col} className="flex items-center justify-between gap-3 p-3.5">
                <span className="font-mono text-[12px] text-muted-foreground">{col}</span>
                <select
                  value={field}
                  onChange={(e) => setMapping((p) => ({ ...p, [col]: e.target.value }))}
                  className="rounded-md bg-card px-3 py-1.5 text-[13px] ring-1 ring-foreground/10"
                >
                  {["Full name", "Gender", "Date of birth", "Class", "Guardian name", "Guardian phone", "Admission number", "Ignore"].map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </div>
            ))}
          </Panel>
          <div className="flex gap-2">
            <ActionButton variant="outline" onClick={() => setStep(0)}>Back</ActionButton>
            <ActionButton onClick={() => setStep(2)}>Continue</ActionButton>
          </div>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="moss">124 rows ready</Pill>
            <Pill tone="amber">4 rows need attention</Pill>
          </div>
          <Panel className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-[13px]">
              <thead className="bg-foreground/5 text-left font-mono text-[11px] uppercase">
                <tr>{["Name", "Gender", "DOB", "Class", "Guardian", "Phone"].map((h) => <th key={h} className="p-3 font-normal">{h}</th>)}</tr>
              </thead>
              <tbody>
                {SAMPLE.map((r) => (
                  <tr key={r[0]} className="border-t border-foreground/5">
                    {r.map((cell, i) => <td key={i} className="p-3">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
          <div className="flex gap-2">
            <ActionButton variant="outline" onClick={() => setStep(1)}>Back</ActionButton>
            <ActionButton onClick={() => { registerImport(124); setStep(3); toast.success("124 students imported"); }}>Import 124 students</ActionButton>
          </div>
        </>
      ) : null}

      {step === 3 ? (
        <Panel className="p-8 text-center">
          <p className="font-display text-[20px] font-medium">Import complete</p>
          <p className="mx-auto mt-1.5 max-w-[46ch] text-sm text-muted-foreground">
            {importedCount} students added to {data.classes.length} classes. Guardians were created and linked automatically.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <ActionButton onClick={() => router.navigate({ to: "/students" })}>View students</ActionButton>
            <ActionButton variant="outline" onClick={() => setStep(0)}>Import another file</ActionButton>
          </div>
        </Panel>
      ) : null}
    </div>
  );
}
