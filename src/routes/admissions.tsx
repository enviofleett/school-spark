import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ActionButton, FeatureGate, PageTitle, Panel, Pill, StatRegister } from "@/components/app/ui";

const APPLICANTS = [
  { name: "Zainab Adeyemi", stage: "Interview booked", forClass: "Primary 1 Alpha", date: "24 Jun" },
  { name: "Kelechi Nwankwo", stage: "Documents pending", forClass: "Primary 3 Beta", date: "23 Jun" },
  { name: "Ifeoma Chukwu", stage: "Offer sent", forClass: "JSS 1 Alpha", date: "21 Jun" },
  { name: "Samuel Ogunleye", stage: "New application", forClass: "Primary 2 Alpha", date: "20 Jun" },
];

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Almanac" },
      { name: "description", content: "Track applicants from enquiry through interview, offer and enrolment." },
      { property: "og:title", content: "Admissions — Almanac" },
      { property: "og:description", content: "Track applicants from enquiry through interview, offer and enrolment." },
    ],
  }),
  component: AdmissionsPage,
});

function AdmissionsPage() {
  return (
    <div className="fade-rise space-y-5">
      <PageTitle eyebrow="Add-on module" title="Admissions" subtitle="Applicants move through enquiry, interview, offer and enrolment — enrolled applicants become permanent student records." />
      <FeatureGate feature="admissions" headline="Run admissions inside Almanac" body="Capture enquiries, schedule interviews, send offers and convert accepted applicants straight into student records.">
        <>
          <StatRegister
            items={[
              { label: "Open applications", value: "38" },
              { label: "Interviews this week", value: "9" },
              { label: "Offers sent", value: "14", tone: "moss" },
              { label: "Awaiting documents", value: "6", tone: "amber" },
            ]}
          />
          <Panel>
            {APPLICANTS.map((a) => (
              <div key={a.name} className="flex items-center gap-3 p-3.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">{a.name}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{a.forClass} · applied {a.date}</p>
                </div>
                <Pill tone={a.stage === "Offer sent" ? "moss" : a.stage === "Documents pending" ? "amber" : "mist"}>{a.stage}</Pill>
                <ActionButton variant="ghost" onClick={() => toast.success(`${a.name} moved to the next stage`)}>Advance</ActionButton>
              </div>
            ))}
          </Panel>
        </>
      </FeatureGate>
    </div>
  );
}
