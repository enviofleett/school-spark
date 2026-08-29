# School Spark

BUILD BRIEF — MODERN SCHOOL OPERATIONS & ACADEMIC INTELLIGENCE SaaS



Build a complete, production-quality, multi-tenant SaaS web application for managing and automating school academic operations.



The working product name is [PRODUCT NAME].



This is NOT a simple school management dashboard and it should NOT look like a traditional school ERP.



The product is a modern School Operations & Academic Intelligence Platform that helps schools digitize their academic operations, connect teachers and parents, manage students, track curriculum delivery, manage results and maintain a continuous academic history for every student.



The entire UI must be built end-to-end with realistic navigation, screens, workflows, states, interactions and responsive behaviour.



---



1. PRODUCT VISION



The central concept is:



Every student has one permanent digital academic identity.



A student's record follows them throughout their entire journey in the school.



For example:



Student:

David Okafor



2026/2027

→ Primary 1 Alpha

→ Results

→ Attendance

→ Lessons

→ Teacher comments



2027/2028

→ Primary 2 Beta

→ Results

→ Attendance

→ Lessons

→ Teacher comments



2028/2029

→ Primary 3 Alpha

→ Results

→ Attendance

→ Lessons

→ Teacher comments



Promotion must NEVER create a new student.



Instead, create a new enrollment/academic period for the same student.



The application should make this concept visible throughout the UI.



---



2. CORE PRODUCT REQUIREMENTS



The platform is a true SaaS product.



It must support multiple schools on one platform.



Each school is a separate tenant.



Example:



Platform

→ School A

→ School B

→ School C

→ School D



Each school must have isolated:



- Students

- Parents

- Teachers

- Staff

- Classes

- Subjects

- Academic sessions

- Results

- Attendance

- Communications

- School settings

- Branding

- Domains



One school must NEVER be able to access another school's data.



Build the UI and application architecture around multi-tenancy from the beginning.



Do not build this as a single-school application and attempt to retrofit SaaS functionality later.



---



3. CUSTOM SCHOOL DOMAINS



Each school must be associated with its own domain or subdomain.



Example:



portal.greenfieldschool.edu.ng



The platform should resolve the incoming domain to the correct school tenant.



Conceptually:



DOMAIN

→ TENANT

→ SCHOOL CONFIGURATION

→ USER AUTHENTICATION

→ SCHOOL DASHBOARD



Schools should be able to configure:



- Custom domain

- School logo

- School colours

- Favicon

- School name

- Login branding



The application should include a domain management screen showing:



Domain:

portal.greenfieldschool.edu.ng



Status:

Connected ✓



SSL:

Active ✓



Tenant:

Greenfield International School



Also support a platform-provided fallback subdomain during onboarding.



---



4. USER ROLES



Implement role-based access.



Platform roles:



- Super Admin



School roles:



- School Administrator

- Principal / Headteacher

- Teacher

- Assistant Teacher

- Minder

- Parent / Guardian



Design the application so additional roles can be added later:



- Accountant

- Registrar

- Nurse

- HR Manager

- Transport Manager



Each role must have its own dashboard and appropriate permissions.



Users should only see functionality relevant to their role.



---



5. SUBSCRIPTION / FEATURE ENTITLEMENT SYSTEM



The SaaS must have packages.



Implement a feature entitlement architecture.



Initial plans:



ESSENTIAL



Includes:



- School management

- Student management

- Teacher management

- Classes and sections

- Parent information

- Subjects

- Basic syllabus

- Score entry

- Grades

- Basic report cards

- CSV/Excel imports

- Custom domain



PROFESSIONAL



Everything in Essential plus:



- Teacher portal

- Parent portal

- Attendance

- Lesson tracking

- Syllabus progress

- Advanced results

- Digital report cards

- Email communication

- WhatsApp communication

- Notifications

- Basic analytics



ENTERPRISE



Everything in Professional plus:



- Advanced academic analytics

- Result approval

- Result locking

- Advanced communication

- Bulk communication

- Multi-campus

