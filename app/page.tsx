import JourneyExperience from "@/components/JourneyExperience";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-emerald-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.35),_rgba(2,6,23,0.6)_55%,_rgba(2,6,23,1))]"
      />
      <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-6 pb-24 pt-24 text-center sm:gap-8 sm:pt-32">
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-xs uppercase tracking-[0.4em] text-emerald-200/80">
          Markeljan Sokoli · soko.eth
        </span>
        <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
          A contribution-style journey you can hover, tap, and dive into.
        </h1>
        <p className="max-w-2xl text-base text-emerald-100/80 sm:text-lg">
          This portfolio reimagines my path as an interactive contributions grid. Hover across the timeline to preview each
          milestone, click tiles to keep their stories in focus, and watch this space grow as I embed live demos, videos, and
          notes from every project.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/markeljan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
          >
            View active repos
            <span aria-hidden>↗</span>
          </a>
          <a
            href="https://x.com/soko_eth"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-transparent px-5 py-3 text-sm font-semibold text-emerald-100/80 transition hover:border-emerald-300 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
          >
            Follow the build-in-public feed
            <span aria-hidden>↗</span>
          </a>
        </div>
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-200/60">Start exploring below ↓</p>
      </section>
      <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <JourneyExperience />
      </div>
      <section className="mx-auto w-full max-w-4xl px-6 pb-32 text-center text-emerald-100/70">
        <h2 className="text-2xl font-semibold text-emerald-50 sm:text-3xl">
          The timeline is just getting started.
        </h2>
        <p className="mt-4 text-base sm:text-lg">
          Upcoming iterations will pull in live product demos, ETHGlobal footage, and interactive widgets sourced from across the
          web. If you want to collaborate or have artifacts that belong here, reach out on X or drop a note in my repos.
        </p>
      </section>
    </main>
  );
}
