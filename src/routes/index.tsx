import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { actions, integrations, projects, signals, type Source } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Relay — Your autopilot product manager" },
      { name: "description", content: "Relay syncs GitHub, Jira, calendars and meetings into a daily brief, action items and project health." },
      { property: "og:title", content: "Relay — Your autopilot product manager" },
      { property: "og:description", content: "Commits, tickets, meetings and calendars turned into a daily PM brief." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const srcMeta: Record<Source, { label: string; dot: string; glyph: string }> = {
  github: { label: "GitHub", dot: "bg-src-github", glyph: "⌥" },
  jira: { label: "Jira", dot: "bg-src-jira", glyph: "◆" },
  calendar: { label: "Calendar", dot: "bg-src-calendar", glyph: "◷" },
  meeting: { label: "Meeting", dot: "bg-src-meeting", glyph: "❝" },
};

const filters: ("all" | Source)[] = ["all", "github", "jira", "calendar", "meeting"];

function Index() {
  const [filter, setFilter] = useState<"all" | Source>("all");
  const [done, setDone] = useState<string[]>([]);
  const list = signals.filter((s) => filter === "all" || s.source === filter);

  return (
    <div className="min-h-screen grain">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary font-display text-lg italic text-primary-foreground">r</span>
            <span className="font-display text-2xl">Relay</span>
            <span className="ml-2 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">PM autopilot</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-signal animate-pulse-dot" />
            Listening to 4 sources
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_340px]">
        <section className="space-y-10">
          {/* Brief */}
          <div className="animate-rise">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Friday · Morning brief</p>
            <h1 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">
              Payments shipped retries, <em className="text-muted-foreground">but one blocker</em> could slip the sprint.
            </h1>
            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              {[
                ["14", "commits"],
                ["3", "PRs merged"],
                ["2", "meetings digested"],
                ["5", "tickets auto-updated"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-xl border bg-card p-4 shadow-soft">
                  <div className="font-display text-3xl">{n}</div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Feed */}
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-3xl">Signal stream</h2>
              <div className="flex gap-1 rounded-full border bg-card p-1">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "rounded-full px-3 py-1 font-mono text-xs capitalize transition-colors",
                      filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {f === "all" ? "all" : srcMeta[f].label}
                  </button>
                ))}
              </div>
            </div>
            <ol className="relative space-y-3 border-l pl-6">
              {list.map((s, i) => (
                <li key={s.id} className="group relative animate-rise" style={{ animationDelay: `${i * 50}ms` }}>
                  <span className={cn("absolute -left-[31px] top-5 h-3 w-3 rounded-full ring-4 ring-background", srcMeta[s.source].dot)} />
                  <div className="rounded-xl border bg-card p-4 shadow-soft transition-transform duration-300 group-hover:-translate-y-0.5">
                    <div className="flex items-center justify-between gap-3 font-mono text-[11px] text-muted-foreground">
                      <span>{srcMeta[s.source].glyph} {srcMeta[s.source].label} · {s.project}</span>
                      <span>{s.time}</span>
                    </div>
                    <div className="mt-2 font-medium">{s.title}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{s.detail}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{s.who}</span>
                      {s.tag && (
                        <span className={cn(
                          "rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                          ["blocked", "stale"].includes(s.tag) ? "bg-destructive/10 text-destructive" : "bg-secondary text-secondary-foreground",
                        )}>{s.tag}</span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl bg-primary p-5 text-primary-foreground shadow-soft animate-rise">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl">Do next</h3>
              <span className="font-mono text-xs opacity-60">{actions.length - done.length} open</span>
            </div>
            <ul className="mt-4 space-y-2">
              {actions.map((a) => {
                const isDone = done.includes(a.id);
                return (
                  <li key={a.id}>
                    <button
                      onClick={() => setDone((d) => (isDone ? d.filter((x) => x !== a.id) : [...d, a.id]))}
                      className="flex w-full items-start gap-3 rounded-lg p-2 text-left text-sm transition-colors hover:bg-primary-foreground/10"
                    >
                      <span className={cn("mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-primary-foreground/40", isDone && "border-signal bg-signal text-signal-foreground")}>
                        {isDone && <span className="text-[10px]">✓</span>}
                      </span>
                      <span className={cn(isDone && "line-through opacity-50")}>
                        {a.text}
                        {a.urgent && !isDone && <span className="ml-2 rounded bg-signal px-1.5 font-mono text-[9px] uppercase text-signal-foreground">urgent</span>}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-soft">
            <h3 className="font-display text-2xl">Project pulse</h3>
            <div className="mt-4 space-y-4">
              {projects.map((p) => (
                <div key={p.name}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{p.name}</span>
                    <span className={cn("font-mono text-[11px] uppercase", p.health === "on track" ? "text-src-meeting" : "text-destructive")}>{p.health}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${p.progress}%` }} />
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-muted-foreground">{p.done}/{p.total} tickets</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-soft">
            <h3 className="font-display text-2xl">Sources</h3>
            <ul className="mt-4 space-y-3">
              {integrations.map((i) => (
                <li key={i.name} className="flex items-center gap-3">
                  <span className={cn("grid h-8 w-8 place-items-center rounded-lg text-sm text-primary-foreground", srcMeta[i.source].dot)}>{srcMeta[i.source].glyph}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{i.name}</div>
                    <div className="font-mono text-[11px] text-muted-foreground">{i.status}</div>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-signal" />
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
