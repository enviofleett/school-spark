import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { FEATURES, PLANS } from "@/lib/entitlements";
import { useApp } from "@/lib/app-state";
import { ActionButton, PageTitle, Panel, Pill } from "@/components/app/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CURRENT_SESSION, SESSIONS, TERMS, ASSESSMENT_SCHEME, demo } from "@/lib/demo/data";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Almanac" },
      { name: "description", content: "School profile, branding, custom domain, subscription, users, grading and integrations." },
      { property: "og:title", content: "Settings — Almanac" },
      { property: "og:description", content: "School profile, branding, custom domain, subscription, users and grading." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { tenant, features } = useApp();
  const data = demo();

  return (
    <div className="fade-rise space-y-5">
      <PageTitle eyebrow="Administration" title="Settings" subtitle={`${tenant.name} · ${tenant.plan} plan · ${tenant.status}`} />
      <Tabs defaultValue="school">
        <TabsList className="no-scrollbar w-full justify-start overflow-x-auto bg-parch">
          {["school", "branding", "domain", "subscription", "users", "grading", "integrations"].map((t) => (
            <TabsTrigger key={t} value={t} className="capitalize">{t}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="school" className="pt-4">
          <Panel className="space-y-3 p-5">
            <div className="grid gap-1.5">
              <Label htmlFor="sn">School name</Label>
              <Input id="sn" defaultValue={tenant.name} maxLength={100} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="sc">City</Label>
              <Input id="sc" defaultValue={tenant.city} maxLength={60} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="ss">Current session</Label>
              <select id="ss" defaultValue={CURRENT_SESSION} className="rounded-md bg-card px-3 py-2 text-sm ring-1 ring-foreground/10">
                {SESSIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <ActionButton onClick={() => toast.success("School profile saved")}>Save changes</ActionButton>
          </Panel>
        </TabsContent>

        <TabsContent value="branding" className="pt-4">
          <Panel className="space-y-4 p-5">
            <div className="flex items-center gap-3">
              <div className="grid size-14 place-items-center rounded-xl bg-panel font-display text-[22px] text-panel-foreground">{tenant.initial}</div>
              <ActionButton variant="outline" onClick={() => toast("Logo upload opened")}>Replace logo</ActionButton>
            </div>
            <div>
              <p className="label-mono">Accent colour</p>
              <div className="mt-2 flex gap-2">
                {["bg-clay", "bg-moss", "bg-amber", "bg-panel"].map((c) => (
                  <button key={c} onClick={() => toast.success("Accent updated")} className={`size-8 rounded-full ${c} ring-1 ring-foreground/10`} aria-label={c} />
                ))}
              </div>
            </div>
            <p className="text-[13px] text-muted-foreground">Branding applies to the parent portal, report cards and all outgoing email.</p>
          </Panel>
        </TabsContent>

        <TabsContent value="domain" className="pt-4">
          <Panel>
            <div className="flex items-center justify-between gap-3 p-3.5">
              <div>
                <p className="text-[13px] font-medium">{tenant.domain}</p>
                <p className="font-mono text-[11px] text-muted-foreground">Custom domain</p>
              </div>
              <Pill tone={tenant.domainStatus === "connected" ? "moss" : "amber"}>{tenant.domainStatus}</Pill>
            </div>
            <div className="flex items-center justify-between gap-3 p-3.5">
              <div>
                <p className="text-[13px] font-medium">{tenant.fallbackDomain}</p>
                <p className="font-mono text-[11px] text-muted-foreground">Fallback subdomain · always available</p>
              </div>
              <Pill tone="mist">active</Pill>
            </div>
            <div className="space-y-3 p-3.5">
              <p className="label-mono">DNS records</p>
              {[["CNAME", "portal", "edge.almanac.school"], ["TXT", "_almanac", "verify=gf-2f81a4"]].map(([type, host, value]) => (
                <div key={host} className="flex flex-wrap items-center gap-3 rounded-lg bg-card px-3 py-2 font-mono text-[11px] ring-1 ring-foreground/10">
                  <span className="text-muted-foreground">{type}</span>
                  <span>{host}</span>
                  <span className="ml-auto truncate">{value}</span>
                </div>
              ))}
              <ActionButton onClick={() => toast.success("DNS verified", { description: "Certificate issued for " + tenant.domain })}>Re-check DNS</ActionButton>
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="subscription" className="space-y-3 pt-4">
          <div className="grid gap-3 md:grid-cols-3">
            {PLANS.map((p) => (
              <Panel key={p.id} className={`p-5 ${p.id === tenant.plan ? "ring-2 ring-clay" : ""}`}>
                <p className="font-display text-[18px] font-medium">{p.name}</p>
                <p className="mt-1 font-mono text-[13px] text-muted-foreground">{p.price}</p>
                <p className="mt-2 text-[13px] text-muted-foreground">{p.blurb}</p>
                <div className="mt-4">
                  {p.id === tenant.plan ? (
                    <Pill tone="moss">Current plan</Pill>
                  ) : (
                    <ActionButton variant="outline" onClick={() => toast.success(`Switched to ${p.name}`)}>Choose {p.name}</ActionButton>
                  )}
                </div>
              </Panel>
            ))}
          </div>
          <Panel>
            {FEATURES.map((f) => (
              <div key={f.id} className="flex items-center justify-between gap-3 p-3">
                <div>
                  <p className="text-[13px] font-medium">{f.label}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{f.group}</p>
                </div>
                <Pill tone={features.includes(f.id) ? "moss" : "mist"}>{features.includes(f.id) ? "Included" : "Not in plan"}</Pill>
              </div>
            ))}
          </Panel>
        </TabsContent>

        <TabsContent value="users" className="pt-4">
          <Panel>
            {data.teachers.slice(0, 8).map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3 p-3.5">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium">{t.name}</p>
                  <p className="truncate font-mono text-[11px] text-muted-foreground">{t.email}</p>
                </div>
                <Pill tone="mist">{t.role}</Pill>
              </div>
            ))}
          </Panel>
        </TabsContent>

        <TabsContent value="grading" className="pt-4">
          <Panel>
            {ASSESSMENT_SCHEME.map((a) => (
              <div key={a.key} className="flex items-center justify-between p-3.5">
                <span className="text-[13px]">{a.label}</span>
                <span className="font-mono text-[13px]">{a.weight}%</span>
              </div>
            ))}
            <div className="flex items-center justify-between p-3.5">
              <span className="text-[13px]">Terms per session</span>
              <span className="font-mono text-[13px]">{TERMS.length}</span>
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="integrations" className="pt-4">
          <Panel>
            {[["WhatsApp Business", "connected"], ["Email (SMTP)", "connected"], ["Paystack", "not connected"], ["Google Workspace", "not connected"]].map(([n, s]) => (
              <div key={n} className="flex items-center justify-between p-3.5">
                <span className="text-[13px] font-medium">{n}</span>
                <Pill tone={s === "connected" ? "moss" : "mist"}>{s}</Pill>
              </div>
            ))}
          </Panel>
        </TabsContent>
      </Tabs>
    </div>
  );
}
