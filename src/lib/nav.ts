import type { FeatureId } from "./entitlements";
import type { Role } from "./app-state";

export type NavItem = {
  label: string;
  to?: string;
  feature?: FeatureId;
  children?: { label: string; to: string; feature?: FeatureId }[];
};

export const NAV: Record<Role, NavItem[]> = {
  school_admin: [
    { label: "Overview", to: "/" },
    { label: "Students", to: "/students", feature: "students" },
    { label: "Teachers", to: "/teachers", feature: "teachers" },
    { label: "Classes", to: "/classes", feature: "classes" },
    {
      label: "Academics",
      children: [
        { label: "Subjects", to: "/academics/subjects", feature: "subjects" },
        { label: "Syllabus", to: "/academics/syllabus", feature: "syllabus" },
        { label: "Lessons", to: "/academics/lessons", feature: "lessons" },
        { label: "Timetable", to: "/academics/timetable" },
      ],
    },
    { label: "Results", to: "/results", feature: "scores" },
    { label: "Communication", to: "/communication", feature: "communication" },
    {
      label: "More",
      children: [
        { label: "Attendance", to: "/attendance", feature: "attendance" },
        { label: "Report cards", to: "/reports", feature: "report_cards" },
        { label: "Import data", to: "/import", feature: "imports" },
        { label: "Onboarding", to: "/onboarding" },
        { label: "Admissions", to: "/admissions", feature: "admissions" },
        { label: "Settings", to: "/settings" },
      ],
    },
  ],
  teacher: [
    { label: "Home", to: "/teacher" },
    { label: "My classes", to: "/teacher/classes" },
    { label: "Lessons", to: "/academics/lessons", feature: "lessons" },
    { label: "Attendance", to: "/attendance", feature: "attendance" },
    { label: "Results", to: "/results", feature: "scores" },
    { label: "Messages", to: "/communication", feature: "communication" },
  ],
  parent: [
    { label: "Home", to: "/parent" },
    { label: "Children", to: "/parent" },
    { label: "Results", to: "/parent/results" },
    { label: "Attendance", to: "/parent/attendance" },
    { label: "Reports", to: "/parent/reports" },
    { label: "Messages", to: "/parent/messages" },
  ],
  super_admin: [
    { label: "Dashboard", to: "/platform" },
    { label: "Schools", to: "/platform/schools" },
    { label: "Subscriptions", to: "/platform/subscriptions" },
    { label: "Features", to: "/platform/features" },
    { label: "Domains", to: "/platform/domains" },
    { label: "Analytics", to: "/platform/analytics" },
  ],
};

export const MOBILE_TABS: Record<Role, { label: string; to: string }[]> = {
  school_admin: [
    { label: "Overview", to: "/" },
    { label: "Students", to: "/students" },
    { label: "Classes", to: "/classes" },
    { label: "Results", to: "/results" },
    { label: "More", to: "/settings" },
  ],
  teacher: [
    { label: "Home", to: "/teacher" },
    { label: "Classes", to: "/teacher/classes" },
    { label: "Attendance", to: "/attendance" },
    { label: "Results", to: "/results" },
    { label: "Messages", to: "/communication" },
  ],
  parent: [
    { label: "Home", to: "/parent" },
    { label: "Results", to: "/parent/results" },
    { label: "Attendance", to: "/parent/attendance" },
    { label: "Reports", to: "/parent/reports" },
    { label: "Messages", to: "/parent/messages" },
  ],
  super_admin: [
    { label: "Dashboard", to: "/platform" },
    { label: "Schools", to: "/platform/schools" },
    { label: "Plans", to: "/platform/subscriptions" },
    { label: "Domains", to: "/platform/domains" },
    { label: "Insight", to: "/platform/analytics" },
  ],
};