- Advanced permissions

- AI academic intelligence



Optional add-on modules:



- Admissions

- Fees & Finance

- Transport

- Health

- HR

- Inventory

- Boarding



Do NOT hard-code the UI around package names.



Create a feature entitlement concept where features can be enabled or disabled per school.



If a school does not have a feature, that module should either:



1. Not appear in navigation, OR

2. Appear as a clearly designed upgrade/add-on opportunity.



Do not make unavailable features appear broken.



---



6. PLATFORM ADMIN DASHBOARD



Create a separate platform-level administration environment.



Header navigation:



Dashboard

Schools

Subscriptions

Features

Domains

Users

Billing

Analytics

Settings



Platform dashboard should display:



- Total schools

- Active schools

- Trial schools

- Suspended schools

- Total students

- Total teachers

- Total parents

- Monthly recurring revenue

- Subscription distribution

- Recent school registrations

- Recent activity



Create a school management table.



Columns:



School

Plan

Students

Users

Domain

Status

Created

Actions



School detail page should show:



- School profile

- Subscription

- Enabled features

- Users

- Students

- Domain

- Activity

- Billing

- Configuration



---



7. SCHOOL ADMIN DASHBOARD



Create a beautiful school-level dashboard.



Do NOT make it look like an old enterprise ERP.



The dashboard should feel modern, calm and useful.



Header should contain:



School logo

School name



Main navigation:



Overview

Students

Teachers

Classes

Academics

Attendance

Results

Communication

Reports



Right side:



Search

Notifications

Profile



If modules are enabled:



Admissions

Finance

Transport

Health

etc.



Dashboard content:



Welcome message



"Good morning, Admin."



Show clean summary cards:



Students

1,284



Teachers

74



Classes

38



Attendance Today

94%



Then useful visual/activity sections:



Today's classes



Recent activity



Pending results



Syllabus progress



Attendance alerts



Recent parent communications



Upcoming events



Use cards sparingly.



Do not turn every piece of information into a card.



---



8. HEADER NAVIGATION — VERY IMPORTANT



I strongly prefer top/header navigation rather than a permanent left sidebar.



Do NOT build a traditional dashboard with a large vertical sidebar.



Primary navigation must be in the header.



Desktop:



Logo

→ Overview

→ Students

→ Teachers

→ Classes

→ Academics

→ Results

→ Communication

→ More



Right:



Search

Notifications

Profile



Use dropdown menus for grouped functionality.



For example:



Academics ▼



Subjects

Syllabus

Lessons

Assessments

Timetable



More ▼



Attendance

Reports

Admissions

Finance

Transport

Health



The header should remain clean and compact.



On mobile, transform this into a modern mobile navigation pattern rather than forcing the desktop header into a tiny screen.



---



9. DESIGN LANGUAGE



The UI must feel:



- Modern

- Premium

- Human-designed

- Clean

- Social

- Friendly

- Professional

- Fast

- Spacious

- Minimal



Avoid:



- Generic AI dashboard aesthetics

- Excessive gradients

- Excessive glassmorphism

- Excessive rounded cards

- Neon colours

- Purple/blue AI-style gradients

- Huge dashboard widgets

- Dense tables everywhere

- Excessive shadows

- Decorative graphics that don't serve a purpose

- Stock-style illustrations

- Overly futuristic UI



I do NOT want anything that visually suggests:



"AI generated admin dashboard."



The product should look like a carefully designed modern SaaS product created by an experienced product design team.



Think:



modern productivity platform + social product + education software



rather than:



traditional school ERP.



---



10. SOCIAL-FIRST UI



The application should feel as intuitive and engaging as modern social/productivity applications.



Use:



- Activity feeds

- Avatars

- Human-friendly notifications

- Timeline views

- Profile pages

- Contextual actions

- Quick actions

- Search

- Mentions where appropriate

- Recent activity

- Clean conversational communication interfaces



For example, student profiles should feel like rich profiles rather than database records.



Teacher profiles should also feel human and useful.



