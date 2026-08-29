import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  demo,
  type Message,
  type Notification,
  type ResultStatus,
  type Student,
  type Tenant,
} from "./demo/data";
import { planFeatures, type FeatureId } from "./entitlements";

export type Role = "super_admin" | "school_admin" | "teacher" | "parent";

export const ROLE_LABEL: Record<Role, string> = {
  super_admin: "Platform Super Admin",
  school_admin: "School Administrator",
  teacher: "Teacher",
  parent: "Parent / Guardian",
};

export const ROLE_HOME: Record<Role, string> = {
  super_admin: "/platform",
  school_admin: "/",
  teacher: "/teacher",
  parent: "/parent",
};

type AppState = {
  role: Role;
  setRole: (r: Role) => void;
  tenant: Tenant;
  tenantId: string;
  setTenantId: (id: string) => void;
  currentUserName: string;
  features: FeatureId[];
  has: (f: FeatureId) => boolean;
  students: Student[];
  addStudent: (s: Partial<Student> & { firstName: string; lastName: string; classSectionId: string }) => Student;
  updateStudent: (id: string, patch: Partial<Student>) => void;
  messages: Message[];
  addMessage: (m: Omit<Message, "id">) => void;
  resultOverrides: Record<string, ResultStatus>;
  setResultStatus: (id: string, status: ResultStatus) => void;
  notifications: Notification[];
  markAllRead: () => void;
  teacherId: string;
  parentChildren: Student[];
  importedCount: number;
  registerImport: (n: number) => void;
};

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const base = demo();
  const [role, setRole] = useState<Role>("school_admin");
  const [tenantId, setTenantId] = useState("greenfield");
  const [extraStudents, setExtraStudents] = useState<Student[]>([]);
  const [studentPatches, setStudentPatches] = useState<Record<string, Partial<Student>>>({});
  const [extraMessages, setExtraMessages] = useState<Message[]>([]);
  const [resultOverrides, setResultOverrides] = useState<Record<string, ResultStatus>>({});
  const [readAll, setReadAll] = useState(false);
  const [importedCount, setImportedCount] = useState(0);

  const tenant = base.tenants.find((t) => t.id === tenantId) ?? (base.tenants[0] as Tenant);
  const features = useMemo(() => {
    const list = [...planFeatures(tenant.plan)];
    if (tenant.addOns.includes("Admissions")) list.push("admissions");
    if (tenant.addOns.includes("Fees & Finance")) list.push("finance");
    if (tenant.addOns.includes("Transport")) list.push("transport");
    return list;
  }, [tenant]);

  const students = useMemo(
    () => [...extraStudents, ...base.students].map((s) => ({ ...s, ...studentPatches[s.id] })),
    [base.students, extraStudents, studentPatches],
  );

  const addStudent: AppState["addStudent"] = useCallback((input) => {
    const id = `stu-new-${Date.now()}`;
    const student: Student = {
      id,
      admissionNo: input.admissionNo ?? `ST-${String(900000 + Math.floor(Date.now() % 90000)).slice(0, 6)}`,
      firstName: input.firstName,
      lastName: input.lastName,
      name: `${input.firstName} ${input.lastName}`,
      gender: input.gender ?? "Female",
      dob: input.dob ?? "2018-05-04",
      age: input.age ?? 8,
      classSectionId: input.classSectionId,
      status: "active",
      admittedOn: "2026-06-24",
      parentIds: [],
      health: input.health ?? { bloodGroup: "—", genotype: "—", allergies: "None recorded", notes: "No records yet." },
      enrollments: [],
    };
    setExtraStudents((prev) => [student, ...prev]);
    return student;
  }, []);

  const updateStudent = useCallback((id: string, patch: Partial<Student>) => {
    setStudentPatches((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }, []);

  const addMessage = useCallback((m: Omit<Message, "id">) => {
    setExtraMessages((prev) => [{ ...m, id: `msg-${Date.now()}` }, ...prev]);
  }, []);

  const setResultStatus = useCallback((id: string, status: ResultStatus) => {
    setResultOverrides((prev) => ({ ...prev, [id]: status }));
  }, []);

  const notifications = useMemo(
    () => base.notifications.map((n) => (readAll ? { ...n, unread: false } : n)),
    [base.notifications, readAll],
  );

  const teacherId = base.teachers[2]?.id ?? "tch-3";
  const parentChildren = useMemo(() => {
    const david = base.students.find((s) => s.lastName === "Okafor") ?? (base.students[0] as Student);
    const sibling = base.students.find((s) => s.lastName === david.lastName && s.id !== david.id) ?? (base.students[1] as Student);
    return [david, sibling];
  }, [base.students]);

  const currentUserName =
    role === "super_admin"
      ? "Ijeoma Balogun"
      : role === "teacher"
        ? (base.teachers[2]?.name ?? "Jane Osei")
        : role === "parent"
          ? `Mrs. ${parentChildren[0]?.lastName ?? "Okafor"}`
          : "Adaeze Nwosu";

  const value: AppState = {
    role,
    setRole,
    tenant,
    tenantId,
    setTenantId,
    currentUserName,
    features,
    has: (f) => features.includes(f),
    students,
    addStudent,
    updateStudent,
    messages: [...extraMessages, ...base.messages],
    addMessage,
    resultOverrides,
    setResultStatus,
    notifications,
    markAllRead: () => setReadAll(true),
    teacherId,
    parentChildren,
    importedCount,
    registerImport: (n) => setImportedCount((c) => c + n),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside AppStateProvider");
  return ctx;
}
