import { createFileRoute } from "@tanstack/react-router";
import { demo, syllabusProgress } from "@/lib/demo/data";
import { Meter, PageTitle, Panel } from "@/components/app/ui";

export const Route = createFileRoute("/academics/subjects")({
  head: () => ({
    meta: [
      { title: "Subjects — Almanac" },
      { name: "description", content: "Subject catalogue with codes, assigned teachers and syllabus coverage." },
      { property: "og:title", content: "Subjects — Almanac" },
      { property: "og:description", content: "Subject catalogue with codes, assigned teachers and syllabus coverage." },
    ],
  }),
  component: SubjectsPage,
});

function SubjectsPage() {
  const data = demo();
  return (
    <div className="fade-rise space-y-5">
      <PageTitle eyebrow="Academics" title="Subjects" subtitle={`${data.subjects.length} subjects offered this session.`} />
      <Panel>
        {data.subjects.map((s) => {
          const teachers = data.teachers.filter((t) => t.subjectIds.includes(s.id));
          return (
            <div key={s.id} className="p-3.5">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[14px] font-medium">{s.name}</p>
                  <p className="truncate font-mono text-[11px] text-muted-foreground">
                    {s.code} · {teachers.length} teachers
                  </p>
                </div>
                <span className="font-mono text-[12px] text-muted-foreground">{syllabusProgress(s.id)}%</span>
              </div>
              <div className="mt-2">
                <Meter value={syllabusProgress(s.id)} tone="moss" />
              </div>
            </div>
          );
        })}
      </Panel>
    </div>
  );
}