Communication should feel closer to a modern messaging platform than an old-school announcement system.



---



11. STUDENT MANAGEMENT



Create:



Students



Student directory should include:



- Search

- Filters

- Class filter

- Section filter

- Status

- Academic session

- Admission number



Student list should feel modern.



Each student should have:



- Avatar/photo

- Name

- Admission number

- Current class

- Status

- Parent

- Quick actions



Clicking a student opens a rich student profile.



---



12. STUDENT PROFILE



Create a modern student profile.



Header:



Student photograph

David Okafor

ST-000341

Primary 3 Alpha



Actions:



Message Parent

View Report

Edit Student



Profile sections/tabs:



Overview

Academic

Attendance

Results

Parents

Health

History

Documents



Overview:



- Current class

- Admission date

- Age

- Parent

- Emergency contact



Academic:



Show current academic performance.



Results:



Show subject performance by term.



Attendance:



Show attendance trends.



Parents:



Show parent/guardian information.



Health:



Show:



- Blood group

- Genotype

- Allergies

- Medical information

- Emergency information



History:



This is especially important.



Create a visual academic timeline.



Example:



2026/27

Primary 1 Alpha



2027/28

Primary 2 Beta



2028/29

Primary 3 Alpha



Clicking a year opens the complete academic record for that period.



---



13. CLASS MANAGEMENT



Create a modern class management experience.



Structure:



Primary



Primary 1

→ Alpha

→ Beta

→ Gamma



Primary 2

→ Alpha

→ Beta



Secondary



JSS 1

→ Alpha

→ Beta



A class section should show:



- Class teacher

- Assistant

- Minder

- Student count

- Subjects

- Current syllabus progress

- Attendance

- Recent activity



---



14. TEACHER MANAGEMENT



Teacher directory.



Each teacher has a profile.



Profile:



- Photo

- Name

- Employee ID

- Contact information

- Subjects

- Classes

- Qualifications

- Role

- Status



Teacher dashboard:



Today's Classes

Upcoming Classes

Pending Scores

Syllabus Progress

Recent Activity



Teacher should only see classes and subjects assigned to them.



---



15. TEACHER WORKSPACE



This is one of the most important parts of the application.



Teacher logs in and immediately sees:



Good morning, Jane.



Today's Classes



09:00

Mathematics

Primary 3 Alpha



11:00

English

Primary 4 Beta



For each class:



Open Class



Show:



Students

Attendance

Lesson

Syllabus

Scores



Teacher should be able to mark student attendance.



Then choose:



Today's Lesson



Subject:

Mathematics



Syllabus:



Fractions



Topics:



Introduction to fractions

Equivalent fractions

Comparing fractions



Teacher selects:



✓ Introduction to fractions



Then:



Mark Lesson Complete



Record:



- Teacher

- Class

- Subject

- Topic

- Date

- Time

- Academic session

- Term



This activity should contribute to syllabus progress and teacher activity tracking.



---



16. SYLLABUS MANAGEMENT



Create a syllabus management interface.



Structure:



Subject

→ Term

→ Units

→ Topics

→ Subtopics



Example:



Mathematics

Term 1



Numbers

Addition

Subtraction

Multiplication

Division

Fractions



Show:



Completed

In progress

Upcoming



Provide progress indicators.



Example:



Primary 3 Mathematics



Syllabus progress:

64%



---



17. ATTENDANCE



Create attendance management.



Teachers can mark attendance for their assigned classes.



Statuses:



Present

Absent

Late

Excused



Show:



Today's attendance



Weekly attendance



Term attendance



Student attendance history



School administrators can see:



- Class attendance

- Student attendance

- Teacher activity

- Attendance trends



---



18. ASSESSMENTS AND RESULTS



Create assessment management.



School can configure assessment structure.



Example:



CA 1 — 10%

CA 2 — 10%

Assignment — 10%

Exam — 70%



Teacher enters scores.



Create a clean spreadsheet-like score-entry experience.



Example:



Student | CA1 | CA2 | Assignment | Exam | Total | Grade



