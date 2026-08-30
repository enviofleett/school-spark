import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "@/lib/app-state";
import { ActionButton, EmptyState, PageTitle, Panel, Pill } from "@/components/app/ui";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/parent/messages")({
  head: () => ({
    meta: [
      { title: "Messages — Almanac" },
      { name: "description", content: "Messages from teachers and the school office, and your replies." },
      { property: "og:title", content: "Messages — Almanac" },
      { property: "og:description", content: "Messages from teachers and the school office, and your replies." },
    ],
  }),
  component: ParentMessages,
});

function ParentMessages() {
  const { messages, addMessage, currentUserName } = useApp();
  const [reply, setReply] = useState("");
  const inbox = messages.filter((m) => m.state === "sent");

  return (
    <div className="fade-rise space-y-5">
      <PageTitle eyebrow="Parent portal" title="Messages" subtitle="Everything the school has sent you, newest first." />
      {inbox.length === 0 ? (
        <EmptyState title="No messages yet" body="When the school or a teacher writes to you, it will appear here." />
      ) : (
        <Panel>
          {inbox.map((m) => (
            <div key={m.id} className="p-3.5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[13px] font-medium">{m.subject}</p>
                <Pill tone="mist">{m.channel}</Pill>
                <span className="ml-auto font-mono text-[11px] text-muted-foreground">{m.time}</span>
              </div>
              <p className="mt-1 text-[13px] text-muted-foreground">{m.body}</p>
              <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">From {m.from} · {m.fromRole}</p>
            </div>
          ))}
        </Panel>
      )}

      <Panel className="space-y-3 p-4">
        <p className="label-mono">Reply to the school office</p>
        <Textarea rows={4} value={reply} maxLength={1000} onChange={(e) => setReply(e.target.value)} placeholder="Write a message…" />
        <ActionButton
          onClick={() => {
            if (!reply.trim()) {
              toast.error("Write something first");
              return;
            }
            addMessage({ from: currentUserName, fromRole: "Parent", audience: "School office", channel: "In-app", subject: "Reply from guardian", body: reply.trim(), time: "Just now", state: "sent", delivered: 1, read: 0 });
            setReply("");
            toast.success("Message sent to the school office");
          }}
        >
          Send reply
        </ActionButton>
      </Panel>
    </div>
  );
}
