import { createFileRoute, Link } from "@tanstack/react-router";
import { classStudents, demo } from "@/lib/demo/data";
import { PageTitle, Panel, Pill, SectionHeading } from "@/components/app/ui";

export const Route = createFileRoute("/classes/")({
  head: () => ({
    meta: [
      { title: "Classes — Almanac" },
      { name: "description", content: "Every class and section, with class teachers, rooms and enrolment counts." },
      { property: "og:title", content: "Classes — Almanac" },
      { property: "og:description", content: "Every class and section, with class teachers, rooms and enrolment counts." },
    ],
  }),
  component: ClassesPage,
});

function ClassesPage() {
  const data = demo();
  const stages = ["Primary", "Secondary"] as const;

  return (
    <div className="fade-rise space-y-6">
      <PageTitle
        eyebrow="Structure"
        title="Classes & sections"
        subtitle={`${data.classes.length} sections across primary and secondary levels for the current session.`}
      />
      {stages.map((stage) => {
        const rows = data.classes.filter((c) => c.stage === stage);
        return (
          <section key={stage}>
            <SectionHeading title={stage} />
            <Panel>
              {rows.map((c) => {
                const count = classStudents(c.id).length;
                return (
                  <Link key={c.id} to="/classes/$classId" params={{ classId: c.id }} className="flex items-center gap-3 p-3.5 hover:bg-foreground/[0.04]">
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-medium">{c.name}</p>
                      <p className="font-mono text-[11px] text-muted-foreground">
                        {c.room} · {data.teachers.find((t) => t.id === c.teacherId)?.name}
                      </p>
                    </div>
                    <span className="font-mono text-[12px] text-muted-foreground">
                      {count}/{c.capacity}
                    </span>
                    <Pill tone={count >= c.capacity ? "amber" : "moss"}>{count >= c.capacity ? "Full" : "Open"}</Pill>
                  </Link>
                );
              })}
            </Panel>
          </section>
        );
      })}
    </div>
  );
}