Make data entry fast.



Support:



- Keyboard navigation

- Auto calculation

- Validation

- Save draft

- Submit results



---



19. RESULT APPROVAL



For Professional/Enterprise schools:



Teacher submits results.



Status:



Draft

Submitted

Under Review

Approved

Published



Administrators can review and approve.



Once published, results become visible to parents where permitted.



---



20. REPORT CARDS



Create a report card generator.



Report card should use school branding.



Include:



- Student details

- Class

- Subjects

- Scores

- Grades

- Attendance

- Teacher comments

- Principal comments

- Promotion status



Actions:



Preview

Generate PDF

Send Email

Send via WhatsApp

Publish to Parent Portal



---



21. PARENT PORTAL



Create a completely separate parent experience.



Parent dashboard:



Good morning, Mrs. Okafor.



My Children



David Okafor

Primary 3 Alpha



Sarah Okafor

Primary 1 Beta



Parent can switch between children.



For each child:



Overview

Results

Attendance

Report Cards

School Messages

Academic Progress



Parent should receive notifications.



Example:



"David's Term 2 report card is now available."



Communication should feel modern and friendly.



---



22. COMMUNICATION MODULE



Create a modern communication centre.



Channels:



In-app

Email

WhatsApp



Create message interface.



Recipient options:



All Parents

Specific Class

Specific Section

Teachers

Individual Parent



Show message history.



Allow:



- Drafts

- Scheduled messages

- Sent messages

- Delivery status

- Search



Use a feed/conversation-inspired design rather than a traditional email administration screen.



---



23. IMPORT SYSTEM



This is critical.



Create a beautiful import wizard.



Import:



Students

Parents

Teachers

Classes

Academic records



Workflow:



Step 1:

Upload CSV/Excel



Step 2:

Map columns



Step 3:

Validate



Step 4:

Show errors



Step 5:

Preview



Step 6:

Confirm Import



Step 7:

Import completed



Show useful validation messages:



Duplicate admission number

Missing parent phone

Unknown class

Invalid email

Missing required field



Never silently import bad data.



---



24. SCHOOL ONBOARDING



Create a guided setup wizard.



Step 1

School information



Step 2

Academic structure



Step 3

Academic session



Step 4

Classes



Step 5

Teachers



Step 6

Students



Step 7

Parents



Step 8

Subjects



Step 9

Syllabus



Step 10

Grading system



Step 11

Domain



Step 12

Branding



Step 13

Invite users



Step 14

Go Live



Show onboarding progress.



---



25. DOMAIN SETUP EXPERIENCE



Create:



Settings

→ Domain



Allow administrator to enter:



portal.schooldomain.edu.ng



Show DNS instructions.



After verification:



✓ Domain verified

✓ SSL active

✓ School connected



Also show a fallback platform URL.



---



26. SCHOOL SETTINGS



Create a settings area with:



School Profile

Branding

Academic Sessions

Terms

Classes

Subjects

Grading

Users

Roles & Permissions

Notifications

Communication

Domain

Subscription

Billing

Integrations



---



27. NOTIFICATIONS



Create a modern notification centre.



Notifications may include:



- New message

- Result published

- Report card available

- Student absent

- Lesson completed

- Teacher submitted results

- Parent message

- Subscription warning



Use clear notification grouping and timestamps.



---



28. SEARCH



Build global search.



Users should be able to search relevant records based on their permissions.



Examples:



David Okafor



Results:



Student

David Okafor

Primary 3 Alpha



Parent

Michael Okafor



Teacher

David Johnson



Search should feel fast and modern.



---



29. RESPONSIVE DESIGN



The entire application must be responsive.



Desktop:

Optimized for large screens.



Tablet:

Adapt navigation and content.



Mobile:

Fully redesigned responsive experience.



Do NOT simply shrink desktop components.



On mobile:



- Use compact top navigation

- Bottom navigation where appropriate

- Slide-over menus

- Mobile-friendly tables

- Large touch targets

- Mobile-first forms



