import { createFileRoute, Link } from "@tanstack/react-router";
import { useSiteData } from "@/lib/khayal-store";
import { SideNav } from "@/components/SideNav";

export const Route = createFileRoute("/features")({
  head: () => ({ meta: [{ title: "المميزات — Khayal Community" }] }),
  component: FeaturesPage,
});

function FeaturesPage() {
  const [data] = useSiteData();
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <SideNav />
      <section className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent font-bold tracking-widest text-sm mb-3">// FEATURES</p>
          <h1 className="text-4xl md:text-6xl font-black">ليش Khayal؟</h1>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.features.map((f) => (
            <div key={f.id} className="p-8 rounded-2xl bg-card border border-border hover:border-accent transition-all hover:shadow-[0_0_40px_oklch(0.65_0.18_215/0.2)]">
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/" className="text-accent hover:underline">← الرئيسية</Link>
        </div>
      </section>
    </div>
  );
}
