import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PLANS } from "@/lib/entitlements";
import { useApp } from "@/lib/app-state";
import { ActionButton, PageTitle, Panel, Pill } from "@/components/app/ui";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STEPS = ["School profile", "Academic setup", "Invite staff", "Choose plan"];

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Set up your school — Almanac" },
      { name: "description", content: "Guided setup: school profile, sessions and terms, staff invitations and plan selection." },
      { property: "og:title", content: "Set up your school — Almanac" },
      { property: "og:description", content: "Guided setup: profile, sessions, staff invitations and plan selection." },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const router = useRouter();
  const { tenant } = useApp();
  const [step, setStep] = useState(0);
  const [name, setName] = useState(tenant.name);
  const [city, setCity] = useState(tenant.city);
  const [emails, setEmails] = useState("principal@greenfieldschool.edu.ng\nbursar@greenfieldschool.edu.ng");
  const [plan, setPlan] = useState(tenant.plan);

  return (
    <div className="fade-rise mx-auto max-w-2xl space-y-5">
      <PageTitle eyebrow={`Step ${step + 1} of 4`} title="Set up your school" subtitle="You can change any of this later in Settings." />
      <div className="flex flex-wrap gap-2">
        {STEPS.map((s, i) => (
          <Pill key={s} tone={i === step ? "clay" : i < step ? "moss" : "mist"}>{s}</Pill>
        ))}
      </div>

      <Panel className="space-y-4 p-5">
        {step === 0 ? (
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="n">School name</Label>
              <Input id="n" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="c">City</Label>
              <Input id="c" value={city} onChange={(e) => setCity(e.target.value)} maxLength={60} />
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="s">Current session</Label>
              <Input id="s" defaultValue="2026/2027" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="t">Terms per session</Label>
              <Input id="t" defaultValue="3" />
            </div>
            <p className="text-[13px] text-muted-foreground">
              Assessment weighting defaults to CA1 10%, CA2 10%, Assignment 10% and Exam 70%.
            </p>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-1.5">
            <Label htmlFor="e">Invite staff by email</Label>
            <textarea id="e" rows={5} value={emails} onChange={(e) => setEmails(e.target.value)} className="rounded-md bg-card p-3 text-sm ring-1 ring-foreground/10" />
            <p className="text-[13px] text-muted-foreground">One email per line. Each person picks a role when they accept.</p>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-3">
            {PLANS.map((p) => (
              <button key={p.id} onClick={() => setPlan(p.id)} className={`rounded-lg p-4 text-left ring-1 transition-colors ${plan === p.id ? "bg-panel text-panel-foreground ring-transparent" : "ring-foreground/10 hover:bg-foreground/5"}`}>
                <div className="flex items-center justify-between">
                  <p className="font-display text-[17px] font-medium">{p.name}</p>
                  <span className="font-mono text-[12px]">{p.price}</span>
                </div>
                <p className="mt-1 text-[13px] opacity-80">{p.blurb}</p>
              </button>
            ))}
          </div>
        ) : null}
      </Panel>

      <div className="flex gap-2">
        {step > 0 ? <ActionButton variant="outline" onClick={() => setStep(step - 1)}>Back</ActionButton> : null}
        <ActionButton
          onClick={() => {
            if (step === 0 && !name.trim()) {
              toast.error("Your school needs a name");
              return;
            }
            if (step < 3) {
              setStep(step + 1);
              return;
            }
            toast.success("School set up", { description: `${name} is on the ${plan} plan.` });
            router.navigate({ to: "/" });
          }}
        >
          {step < 3 ? "Continue" : "Finish setup"}
        </ActionButton>
      </div>
    </div>
  );
}