Teachers will potentially use this on their phones, so teacher workflows must be particularly mobile-friendly.



---



30. EMPTY STATES



Design proper empty states.



Examples:



"No students yet."



"Import your existing student records to get started."



"No results submitted."



"Your teachers haven't submitted results for this term."



Do not leave blank screens.



---



31. LOADING STATES



Use polished skeleton loaders.



Do not rely on generic spinners everywhere.



---



32. ERROR STATES



Create useful error messages.



Bad:



"Something went wrong."



Better:



"We couldn't import 14 students because their admission numbers are duplicated."



Give the user a clear action.



---



33. DESIGN SYSTEM



Create a consistent design system.



Use:



- Modern typography

- Generous whitespace

- Clean borders

- Subtle shadows only where necessary

- Consistent spacing

- Consistent iconography

- Clear hierarchy

- Accessible contrast

- Consistent buttons

- Consistent forms

- Consistent tables

- Consistent modal/dialog behaviour



Cards should be clean and simple.



Do not place cards inside cards inside cards.



Avoid excessive visual decoration.



---



34. VISUAL PERSONALITY



The product should feel like a premium modern SaaS application.



It should be:



Warm enough for education.



Professional enough for school administrators.



Simple enough for teachers.



Friendly enough for parents.



It should NOT feel like:



- Government software

- Banking software

- Old ERP software

- Generic CRM

- AI-generated dashboard



---



35. DEMO DATA



Populate the application with realistic demo data.



Create a fictional school:



Greenfield International School



Use realistic data for:



- 500+ students

- 30+ teachers

- 20+ classes

- Parents

- Subjects

- Results

- Attendance

- Lessons

- Syllabus

- Communications



The application should feel alive when opened.



Do not use repetitive fake data such as:



"John Doe 1"

"John Doe 2"

"Test User"



Use believable fictional names.



---



36. APPLICATION STATES



Build the UI for:



- New school

- Active school

- Trial school

- Expired subscription

- Suspended school

- Empty school

- Fully populated school



Also design upgrade states.



For example:



A school on Essential attempts to access Parent Portal.



Show a tasteful upgrade prompt:



"Connect parents to their children's academic journey."



Professional plan required.



[View upgrade options]



Do not make this feel aggressive.



---



37. CORE NAVIGATION



School admin:



Overview

Students

Teachers

Classes

Academics

Results

Communication

Reports

More



Teacher:



Home

My Classes

Lessons

Attendance

Results

Messages

Profile



Parent:



Home

Children

Results

Attendance

Reports

Messages

Profile



Platform admin:



Dashboard

Schools

Subscriptions

Features

Domains

Users

Analytics

Settings



Navigation must change according to role.



---



38. IMPORTANT UX PRINCIPLE



Every screen must answer:



What can this user do here?



Avoid screens that only display information.



Provide contextual actions.



Examples:



Student page:



Edit

Message Parent

View Results



Teacher:



Start Lesson

Take Attendance

Enter Scores



School Admin:



Add Student

Import Students

Add Teacher

Create Class



Parent:



View Report

Message School

View Attendance



---



39. DO NOT BUILD JUST STATIC MOCKUPS



The application must feel like a working SaaS product.



Implement:



- Navigation

- Routing

- Forms

- Modals

- Dropdowns

- Tabs

- Search

- Filtering

- Pagination

- CRUD interactions

- Import workflow

- Role-based views

- Subscription states

- Feature gating

- Domain configuration UI

- Notifications

- Profile management

- Dashboard interactions



Use realistic application state.



Where backend functionality cannot yet be implemented, create clean mock services/data abstractions so the UI is ready to connect to a real backend later.



Do not create fake buttons that do nothing.



---



40. TECHNICAL DIRECTION



Build the application with a scalable architecture suitable for a production SaaS.



Use:



- Component-based architecture

- Reusable UI components

- Centralized design tokens

- Role-based permissions

- Tenant-aware data architecture

- Feature flags/entitlements

- Secure authentication

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e55fc470-1218-4c7d-b670-f18ca51b0844).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
