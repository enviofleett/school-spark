import { Link, useRouterState } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import {
  Bell,
  ChevronDown,
  GraduationCap,
  Home,
  LayoutGrid,
  MessageSquare,
  Search,
  Settings2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROLE_HOME, ROLE_LABEL, useApp, type Role } from "@/lib/app-state";
import { MOBILE_TABS, NAV } from "@/lib/nav";
import { demo } from "@/lib/demo/data";
import { Avatar, toneFromName } from "./ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const AnyLink = Link as unknown as (props: Record<string, unknown>) => ReactNode;

function NavLink({ to, label, active }: { to: string; label: string; active: boolean }) {
  return AnyLink({
    to,
    className: cn(
      "shrink-0 rounded-full px-3 py-1.5 text-[13px] transition-colors",
      active ? "bg-background text-foreground font-medium" : "text-panel-foreground/70 ring-1 ring-white/12 hover:text-panel-foreground",
    ),
    children: label,
  });
}

function GlobalSearch() {
  const [query, setQuery] = useState("");
  const data = demo();
  const { students } = useApp();
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { students: [], teachers: [], parents: [] };
    return {
      students: students.filter((s) => s.name.toLowerCase().includes(q) || s.admissionNo.toLowerCase().includes(q)).slice(0, 4),
      teachers: data.teachers.filter((t) => t.name.toLowerCase().includes(q)).slice(0, 3),
      parents: data.parents.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 3),
    };
  }, [query, students, data]);

  const empty = !results.students.length && !results.teachers.length && !results.parents.length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button aria-label="Search" className="grid size-9 place-items-center rounded-lg text-panel-foreground/80 ring-1 ring-white/10 hover:bg-white/5">
          <Search className="size-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg gap-0 overflow-hidden p-0">
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <Search className="size-4 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search students, teachers, parents…"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {!query.trim() ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">Try “David Okafor”, an admission number, or a teacher's name.</p>
          ) : empty ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">No records match “{query}”.</p>
          ) : (
            <div className="space-y-3 p-1">
              {results.students.length ? (
                <div>
                  <p className="label-mono px-2 py-1">Students</p>
                  {results.students.map((s) =>
                    AnyLink({
                      key: s.id,
                      to: "/students/$studentId",
                      params: { studentId: s.id },
                      className: "flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted",
                      children: (
                        <>
                          <Avatar name={s.name} tone={toneFromName(s.name)} size={32} />
                          <span className="text-sm">
                            {s.name}
                            <span className="ml-2 font-mono text-[11px] text-muted-foreground">{s.admissionNo}</span>
                          </span>
                        </>
                      ),
                    }),
                  )}
                </div>
              ) : null}
              {results.teachers.length ? (
                <div>
                  <p className="label-mono px-2 py-1">Teachers</p>
                  {results.teachers.map((t) =>
                    AnyLink({
                      key: t.id,
                      to: "/teachers/$teacherId",
                      params: { teacherId: t.id },
                      className: "flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted",
                      children: (
                        <>
                          <Avatar name={t.name} tone="moss" size={32} />
                          <span className="text-sm">
                            {t.name}
                            <span className="ml-2 font-mono text-[11px] text-muted-foreground">{t.employeeId}</span>
                          </span>
                        </>
                      ),
                    }),
                  )}
                </div>
              ) : null}
              {results.parents.length ? (
                <div>
                  <p className="label-mono px-2 py-1">Parents</p>
                  {results.parents.map((p) => (
                    <div key={p.id} className="flex items-center gap-3 rounded-lg px-2 py-2">
                      <Avatar name={p.name} tone="amber" size={32} />
                      <span className="text-sm">
                        {p.name}
                        <span className="ml-2 text-[12px] text-muted-foreground">{p.relation}</span>
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function NotificationBell() {
  const { notifications, markAllRead } = useApp();
  const unread = notifications.filter((n) => n.unread).length;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button aria-label="Notifications" className="relative grid size-9 place-items-center rounded-lg text-panel-foreground/80 ring-1 ring-white/10 hover:bg-white/5">
          <Bell className="size-4" />
          {unread > 0 ? <span className="absolute top-2 right-2 size-1.5 rounded-full bg-clay" /> : null}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display">Notifications</SheetTitle>
        </SheetHeader>
        <div className="space-y-5 overflow-y-auto px-4 pb-8">
          {(["Today", "Earlier"] as const).map((group) => {
            const items = notifications.filter((n) => n.group === group);
            if (!items.length) return null;
            return (
              <div key={group}>
                <p className="label-mono mb-2">{group}</p>
                <div className="divide-y divide-foreground/8 overflow-hidden rounded-xl bg-parch ring-1 ring-foreground/5">
                  {items.map((n) => (
                    <div key={n.id} className="flex gap-3 p-3.5">
                      <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", n.unread ? "bg-clay" : "bg-foreground/15")} />
                      <div>
                        <p className="text-[13px] font-medium">{n.title}</p>
                        <p className="mt-0.5 text-[12px] text-muted-foreground">{n.detail}</p>
                        <p className="mt-1 font-mono text-[11px] text-muted-foreground">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <button onClick={markAllRead} className="text-[13px] font-medium text-clay">
            Mark everything as read
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ProfileMenu() {
  const { role, setRole, currentUserName, tenant } = useApp();
  const roles: Role[] = ["school_admin", "teacher", "parent", "super_admin"];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full py-0.5 pr-2 pl-0.5 ring-1 ring-white/10 hover:bg-white/5">
          <Avatar name={currentUserName} tone="clay" size={30} />
          <ChevronDown className="size-3.5 text-panel-foreground/60" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <p className="text-sm font-medium">{currentUserName}</p>
          <p className="text-[12px] font-normal text-muted-foreground">
            {ROLE_LABEL[role]} · {tenant.shortName}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="label-mono">Switch experience</DropdownMenuLabel>
        {roles.map((r) => (
          <DropdownMenuItem key={r} asChild>
            {AnyLink({
              to: ROLE_HOME[r],
              onClick: () => setRole(r),
              className: cn("flex w-full items-center justify-between", r === role && "font-medium"),
              children: (
                <>
                  {ROLE_LABEL[r]}
                  {r === role ? <span className="font-mono text-[10px] text-clay">current</span> : null}
                </>
              ),
            })}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>{AnyLink({ to: "/settings", children: "School settings" })}</DropdownMenuItem>
        <DropdownMenuItem asChild>{AnyLink({ to: "/onboarding", children: "Setup checklist" })}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const TAB_ICONS = [Home, Users, LayoutGrid, GraduationCap, MessageSquare];

export function AppShell({ children }: { children: ReactNode }) {
  const { role, tenant, has } = useApp();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = NAV[role].filter((i) => !i.feature || has(i.feature));
  const tabs = MOBILE_TABS[role];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <header className="sticky top-0 z-40 bg-panel text-panel-foreground">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 pt-4 pb-1 lg:px-6">
          {AnyLink({
            to: ROLE_HOME[role],
            className: "flex items-center gap-2.5",
            children: (
              <>
                <span className="grid size-9 place-items-center rounded-lg bg-clay font-display text-lg font-semibold text-panel">
                  {role === "super_admin" ? "A" : tenant.initial}
                </span>
                <span className="leading-tight">
                  <span className="block font-display text-[15px] font-semibold">
                    {role === "super_admin" ? "Almanac Platform" : tenant.shortName}
                  </span>
                  <span className="block font-mono text-[10px] tracking-wide text-mist">
                    {role === "super_admin" ? "operations console" : tenant.domain}
                  </span>
                </span>
              </>
            ),
          })}

          <nav className="mx-auto hidden items-center gap-1.5 lg:flex">
            {items.map((item) =>
              item.children ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[13px] text-panel-foreground/70 ring-1 ring-white/12 hover:text-panel-foreground">
                    {item.label} <ChevronDown className="size-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    {item.children
                      .filter((c) => !c.feature || has(c.feature))
                      .map((c) => (
                        <DropdownMenuItem key={c.to} asChild>
                          {AnyLink({ to: c.to, children: c.label })}
                        </DropdownMenuItem>
                      ))}
                    {item.children
                      .filter((c) => c.feature && !has(c.feature))
                      .map((c) => (
                        <DropdownMenuItem key={c.to} asChild>
                          {AnyLink({
                            to: "/settings",
                            className: "flex w-full items-center justify-between text-muted-foreground",
                            children: (
                              <>
                                {c.label}
                                <span className="font-mono text-[10px] text-amber">upgrade</span>
                              </>
                            ),
                          })}
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <NavLink key={item.to} to={item.to as string} label={item.label} active={pathname === item.to} />
              ),
            )}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <GlobalSearch />
            <NotificationBell />
            <ProfileMenu />
          </div>
        </div>

        {/* compact scrollable nav strip (mobile + tablet) */}
        <div className="no-scrollbar mt-3 flex items-center gap-1.5 overflow-x-auto px-4 pb-3 lg:hidden">
          {items.map((item) =>
            item.children ? (
              <Sheet key={item.label}>
                <SheetTrigger className="shrink-0 rounded-full px-3 py-1.5 text-[13px] text-panel-foreground/70 ring-1 ring-white/12">
                  {item.label} ▾
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl">
                  <SheetHeader>
                    <SheetTitle className="font-display">{item.label}</SheetTitle>
                  </SheetHeader>
                  <div className="grid gap-1 px-4 pb-8">
                    {item.children.map((c) =>
                      AnyLink({
                        key: c.to,
                        to: c.feature && !has(c.feature) ? "/settings" : c.to,
                        className: "flex items-center justify-between rounded-lg px-3 py-3 text-sm hover:bg-muted",
                        children: (
                          <>
                            {c.label}
                            {c.feature && !has(c.feature) ? <span className="font-mono text-[10px] text-amber">upgrade</span> : null}
                          </>
                        ),
                      }),
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <NavLink key={item.to} to={item.to as string} label={item.label} active={pathname === item.to} />
            ),
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 lg:px-6">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-panel/95 text-panel-foreground/70 backdrop-blur md:hidden">
        <div className="grid grid-cols-5">
          {tabs.map((tab, i) => {
            const Icon = TAB_ICONS[i] ?? Settings2;
            const active = pathname === tab.to;
            return AnyLink({
              key: tab.to + tab.label,
              to: tab.to,
              className: cn("flex flex-col items-center gap-1 py-2.5", active ? "text-clay" : "text-panel-foreground/60"),
              children: (
                <>
                  <Icon className="size-[17px]" />
                  <span className="text-[11px]">{tab.label}</span>
                </>
              ),
            });
          })}
        </div>
      </nav>
    </div>
  );
}
