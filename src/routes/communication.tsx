import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "@/lib/app-state";
import { ActionButton, EmptyState, FeatureGate, PageTitle, Panel, Pill } from "@/components/app/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/communication")({
  head: () => ({
    meta: [
      { title: "Communication — Almanac" },
      { name: "description", content: "Broadcasts and direct messages to parents and staff across in-app, email and WhatsApp." },
      { property: "og:title", content: "Communication — Almanac" },
      { property: "og:description", content: "Broadcasts and direct messages to parents and staff." },
    ],
  }),
  component: CommunicationPage,
});

function CommunicationPage() {
  const { messages } = useApp();

  return (
    <div className="fade-rise space-y-5">
      <PageTitle
        eyebrow="Communication centre"
        title="Messages & broadcasts"
        subtitle="Reach every guardian, one class, or a single family — and see what was delivered and read."
        actions={<ComposeDialog />}
      />
      <FeatureGate
        feature="communication"
        headline="Send broadcasts from inside Almanac"
        body="Message every guardian, a single class, or one family across in-app, email and WhatsApp, with delivery and read receipts."
      >
        <Tabs defaultValue="sent">
          <TabsList className="bg-parch">
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>
          {(["sent", "scheduled", "draft"] as const).map((state) => {
            const rows = messages.filter((m) => m.state === state);
            return (
              <TabsContent key={state} value={state} className="pt-4">
                {rows.length === 0 ? (
                  <EmptyState title={`No ${state} messages`} body="Compose a message to reach guardians and staff — it will show up here." />
                ) : (
                  <Panel>
                    {rows.map((m) => (
                      <div key={m.id} className="p-3.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[13px] font-medium">{m.subject}</p>
                          <Pill tone={m.channel === "WhatsApp" ? "moss" : m.channel === "Email" ? "amber" : "mist"}>{m.channel}</Pill>
                          <span className="ml-auto font-mono text-[11px] text-muted-foreground">{m.time}</span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-[13px] text-muted-foreground">{m.body}</p>
                        <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">
                          {m.audience} · {m.delivered} delivered · {m.read} read
                        </p>
                      </div>
                    ))}
                  </Panel>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </FeatureGate>
    </div>
  );
}

function ComposeDialog() {
  const { addMessage, currentUserName } = useApp();
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("All parents");
  const [channel, setChannel] = useState<"In-app" | "Email" | "WhatsApp">("In-app");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded-full bg-clay px-3.5 py-2 text-[13px] font-medium text-panel">Compose</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display">New message</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="aud">Audience</Label>
            <select id="aud" value={audience} onChange={(e) => setAudience(e.target.value)} className="rounded-md bg-card px-3 py-2 text-sm ring-1 ring-foreground/10">
              {["All parents", "All staff", "Primary parents", "Secondary parents", "Class teachers"].map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ch">Channel</Label>
            <select id="ch" value={channel} onChange={(e) => setChannel(e.target.value as typeof channel)} className="rounded-md bg-card px-3 py-2 text-sm ring-1 ring-foreground/10">
              <option>In-app</option>
              <option>Email</option>
              <option>WhatsApp</option>
            </select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="sub">Subject</Label>
            <Input id="sub" value={subject} maxLength={120} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="bod">Message</Label>
            <Textarea id="bod" rows={5} value={body} maxLength={1000} onChange={(e) => setBody(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <ActionButton
            variant="outline"
            onClick={() => {
              if (!subject.trim()) return toast.error("Add a subject before saving");
              addMessage({ from: currentUserName, fromRole: "School Administrator", audience, channel, subject: subject.trim(), body: body.trim(), time: "Saved just now", state: "draft", delivered: 0, read: 0 });
              setOpen(false);
              toast("Draft saved");
            }}
          >
            Save draft
          </ActionButton>
          <ActionButton
            onClick={() => {
              if (!subject.trim() || !body.trim()) return toast.error("Subject and message are both required");
              addMessage({ from: currentUserName, fromRole: "School Administrator", audience, channel, subject: subject.trim(), body: body.trim(), time: "Just now", state: "sent", delivered: 412, read: 0 });
              setSubject("");
              setBody("");
              setOpen(false);
              toast.success(`Message sent to ${audience}`);
            }}
          >
            Send now
          </ActionButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
