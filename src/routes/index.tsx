import { createFileRoute } from "@tanstack/react-router";
import { useSiteData, safeHref } from "@/lib/khayal-store";
import { KhayalLogo } from "@/components/KhayalLogo";
import { SideNav } from "@/components/SideNav";
import { Button } from "@/components/ui/button";
import { VisitorCounter } from "@/components/VisitorCounter";
import { DiscordLiveCount } from "@/components/DiscordLiveCount";
import { EventCountdown } from "@/components/EventCountdown";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Khayal Community — مجتمع الخيال للألعاب" },
      { name: "description", content: "انضم إلى Khayal Community، أكبر مجتمع عربي للاعبين." },
    ],
  }),
  component: Home,
});

function Home() {
  const [data] = useSiteData();

  return (
    <div dir="rtl" className="min-h-screen text-foreground overflow-x-hidden">
      <SideNav />

      {/* HERO */}
      <header className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 neon-grid-bg">
        {/* Static neon glows (no animation = no lag) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 30% 30%, oklch(0.65 0.25 300 / 0.35), transparent 70%), radial-gradient(ellipse 45% 35% at 75% 60%, oklch(0.85 0.18 200 / 0.28), transparent 70%), radial-gradient(ellipse 40% 30% at 50% 90%, oklch(0.78 0.24 350 / 0.3), transparent 70%)",
          }}
        />

        <div className="relative z-10 text-center max-w-3xl">
          <div className="relative inline-block mb-8">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full blur-2xl opacity-70"
              style={{ background: "radial-gradient(circle, oklch(0.78 0.24 350 / 0.6), transparent 70%)" }}
            />
            <KhayalLogo className="relative h-32 w-32 mx-auto drop-shadow-[0_0_25px_oklch(0.85_0.18_200/0.7)]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, oklch(0.85 0.18 200), oklch(0.78 0.24 350), oklch(0.65 0.25 300))",
                filter: "drop-shadow(0 0 18px oklch(0.78 0.24 350 / 0.45))",
              }}
            >
              {data.siteName}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">{data.tagline}</p>

          <div className="flex flex-col items-center gap-5">
            <Button
              asChild
              size="lg"
              className="font-black text-base px-10 h-12 rounded-xl border bg-transparent neon-border-pink text-foreground hover:bg-[oklch(0.78_0.24_350/0.15)] transition-colors"
            >
              <a href={safeHref(data.discordLink)} target="_blank" rel="noreferrer">
                انضم للديسكورد
              </a>
            </Button>
            {data.showVisitorCounter && <VisitorCounter />}
          </div>
        </div>

        {/* bottom fade */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-32 -z-10"
          style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
        />
      </header>

      {/* COUNTDOWN */}
      {data.upcomingEvent && (
        <div className="px-6 max-w-5xl mx-auto -mt-10 relative z-10">
          <EventCountdown event={data.upcomingEvent} />
        </div>
      )}

      {/* STATS */}
      {(data.serverStats.length > 0 || data.discordServerId) && (
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="neon-text-cyan font-bold tracking-[0.3em] text-xs mb-3">// STATS</p>
            <h2 className="text-3xl md:text-5xl font-black">
              <span className="neon-text-pink">إحصائيات</span> السيرفر
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {data.discordServerId && <DiscordLiveCount serverId={data.discordServerId} />}
            {data.serverStats.map((s, i) => {
              const colors = ["neon-border-cyan", "neon-border-pink", "neon-border-purple"];
              const cls = colors[i % colors.length];
              return (
                <div
                  key={s.id}
                  className={`rounded-2xl bg-card/60 backdrop-blur-sm border p-6 text-center transition-transform hover:-translate-y-1 ${cls}`}
                >
                  <div className="text-4xl mb-3">{s.icon}</div>
                  <div className="text-3xl md:text-4xl font-black neon-text-cyan mb-1 tabular-nums">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* PERKS */}
      {data.serverPerks.length > 0 && (
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="neon-text-cyan font-bold tracking-[0.3em] text-xs mb-3">// PERKS</p>
            <h2 className="text-3xl md:text-5xl font-black">
              <span className="neon-text-pink">مميزات</span> السيرفر
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {data.serverPerks.map((p, i) => {
              const cls = i % 2 === 0 ? "neon-border-purple" : "neon-border-cyan";
              return (
                <div
                  key={p.id}
                  className={`rounded-2xl bg-card/60 backdrop-blur-sm border p-6 flex gap-4 items-start transition-transform hover:-translate-y-1 ${cls}`}
                >
                  <div className="text-4xl shrink-0">{p.icon}</div>
                  <div>
                    <h3 className="text-xl font-black mb-1 neon-text-cyan">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <footer className="border-t border-border/50 py-8 px-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} <span className="neon-text-pink">{data.siteName}</span>
      </footer>
    </div>
  );
}
