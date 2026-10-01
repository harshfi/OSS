export default function Home() {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-8">
      <section className="text-center py-20">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Make your first open-source contribution
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-[700px] mx-auto">
          A guided, hands-on path from "what is a fork?" to your first merged PR.
        </p>
      </section>
      
      <section className="grid md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-xl bg-card">
          <h3 className="font-semibold text-lg mb-2">Never used Git?</h3>
          <p className="text-muted-foreground text-sm">Start from the very beginning with our step-by-step learning modules.</p>
        </div>
        <div className="p-6 border rounded-xl bg-card">
          <h3 className="font-semibold text-lg mb-2">Know Git, never contributed?</h3>
          <p className="text-muted-foreground text-sm">See how the fork-and-pull workflow actually works.</p>
        </div>
        <div className="p-6 border rounded-xl bg-card">
          <h3 className="font-semibold text-lg mb-2">Ready for programs?</h3>
          <p className="text-muted-foreground text-sm">Explore open source programs like GSoC and LFX.</p>
        </div>
      </section>
    </div>
  );
}
