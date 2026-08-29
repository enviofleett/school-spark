import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { demo } from "@/lib/demo/data";
import { Avatar, EmptyState, PageTitle, Panel, Pill } from "@/components/app/ui";
import { Search } from "lucide-react";

export const Route = createFileRoute("/teachers/")({
  head: () => ({
    meta: [
      { title: "Teachers — Almanac" },
      { name: "description", content: "Teacher directory with subjects, classes, qualifications and activity." },
      { property: "og:title", content: "Teachers — Almanac" },
      { property: "og:description", content: "Teacher directory with subjects, classes, qualifications and activity." },
    ],
  }),
  component: TeachersPage,
});

function TeachersPage() {
  const data = demo();
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.teachers.filter((t) => (!q || t.name.toLowerCase().includes(q) || t.employeeId.toLowerCase().includes(q)) && (role === "all" || t.role === role));
  }, [data.teachers, query, role]);

  return (
    <div className="fade-rise space-y-6">
      <PageTitle
        eyebrow="Directory"
        title="Teachers"
        subtitle={`${data.teachers.length} staff members across teaching, assistant and minder roles.`}
        actions={
          <Link to="/import" className="rounded-full px-3.5 py-2 text-[13px] font-medium ring-1 ring-foreground/15">
            Import staff
          </Link>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-full bg-card px-3.5 py-2 ring-1 ring-foreground/10">
          <Search className="size-4 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search teachers" className="w-full bg-transparent text-sm outline-none" />
        </div>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-full bg-card px-3.5 py-2 text-[13px] ring-1 ring-foreground/10">
          <option value="all">All roles</option>
          <option>Teacher</option>
          <option>Assistant Teacher</option>
          <option>Minder</option>
          <option>Principal</option>
        </select>
      </div>

      {rows.length === 0 ? (
        <EmptyState title="No teachers match that search" body="Try a different name, employee ID, or clear the role filter." />
      ) : (
        <Panel>
          {rows.map((t) => (
            <Link key={t.id} to="/teachers/$teacherId" params={{ teacherId: t.id }} className="flex items-center gap-3 p-3 hover:bg-foreground/[0.04]">
              <Avatar name={t.name} tone="moss" size={38} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-medium">{t.name}</p>
                <p className="truncate font-mono text-[11px] text-muted-foreground">
                  {t.employeeId} · {t.role}
                </p>
              </div>
              <p className="hidden flex-1 truncate text-[12px] text-muted-foreground sm:block">
                {t.subjectIds.map((id) => data.subjects.find((s) => s.id === id)?.short).join(", ")}
              </p>
              <Pill tone={t.status === "active" ? "moss" : "amber"}>{t.status}</Pill>
            </Link>
          ))}
        </Panel>
      )}
    </div>
  );
}
