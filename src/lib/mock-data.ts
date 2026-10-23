export type Source = "github" | "jira" | "calendar" | "meeting";

export interface Signal {
  id: string;
  source: Source;
  title: string;
  detail: string;
  who: string;
  time: string;
  tag?: string;
  project: string;
}

export const signals: Signal[] = [
  { id: "1", source: "github", title: "PR #482 merged — Checkout v2 payment retries", detail: "+412 −88 across 14 files. Closes PAY-219.", who: "Priya S.", time: "08:41", tag: "merged", project: "Payments" },
  { id: "2", source: "meeting", title: "Design review: Onboarding revamp", detail: "Decided to drop step 3 (team invite). Rahul owns copy update by Tue.", who: "6 attendees", time: "08:15", tag: "3 decisions", project: "Growth" },
  { id: "3", source: "jira", title: "PAY-224 moved to Blocked", detail: "Waiting on Stripe sandbox credentials from finance.", who: "Arjun K.", time: "07:58", tag: "blocked", project: "Payments" },
  { id: "4", source: "github", title: "12 commits pushed to feat/search-ranking", detail: "Mostly tests + feature flag wiring. No PR opened yet.", who: "Meera D.", time: "07:30", tag: "wip", project: "Search" },
  { id: "5", source: "calendar", title: "Sprint 34 planning — today 15:00", detail: "No agenda yet. 9 tickets unestimated in backlog.", who: "Engineering", time: "07:00", tag: "prep needed", project: "All" },
  { id: "6", source: "jira", title: "GRO-88 Onboarding step removal created", detail: "Auto-created from design review decision.", who: "PM Copilot", time: "06:52", tag: "auto", project: "Growth" },
  { id: "7", source: "github", title: "PR #479 awaiting review for 3 days", detail: "Search filters API. 2 reviewers requested, 0 responses.", who: "Leo M.", time: "Yesterday", tag: "stale", project: "Search" },
  { id: "8", source: "meeting", title: "Customer call: Acme Corp", detail: "Requested CSV export for invoices. Mentioned renewal risk.", who: "Sales + PM", time: "Yesterday", tag: "feature ask", project: "Payments" },
];

export const actions = [
  { id: "a1", text: "Unblock PAY-224 — ping finance for Stripe credentials", urgent: true },
  { id: "a2", text: "Nudge reviewers on PR #479 (3 days stale)", urgent: true },
  { id: "a3", text: "Draft sprint 34 agenda from backlog", urgent: false },
  { id: "a4", text: "Log Acme CSV export request as a feature ticket", urgent: false },
];

export const projects = [
  { name: "Payments", progress: 72, health: "at risk", done: 18, total: 25 },
  { name: "Growth", progress: 54, health: "on track", done: 13, total: 24 },
  { name: "Search", progress: 38, health: "slipping", done: 8, total: 21 },
];

export const integrations: { source: Source; name: string; status: string }[] = [
  { source: "github", name: "GitHub", status: "3 repos · synced 2m ago" },
  { source: "jira", name: "Jira", status: "2 boards · synced 4m ago" },
  { source: "calendar", name: "Google Calendar", status: "Team calendar · live" },
  { source: "meeting", name: "Meetings", status: "Transcripts · 2 today" },
];
