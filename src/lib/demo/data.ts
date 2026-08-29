import { FIRST_NAMES_F, FIRST_NAMES_M, SURNAMES } from "./names";

/* ---------------------------------- rng ---------------------------------- */

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rngFrom(seed: string) {
  let a = hash(seed);
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = <T,>(arr: readonly T[], r: number) => arr[Math.floor(r * arr.length) % arr.length];

/* --------------------------------- types --------------------------------- */

export type PlanId = "essential" | "professional" | "enterprise";
export type TenantStatus = "active" | "trial" | "suspended" | "expired";

export type Tenant = {
  id: string;
  name: string;
  shortName: string;
  initial: string;
  domain: string;
  domainStatus: "connected" | "pending" | "none";
  fallbackDomain: string;
  plan: PlanId;
  status: TenantStatus;
  students: number;
  teachers: number;
  users: number;
  createdAt: string;
  mrr: number;
  addOns: string[];
  city: string;
};

export type Subject = { id: string; name: string; code: string; short: string };

export type ClassSection = {
  id: string;
  level: string;
  stage: "Primary" | "Secondary";
  section: string;
  name: string;
  teacherId: string;
  assistantId: string;
  minderId: string;
  room: string;
  capacity: number;
};

export type Teacher = {
  id: string;
  employeeId: string;
  name: string;
  role: "Teacher" | "Assistant Teacher" | "Minder" | "Principal";
  email: string;
  phone: string;
  subjectIds: string[];
  qualification: string;
  status: "active" | "on leave";
  joined: string;
};

export type Parent = {
  id: string;
  name: string;
  relation: "Father" | "Mother" | "Guardian";
  phone: string;
  email: string;
  occupation: string;
};

export type Enrollment = {
  session: string;
  classSectionId: string;
  className: string;
  average: number;
  position: number;
  attendance: number;
  promoted: boolean;
  teacherComment: string;
};

export type Student = {
  id: string;
  admissionNo: string;
  firstName: string;
  lastName: string;
  name: string;
  gender: "Male" | "Female";
  dob: string;
  age: number;
  classSectionId: string;
  status: "active" | "graduated" | "withdrawn";
  admittedOn: string;
  parentIds: string[];
  health: { bloodGroup: string; genotype: string; allergies: string; notes: string };
  enrollments: Enrollment[];
};

export type SyllabusTopic = { id: string; name: string; state: "done" | "active" | "todo" };
export type SyllabusUnit = { id: string; name: string; topics: SyllabusTopic[] };

export type Lesson = {
  id: string;
  teacherId: string;
  classSectionId: string;
  subjectId: string;
  topic: string;
  date: string;
  time: string;
  term: string;
};

export type ScheduleEntry = {
  id: string;
  time: string;
  subjectId: string;
  classSectionId: string;
  teacherId: string;
  topic: string;
  state: "done" | "live" | "upcoming";
};

export type ResultStatus = "draft" | "submitted" | "review" | "approved" | "published";
export type ResultBatch = {
  id: string;
  classSectionId: string;
  subjectId: string;
  teacherId: string;
  term: string;
  status: ResultStatus;
  updated: string;
};

export type Message = {
  id: string;
  from: string;
  fromRole: string;
  audience: string;
  channel: "In-app" | "Email" | "WhatsApp";
  subject: string;
  body: string;
  time: string;
  state: "sent" | "draft" | "scheduled";
  delivered: number;
  read: number;
};

export type ActivityItem = {
  id: string;
  actor: string;
  action: string;
  detail: string;
  time: string;
  tone: "clay" | "moss" | "amber" | "mist";
};

export type Notification = {
  id: string;
  title: string;
  detail: string;
  time: string;
  group: "Today" | "Earlier";
  unread: boolean;
};

export type DemoData = ReturnType<typeof buildDemo>;

/* -------------------------------- constants ------------------------------- */

export const SESSIONS = ["2024/2025", "2025/2026", "2026/2027"];
export const CURRENT_SESSION = "2026/2027";
export const TERMS = ["Term 1", "Term 2", "Term 3"];
export const CURRENT_TERM = "Term 2";

export const ASSESSMENT_SCHEME = [
  { key: "ca1", label: "CA 1", weight: 10 },
  { key: "ca2", label: "CA 2", weight: 10 },
  { key: "assignment", label: "Assignment", weight: 10 },
  { key: "exam", label: "Exam", weight: 70 },
] as const;

export function gradeFor(total: number) {
  if (total >= 75) return { grade: "A", remark: "Excellent" };
  if (total >= 65) return { grade: "B", remark: "Very good" };
  if (total >= 55) return { grade: "C", remark: "Good" };
  if (total >= 45) return { grade: "D", remark: "Fair" };
  if (total >= 40) return { grade: "E", remark: "Pass" };
  return { grade: "F", remark: "Needs support" };
}

/* --------------------------------- builder -------------------------------- */

function buildDemo() {
  const tenants: Tenant[] = [
    {
      id: "greenfield",
      name: "Greenfield International School",
      shortName: "Greenfield",
      initial: "G",
      domain: "portal.greenfieldschool.edu.ng",
      domainStatus: "connected",
      fallbackDomain: "greenfield.almanac.school",
      plan: "enterprise",
      status: "active",
      students: 1284,
      teachers: 74,
      users: 1620,
      createdAt: "2024-08-12",
      mrr: 480,
      addOns: ["Admissions", "Fees & Finance"],
      city: "Lagos",
    },
    {
      id: "harmony",
      name: "Harmony Model College",
      shortName: "Harmony",
      initial: "H",
      domain: "portal.harmonymodel.edu.ng",
      domainStatus: "connected",
      fallbackDomain: "harmony.almanac.school",
      plan: "professional",
      status: "active",
      students: 640,
      teachers: 38,
      users: 810,
      createdAt: "2025-01-09",
      mrr: 260,
      addOns: ["Transport"],
      city: "Abuja",
    },
    {
      id: "bright-horizon",
      name: "Bright Horizon Academy",
      shortName: "Bright Horizon",
      initial: "B",
      domain: "brighthorizon.almanac.school",
      domainStatus: "pending",
      fallbackDomain: "brighthorizon.almanac.school",
      plan: "essential",
      status: "trial",
      students: 122,
      teachers: 11,
      users: 160,
      createdAt: "2026-06-02",
      mrr: 0,
      addOns: [],
      city: "Ibadan",
    },
    {
      id: "riverstone",
      name: "Riverstone Comprehensive",
      shortName: "Riverstone",
      initial: "R",
      domain: "portal.riverstone.sch.ng",
      domainStatus: "connected",
      fallbackDomain: "riverstone.almanac.school",
      plan: "professional",
      status: "suspended",
      students: 415,
      teachers: 24,
      users: 520,
      createdAt: "2024-11-21",
      mrr: 0,
      addOns: [],
      city: "Port Harcourt",
    },
    {
      id: "cedarwood",
      name: "Cedarwood Preparatory",
      shortName: "Cedarwood",
      initial: "C",
      domain: "cedarwood.almanac.school",
      domainStatus: "none",
      fallbackDomain: "cedarwood.almanac.school",
      plan: "essential",
      status: "expired",
      students: 208,
      teachers: 14,
      users: 240,
      createdAt: "2025-03-14",
      mrr: 0,
      addOns: [],
      city: "Enugu",
    },
  ];

  const subjectNames: [string, string][] = [
    ["Mathematics", "MTH"],
    ["English Language", "ENG"],
    ["Basic Science", "BSC"],
    ["Social Studies", "SOS"],
    ["Civic Education", "CVE"],
    ["Computer Studies", "CMP"],
    ["Verbal Reasoning", "VBR"],
    ["Quantitative Reasoning", "QTR"],
    ["Agricultural Science", "AGR"],
    ["Creative Arts", "ART"],
    ["Religious Studies", "RST"],
    ["Physical & Health Ed.", "PHE"],
  ];
  const subjects: Subject[] = subjectNames.map(([name, code], i) => ({
    id: `sub-${i + 1}`,
    name,
    code,
    short: name.split(" ")[0],
  }));

  // teachers
  const teachers: Teacher[] = Array.from({ length: 34 }, (_, i) => {
    const r = rngFrom(`teacher-${i}`);
    const female = r() > 0.45;
    const first = pick(female ? FIRST_NAMES_F : FIRST_NAMES_M, r());
    const last = pick(SURNAMES, r());
    const nSub = 1 + Math.floor(r() * 2);
    const subjectIds = Array.from({ length: nSub }, (_, k) => subjects[Math.floor(r() * subjects.length + k) % subjects.length].id);
    const role: Teacher["role"] =
      i === 0 ? "Principal" : i % 7 === 3 ? "Assistant Teacher" : i % 11 === 5 ? "Minder" : "Teacher";
    return {
      id: `tch-${i + 1}`,
      employeeId: `EMP-${String(1200 + i).padStart(4, "0")}`,
      name: `${first} ${last}`,
      role,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@greenfieldschool.edu.ng`,
      phone: `+234 80${Math.floor(r() * 9)} ${String(Math.floor(r() * 9000000) + 1000000)}`,
      subjectIds: [...new Set(subjectIds)],
      qualification: pick(["B.Ed Mathematics", "B.Sc Education", "M.Ed Curriculum Studies", "B.A English", "NCE Primary Ed."], r()),
      status: r() > 0.92 ? "on leave" : "active",
      joined: `20${20 + Math.floor(r() * 6)}-0${1 + Math.floor(r() * 8)}-1${Math.floor(r() * 9)}`,
    };
  });

  // classes
  const levelPlan: [string, ClassSection["stage"], string[]][] = [
    ["Primary 1", "Primary", ["Alpha", "Beta", "Gamma"]],
    ["Primary 2", "Primary", ["Alpha", "Beta", "Gamma"]],
    ["Primary 3", "Primary", ["Alpha", "Beta", "Gamma"]],
    ["Primary 4", "Primary", ["Alpha", "Beta"]],
    ["Primary 5", "Primary", ["Alpha", "Beta"]],
    ["Primary 6", "Primary", ["Alpha", "Beta"]],
    ["JSS 1", "Secondary", ["Alpha", "Beta"]],
    ["JSS 2", "Secondary", ["Alpha", "Beta"]],
    ["JSS 3", "Secondary", ["Alpha", "Beta"]],
  ];
  const classes: ClassSection[] = [];
  let ci = 0;
  for (const [level, stage, sections] of levelPlan) {
    for (const section of sections) {
      const r = rngFrom(`class-${level}-${section}`);
      classes.push({
        id: `cls-${++ci}`,
        level,
        stage,
        section,
        name: `${level} ${section}`,
        teacherId: teachers[(ci * 3) % teachers.length].id,
        assistantId: teachers[(ci * 5 + 7) % teachers.length].id,
        minderId: teachers[(ci * 7 + 11) % teachers.length].id,
        room: `${stage === "Primary" ? "P" : "S"}-${10 + ci}`,
        capacity: 28 + Math.floor(r() * 8),
      });
    }
  }

  // parents + students
  const parents: Parent[] = [];
  const students: Student[] = [];
  const total = 524;
  for (let i = 0; i < total; i++) {
    const r = rngFrom(`student-${i}`);
    const female = r() > 0.5;
    const first = pick(female ? FIRST_NAMES_F : FIRST_NAMES_M, r());
    const last = pick(SURNAMES, r());
    const cls = classes[Math.floor(r() * classes.length)];
    const age = (cls.stage === "Primary" ? 5 : 11) + Number(cls.level.replace(/\D/g, "")) + Math.floor(r() * 2);
    const father: Parent = {
      id: `par-${i}-f`,
      name: `${pick(FIRST_NAMES_M, r())} ${last}`,
      relation: "Father",
      phone: `+234 70${Math.floor(r() * 9)} ${String(Math.floor(r() * 9000000) + 1000000)}`,
      email: `${last.toLowerCase()}.family${i}@mail.com`,
      occupation: pick(["Engineer", "Trader", "Physician", "Civil servant", "Accountant", "Architect"], r()),
    };
    const mother: Parent = {
      id: `par-${i}-m`,
      name: `${pick(FIRST_NAMES_F, r())} ${last}`,
      relation: "Mother",
      phone: `+234 81${Math.floor(r() * 9)} ${String(Math.floor(r() * 9000000) + 1000000)}`,
      email: `mrs.${last.toLowerCase()}${i}@mail.com`,
      occupation: pick(["Pharmacist", "Teacher", "Entrepreneur", "Banker", "Nurse", "Lawyer"], r()),
    };
    parents.push(father, mother);

    const levelIndex = levelPlan.findIndex(([l]) => l === cls.level);
    const enrollments: Enrollment[] = SESSIONS.map((session, k) => {
      const back = SESSIONS.length - 1 - k;
      const li = Math.max(0, levelIndex - back);
      const plan = levelPlan[li];
      const sec = plan[2][Math.floor(rngFrom(`${i}-${session}`)() * plan[2].length)];
      const rr = rngFrom(`enr-${i}-${session}`);
      return {
        session,
        classSectionId: classes.find((c) => c.name === `${plan[0]} ${sec}`)?.id ?? cls.id,
        className: `${plan[0]} ${sec}`,
        average: 52 + Math.floor(rr() * 40),
        position: 1 + Math.floor(rr() * 28),
        attendance: 82 + Math.floor(rr() * 17),
        promoted: session !== CURRENT_SESSION,
        teacherComment: pick(
          [
            "A curious learner who contributes well in class discussions.",
            "Steady improvement this year. Keep encouraging reading at home.",
            "Excellent attitude to work and to classmates.",
            "Capable, but needs to work on completing assignments on time.",
          ],
          rr(),
        ),
      };
    });

    students.push({
      id: `stu-${i + 1}`,
      admissionNo: `ST-${String(100 + i).padStart(6, "0")}`,
      firstName: first,
      lastName: last,
      name: `${first} ${last}`,
      gender: female ? "Female" : "Male",
      dob: `20${String(26 - age).padStart(2, "0")}-0${1 + Math.floor(r() * 8)}-1${Math.floor(r() * 9)}`,
      age,
      classSectionId: cls.id,
      status: r() > 0.985 ? "withdrawn" : "active",
      admittedOn: `20${22 + Math.floor(r() * 4)}-09-0${1 + Math.floor(r() * 8)}`,
      parentIds: [father.id, mother.id],
      health: {
        bloodGroup: pick(["O+", "A+", "B+", "AB+", "O-"], r()),
        genotype: pick(["AA", "AS", "AA", "AA", "AC"], r()),
        allergies: pick(["None recorded", "Peanuts", "Dust", "None recorded", "Penicillin"], r()),
        notes: pick(["No chronic conditions.", "Uses inhaler during PE.", "Wears corrective lenses.", "No chronic conditions."], r()),
      },
      enrollments,
    });
  }

  // syllabus per subject
  const unitPlans: Record<string, string[]> = {
    MTH: ["Numbers", "Fractions", "Measurement", "Geometry", "Data handling"],
    ENG: ["Comprehension", "Grammar", "Narrative writing", "Poetry", "Oral English"],
    BSC: ["Living things", "Matter", "Energy", "The human body", "Environment"],
  };
  const topicsFor = (unit: string) => [`Introduction to ${unit.toLowerCase()}`, `${unit} in practice`, `Applying ${unit.toLowerCase()}`, `${unit} review`];

  const syllabus: Record<string, SyllabusUnit[]> = {};
  for (const s of subjects) {
    const units = unitPlans[s.code] ?? ["Foundations", "Core concepts", "Applications", "Project work", "Revision"];
    syllabus[s.id] = units.map((u, ui) => {
      const r = rngFrom(`syl-${s.id}-${u}`);
      return {
        id: `${s.id}-u${ui}`,
        name: u,
        topics: topicsFor(u).map((t, ti) => {
          const roll = r();
          const state: SyllabusTopic["state"] = ui * 4 + ti < 6 ? "done" : roll > 0.72 ? "active" : "todo";
          return { id: `${s.id}-u${ui}-t${ti}`, name: t, state };
        }),
      };
    });
  }

  const today = "2026-06-24";
  const schedule: ScheduleEntry[] = [
    { id: "sch-1", time: "08:00", subjectId: subjects[1].id, classSectionId: classes[6].id, teacherId: teachers[2].id, topic: "Comprehension: inference", state: "done" },
    { id: "sch-2", time: "09:00", subjectId: subjects[0].id, classSectionId: classes[6].id, teacherId: teachers[2].id, topic: "Fractions: equivalent fractions", state: "live" },
    { id: "sch-3", time: "11:00", subjectId: subjects[1].id, classSectionId: classes[10].id, teacherId: teachers[2].id, topic: "Narrative writing", state: "upcoming" },
    { id: "sch-4", time: "13:30", subjectId: subjects[2].id, classSectionId: classes[3].id, teacherId: teachers[2].id, topic: "Living things: habitats", state: "upcoming" },
    { id: "sch-5", time: "15:00", subjectId: subjects[5].id, classSectionId: classes[14].id, teacherId: teachers[5].id, topic: "Spreadsheets", state: "upcoming" },
  ];

  const lessons: Lesson[] = Array.from({ length: 24 }, (_, i) => {
    const r = rngFrom(`lesson-${i}`);
    const s = subjects[Math.floor(r() * subjects.length)];
    const c = classes[Math.floor(r() * classes.length)];
    const unit = syllabus[s.id][Math.floor(r() * 5)];
    return {
      id: `les-${i + 1}`,
      teacherId: teachers[Math.floor(r() * teachers.length)].id,
      classSectionId: c.id,
      subjectId: s.id,
      topic: unit.topics[Math.floor(r() * unit.topics.length)].name,
      date: `2026-06-${String(24 - (i % 18)).padStart(2, "0")}`,
      time: `${String(8 + (i % 7)).padStart(2, "0")}:00`,
      term: CURRENT_TERM,
    };
  });

  const resultStatuses: ResultStatus[] = ["draft", "submitted", "review", "approved", "published"];
  const results: ResultBatch[] = classes.flatMap((c, i) =>
    subjects.slice(0, 6).map((s, k) => {
      const r = rngFrom(`res-${c.id}-${s.id}`);
      return {
        id: `rb-${i}-${k}`,
        classSectionId: c.id,
        subjectId: s.id,
        teacherId: c.teacherId,
        term: CURRENT_TERM,
        status: resultStatuses[Math.floor(r() * resultStatuses.length)],
        updated: `2026-06-${String(4 + Math.floor(r() * 20)).padStart(2, "0")}`,
      };
    }),
  );

  const messages: Message[] = [
    {
      id: "msg-1",
      from: "Adaeze Nwosu",
      fromRole: "School Administrator",
      audience: "All parents",
      channel: "WhatsApp",
      subject: "Mid-term break begins Friday",
      body: "Dear parents, mid-term break begins Friday 26 June and classes resume Monday 6 July. Report cards for Term 2 will be published to the parent portal on Thursday.",
      time: "2h ago",
      state: "sent",
      delivered: 1180,
      read: 934,
    },
    {
      id: "msg-2",
      from: "Adaeze Nwosu",
      fromRole: "School Administrator",
      audience: "Primary 3 Alpha parents",
      channel: "Email",
      subject: "Class excursion — consent required",
      body: "Primary 3 Alpha will visit the Lekki Conservation Centre on 9 July. Kindly return the signed consent slip before Friday.",
      time: "Yesterday",
      state: "sent",
      delivered: 31,
      read: 24,
    },
    {
      id: "msg-3",
      from: "Mrs. Okafor",
      fromRole: "Parent",
      audience: "Front office",
      channel: "In-app",
      subject: "David's absence on Monday",
      body: "Good afternoon. David had a dental appointment on Monday morning — kindly excuse the absence. Thank you.",
      time: "Yesterday",
      state: "sent",
      delivered: 1,
      read: 1,
    },
    {
      id: "msg-4",
      from: "Adaeze Nwosu",
      fromRole: "School Administrator",
      audience: "All teachers",
      channel: "In-app",
      subject: "Score entry closes Thursday",
      body: "Please complete Term 2 score entry for all assigned subjects before Thursday 5pm so results can move to review.",
      time: "3 days ago",
      state: "sent",
      delivered: 74,
      read: 61,
    },
    {
      id: "msg-5",
      from: "Adaeze Nwosu",
      fromRole: "School Administrator",
      audience: "All parents",
      channel: "Email",
      subject: "Term 3 fees schedule",
      body: "Draft — fee schedule attached, pending bursar review.",
      time: "Saved 4 days ago",
      state: "draft",
      delivered: 0,
      read: 0,
    },
    {
      id: "msg-6",
      from: "Adaeze Nwosu",
      fromRole: "School Administrator",
      audience: "JSS 1–3 parents",
      channel: "WhatsApp",
      subject: "Inter-house sports reminder",
      body: "Scheduled for Saturday 8am.",
      time: "Sends Friday 07:00",
      state: "scheduled",
      delivered: 0,
      read: 0,
    },
  ];

  const activity: ActivityItem[] = [
    { id: "act-1", actor: teachers[4].name, action: "completed a lesson", detail: "Fractions · Primary 3 Alpha · 2h ago", time: "2h ago", tone: "moss" },
    { id: "act-2", actor: teachers[9].name, action: "submitted Term 2 results", detail: "Primary 4 Beta · awaiting review", time: "4h ago", tone: "clay" },
    { id: "act-3", actor: "Mrs. Okafor", action: "opened a report card", detail: "David Okafor · yesterday", time: "Yesterday", tone: "amber" },
    { id: "act-4", actor: teachers[2].name, action: "marked attendance", detail: "Primary 3 Alpha · 2 absent", time: "Yesterday", tone: "moss" },
    { id: "act-5", actor: "Adaeze Nwosu", action: "published a broadcast", detail: "Mid-term break begins Friday", time: "Yesterday", tone: "mist" },
    { id: "act-6", actor: teachers[11].name, action: "added 3 syllabus topics", detail: "Basic Science · JSS 1", time: "2 days ago", tone: "mist" },
  ];

  const notifications: Notification[] = [
    { id: "n-1", title: "Results submitted for review", detail: `${teachers[9].name} submitted Mathematics · Primary 4 Beta`, time: "12 min ago", group: "Today", unread: true },
    { id: "n-2", title: "Attendance alert", detail: "5 students in Primary 2 Beta marked late", time: "1h ago", group: "Today", unread: true },
    { id: "n-3", title: "New parent message", detail: "Mrs. Okafor replied about David's absence", time: "3h ago", group: "Today", unread: true },
    { id: "n-4", title: "Report cards available", detail: "Term 2 report cards published for 42 students", time: "Yesterday", group: "Earlier", unread: false },
    { id: "n-5", title: "Subscription renews in 12 days", detail: "Enterprise plan · ₦480,000 / term", time: "2 days ago", group: "Earlier", unread: false },
  ];

  const events = [
    { id: "ev-1", date: "26 Jun", title: "Mid-term break begins", detail: "School closes 12:30pm" },
    { id: "ev-2", date: "02 Jul", title: "Term 2 report cards published", detail: "Parent portal + email" },
    { id: "ev-3", date: "08 Jul", title: "Inter-house sports", detail: "Main field · 8:00am" },
  ];

  return {
    tenants,
    subjects,
    classes,
    teachers,
    students,
    parents,
    syllabus,
    schedule,
    lessons,
    results,
    messages,
    activity,
    notifications,
    events,
    today,
  };
}

let cache: DemoData | null = null;
export function demo(): DemoData {
  if (!cache) cache = buildDemo();
  return cache;
}

/* ------------------------------- derivations ------------------------------ */

export function scoresFor(studentId: string, subjectId: string, term = CURRENT_TERM) {
  const r = rngFrom(`${studentId}-${subjectId}-${term}`);
  const ca1 = 4 + Math.floor(r() * 7);
  const ca2 = 4 + Math.floor(r() * 7);
  const assignment = 5 + Math.floor(r() * 6);
  const exam = 35 + Math.floor(r() * 36);
  const total = ca1 + ca2 + assignment + exam;
  return { ca1, ca2, assignment, exam, total, ...gradeFor(total) };
}

export function attendanceFor(studentId: string) {
  const r = rngFrom(`att-${studentId}`);
  const rate = 74 + Math.floor(r() * 25);
  return {
    rate,
    present: Math.round((rate / 100) * 58),
    absent: Math.round(((100 - rate) / 100) * 58),
    late: Math.floor(r() * 6),
    excused: Math.floor(r() * 4),
  };
}

export function classStudents(classSectionId: string) {
  return demo().students.filter((s) => s.classSectionId === classSectionId);
}

export function syllabusProgress(subjectId: string) {
  const units = demo().syllabus[subjectId] ?? [];
  const topics = units.flatMap((u) => u.topics);
  if (!topics.length) return 0;
  return Math.round((topics.filter((t) => t.state === "done").length / topics.length) * 100);
}

export function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}
