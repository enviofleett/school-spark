import type { PlanId } from "./demo/data";

export type FeatureId =
  | "students"
  | "teachers"
  | "classes"
  | "subjects"
  | "syllabus"
  | "scores"
  | "report_cards"
  | "imports"
  | "custom_domain"
  | "teacher_portal"
  | "parent_portal"
  | "attendance"
  | "lessons"
  | "communication"
  | "analytics"
  | "result_approval"
  | "bulk_communication"
  | "ai_intelligence"
  | "admissions"
  | "finance"
  | "transport"
  | "health";

export const FEATURES: { id: FeatureId; label: string; group: string }[] = [
  { id: "students", label: "Student management", group: "Core" },
  { id: "teachers", label: "Teacher management", group: "Core" },
  { id: "classes", label: "Classes & sections", group: "Core" },
  { id: "subjects", label: "Subjects", group: "Core" },
  { id: "syllabus", label: "Syllabus", group: "Academics" },
  { id: "scores", label: "Score entry & grades", group: "Academics" },
  { id: "report_cards", label: "Report cards", group: "Academics" },
  { id: "imports", label: "CSV / Excel imports", group: "Core" },
  { id: "custom_domain", label: "Custom domain", group: "Core" },
  { id: "teacher_portal", label: "Teacher portal", group: "Portals" },
  { id: "parent_portal", label: "Parent portal", group: "Portals" },
  { id: "attendance", label: "Attendance", group: "Academics" },
  { id: "lessons", label: "Lesson tracking", group: "Academics" },
  { id: "communication", label: "Communication", group: "Engagement" },
  { id: "analytics", label: "Academic analytics", group: "Insight" },
  { id: "result_approval", label: "Result approval & locking", group: "Academics" },
  { id: "bulk_communication", label: "Bulk communication", group: "Engagement" },
  { id: "ai_intelligence", label: "AI academic intelligence", group: "Insight" },
  { id: "admissions", label: "Admissions", group: "Add-on" },
  { id: "finance", label: "Fees & finance", group: "Add-on" },
  { id: "transport", label: "Transport", group: "Add-on" },
  { id: "health", label: "Health records", group: "Add-on" },
];

const ESSENTIAL: FeatureId[] = [
  "students",
  "teachers",
  "classes",
  "subjects",
  "syllabus",
  "scores",
  "report_cards",
  "imports",
  "custom_domain",
];

const PROFESSIONAL: FeatureId[] = [
  ...ESSENTIAL,
  "teacher_portal",
  "parent_portal",
  "attendance",
  "lessons",
  "communication",
  "analytics",
];

const ENTERPRISE: FeatureId[] = [
  ...PROFESSIONAL,
  "result_approval",
  "bulk_communication",
  "ai_intelligence",
  "health",
];

export const PLANS: { id: PlanId; name: string; price: string; blurb: string; features: FeatureId[] }[] = [
  { id: "essential", name: "Essential", price: "₦120,000 / term", blurb: "Digitise the register, results and report cards.", features: ESSENTIAL },
  { id: "professional", name: "Professional", price: "₦260,000 / term", blurb: "Bring teachers and parents into the loop.", features: PROFESSIONAL },
  { id: "enterprise", name: "Enterprise", price: "₦480,000 / term", blurb: "Approvals, analytics and multi-campus operations.", features: ENTERPRISE },
];

export function planFeatures(plan: PlanId): FeatureId[] {
  return PLANS.find((p) => p.id === plan)?.features ?? ESSENTIAL;
}

export function requiredPlanFor(feature: FeatureId): string {
  const plan = PLANS.find((p) => p.features.includes(feature));
  return plan ? plan.name : "Add-on module";
}
