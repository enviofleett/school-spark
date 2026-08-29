import { createFileRoute } from "@tanstack/react-router";
import { demo } from "@/lib/demo/data";
import { EmptyState, PageTitle, Panel, Pill } from "@/components/app/ui";

export const Route = createFileRoute("/academics/lessons")({
  head: () => ({
    meta: [
      { title: "Lessons — Almanac" },
      { name: "description", content: "Lesson records logged by teachers across classes and subjects this term." },
      { property: "og:title", content: "Lessons — Almanac" },
      { property: "og:description", content: "Lesson records logged by teachers across classes and subjects this term." },
    ],
  }),
  component: LessonsPage,
});

function LessonsPage() {
  const data = demo();
  return (
    <div className="fade-rise space-y-5">
      <PageTitle eyebrow="Academics" title="Lesson log" subtitle={`${data.lessons.length} lessons recorded this term.`} />
      {data.lessons.length === 0 ? (
        <EmptyState title="No lessons recorded yet" body="Lessons appear here as soon as teachers log them from their workspace." />
      ) : (
        <Panel>
          {data.lessons.map((l) => (
            <div key={l.id} className="flex items-center gap-3 p-3.5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium">{l.topic}</p>
                <p className="truncate font-mono text-[11px] text-muted-foreground">
                  {data.classes.find((c) => c.id === l.classSectionId)?.name} · {data.teachers.find((t) => t.id === l.teacherId)?.name}
                </p>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">{l.date}</span>
              <Pill tone="mist">{data.subjects.find((s) => s.id === l.subjectId)?.short}</Pill>
            </div>
          ))}
        </Panel>
      )}
    </div>
  );
}
