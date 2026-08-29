import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { demo } from "@/lib/demo/data";
import { useApp } from "@/lib/app-state";
import { ActionButton, Avatar, EmptyState, PageTitle, Panel, Pill, toneFromName } from "@/components/app/ui";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, Upload } from "lucide-react";

export const Route = createFileRoute("/students/")({
  head: () => ({
    meta: [
      { title: "Student directory — Almanac" },
      { name: "description", content: "Search, filter and manage every student record with one permanent academic identity." },
      { property: "og:title", content: "Student directory — Almanac" },
      { property: "og:description", content: "Search, filter and manage every student record with one permanent academic identity." },
    ],
  }),
  component: StudentsPage,
});

const PAGE_SIZE = 12;

function AddStudentDialog() {
  const { addStudent } = useApp();
  const data = demo();
  const [open, setOpen] = useState(false);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [classId, setClassId] = useState(data.classes[0]?.id ?? "");
  const [error, setError] = useState<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 rounded-full bg-clay px-3.5 py-2 text-[13px] font-medium text-panel">
          <Plus className="size-3.5" /> Add student
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display">Add a student</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="first">First name</Label>
            <Input id="first" value={first} onChange={(e) => setFirst(e.target.value)} placeholder="Chinaza" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="last">Surname</Label>
            <Input id="last" value={last} onChange={(e) => setLast(e.target.value)} placeholder="Okonkwo" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="class">Class</Label>
            <select
              id="class"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
            >
              {data.classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {error ? <p className="text-[13px] text-destructive">{error}</p> : null}
        </div>
        <DialogFooter>
          <ActionButton
            onClick={() => {
              if (!first.trim() || !last.trim()) {
                setError("A student needs both a first name and a surname before we can create the record.");
                return;
              }
              const s = addStudent({ firstName: first.trim(), lastName: last.trim(), classSectionId: classId });
              setOpen(false);
              setFirst("");
              setLast("");
              setError(null);
              toast.success(`${s.name} added`, { description: `Admission number ${s.admissionNo}` });
            }}
          >
            Create student
          </ActionButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StudentsPage() {
  const data = demo();
  const { students } = useApp();
  const [query, setQuery] = useState("");
  const [classId, setClassId] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return students.filter(
      (s) =>
        (!q || s.name.toLowerCase().includes(q) || s.admissionNo.toLowerCase().includes(q)) &&
        (classId === "all" || s.classSectionId === classId) &&
        (status === "all" || s.status === status),
    );
  }, [students, query, classId, status]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages - 1);
  const rows = filtered.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="fade-rise space-y-6">
      <PageTitle
        eyebrow="Directory"
        title="Students"
        subtitle={`${filtered.length.toLocaleString()} records · one permanent academic identity per student, carried across every session.`}
        actions={
          <>
            <Link to="/import" className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-medium ring-1 ring-foreground/15">
              <Upload className="size-3.5" /> Import
            </Link>
            <AddStudentDialog />
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-full bg-card px-3.5 py-2 ring-1 ring-foreground/10">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder="Search by name or admission number"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
        <select
          value={classId}
          onChange={(e) => {
            setClassId(e.target.value);
            setPage(0);
          }}
          className="rounded-full bg-card px-3.5 py-2 text-[13px] ring-1 ring-foreground/10"
        >
          <option value="all">All classes</option>
          {data.classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-full bg-card px-3.5 py-2 text-[13px] ring-1 ring-foreground/10"
        >
          <option value="all">Any status</option>
          <option value="active">Active</option>
          <option value="withdrawn">Withdrawn</option>
        </select>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title="No students match those filters"
          body="Try a different class or clear the search. If you're just setting up, import your existing student records to get started."
          action={
            <Link to="/import" className="rounded-full bg-clay px-4 py-2 text-[13px] font-medium text-panel">
              Import students
            </Link>
          }
        />
      ) : (
        <Panel>
          {rows.map((s) => {
            const cls = data.classes.find((c) => c.id === s.classSectionId);
            const parent = data.parents.find((p) => p.id === s.parentIds[0]);
            return (
              <Link key={s.id} to="/students/$studentId" params={{ studentId: s.id }} className="flex items-center gap-3 p-3 hover:bg-foreground/[0.04]">
                <Avatar name={s.name} tone={toneFromName(s.name)} size={38} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium">{s.name}</p>
                  <p className="truncate font-mono text-[11px] text-muted-foreground">
                    {s.admissionNo} · {cls?.name}
                  </p>
                </div>
                <p className="hidden min-w-0 flex-1 truncate text-[12px] text-muted-foreground sm:block">{parent?.name ?? "No guardian linked"}</p>
                <Pill tone={s.status === "active" ? "moss" : "amber"}>{s.status}</Pill>
              </Link>
            );
          })}
        </Panel>
      )}

      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] text-muted-foreground">
          Page {current + 1} of {pages}
        </p>
        <div className="flex gap-2">
          <ActionButton variant="outline" onClick={() => setPage(Math.max(0, current - 1))}>
            Previous
          </ActionButton>
          <ActionButton variant="outline" onClick={() => setPage(Math.min(pages - 1, current + 1))}>
            Next
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
