import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-primary to-background">
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'url("/images/album-cover.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
        }}
      />
      <div className="container px-4 py-32 mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-primary-foreground drop-shadow-md">
          Not all epics need dragons or starships.
        </h1>
        <h2 className="text-2xl md:text-3xl text-slate-100 mb-6 font-medium">
          Some are fought under flickering fluorescents, through leaking
          ceilings and unread email--in the smoldering absurdity of modern
          tenant life.
        </h2>

        <p className="text-base sm:text-lg mb-12 text-slate-200">
          Across ten acts,{" "}
          <span className="italic">
            When David Takes On Goliath: An Emotional Journey Through Conflict
            and Resolution at 10 Ocean Blvd
          </span>
          --Kalimian and the Inequities debut and immediate swan song, dissolved
          mid-tour under Chapter 11 after blundering away their family
          fortune--charts the descent from hopeful beginnings to systemic
          neglect, the ignition of resistance, and the strategic grind of legal
          warfare. The stakes are real. The tracks are curated. The arc is
          undeniable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="default" className="px-6 py-2" asChild>
            <Link
              href="https://music.apple.com/us/playlist/when-david-takes-on-goliath-an-emotional-journey/pl.u-3EDbUP4Ayrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="mr-2">▶</span> Listen on Apple Music
            </Link>
          </Button>

          <Button
            variant="outline"
            className="px-6 py-2 bg-white/10 text-white border-white/20 hover:bg-white/20"
            asChild
          >
            <Link
              href="https://open.spotify.com/playlist/07bKRNoX43Agib3AFmJpQI?si=SJHE1grlSWCQtqD90MSnPA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="mr-2">▶</span> Listen on Spotify
            </Link>
          </Button>

          <Button
            variant="outline"
            className="px-6 py-2 bg-white/10 text-white border-white/20 hover:bg-white/20"
            asChild
          >
            <Link
              href="https://youtube.com/playlist?list=PLUqKoEbJs0G0l7rOfLgosDdzYD0Q9OslZ&si=0l7Ts4sZ_xtz8_rc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="mr-2">▶</span> Listen on YouTube
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
