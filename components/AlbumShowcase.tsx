import Image from "next/image";

export function AlbumShowcase() {
  return (
    <section id="showcase" className="py-16 bg-background">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          {/* Album Artwork */}
          <div className="w-full xl:w-1/3">
            <div className="aspect-square relative rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/album-cover.png"
                alt="When David Takes On Goliath album cover"
                fill
                className="object-cover"
              />
            </div>

            {/* Album Title and Description - Shows under album on all but XL screens */}
            <div className="mt-12 space-y-6 xl:hidden">
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-foreground text-center">
                Rent Seekers Beware: Prog-Rock Precision Meets Tenant Fury.
              </h2>

              <p className="text-base sm:text-lg text-foreground/80">
                The artist(s) behind this project didn&apos;t just write
                songs—they weaponized a housing dispute. Anchored at the
                infamous{" "}
                <span className="font-medium text-foreground">
                  10 Ocean Blvd
                </span>
                , this is a prog-rock odyssey where every act is a procedural
                motion, every lyric a legal jab.
              </p>
              <p className="text-base sm:text-lg text-foreground/80">
                From hopeful leases to hostile hearings, it charts the collapse,
                resistance, and courtroom brinksmanship with operatic ambition.
                This isn&apos;t just a concept album—it&apos;s a case file set
                to rhythm.
              </p>
              <p className="text-base sm:text-lg text-foreground/80">
                The soundtrack? A precision-cut arsenal from the rock and pop
                canon, each track chosen not just for what it says—but for how
                it *feels* in the heat of battle. Evidence, elevated.
              </p>

              <div className="mt-10 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Record Label
                    </h3>
                    <p className="text-foreground">You Were Warned Records</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Release Date
                    </h3>
                    <p className="text-foreground">2025</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Duration
                    </h3>
                    <p className="text-foreground">3+ hours</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Tracks
                    </h3>
                    <p className="text-foreground">45</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Genre
                    </h3>
                    <p className="text-foreground">Prog-Rock, Legal Drama</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Producer
                    </h3>
                    <p className="text-foreground">SMH Productions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Album Details */}
          <div className="w-full xl:w-2/3 space-y-6">
            {/* Album Title - Only shows on XL screens */}
            <h2 className="hidden xl:block text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-foreground">
              Rent Seekers Beware: Prog-Rock Precision Meets Tenant Fury.
            </h2>

            {/* Album Description - Only shows on XL screens */}
            <div className="hidden xl:block space-y-4">
              <p className="text-base sm:text-lg text-foreground/80">
                The artist(s) behind this project didn&apos;t just write
                songs—they weaponized a housing dispute. Anchored at the
                infamous{" "}
                <span className="font-medium text-foreground">
                  10 Ocean Blvd
                </span>
                , this is a prog-rock odyssey where every act is a procedural
                motion, every lyric a legal jab.
              </p>
              <p className="text-base sm:text-lg text-foreground/80">
                From hopeful leases to hostile hearings, it charts the collapse,
                resistance, and courtroom brinksmanship with operatic ambition.
                This isn&apos;t just a concept album—it&apos;s a case file set
                to rhythm.
              </p>
              <p className="text-base sm:text-lg text-foreground/80">
                The soundtrack? A precision-cut arsenal from the rock and pop
                canon, each track chosen not just for what it says—but for how
                it *feels* in the heat of battle. Evidence, elevated.
              </p>
            </div>

            {/* Album Details - Desktop and XL screens (only displays on XL) */}
            <div className="mt-8 space-y-4 hidden xl:block">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Record Label
                  </h3>
                  <p className="text-foreground">You Were Warned Records</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Release Date
                  </h3>
                  <p className="text-foreground">2025</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Duration
                  </h3>
                  <p className="text-foreground">3+ hours</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Tracks
                  </h3>
                  <p className="text-foreground">45</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Genre
                  </h3>
                  <p className="text-foreground">Prog-Rock, Legal Drama</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Producer
                  </h3>
                  <p className="text-foreground">SMH Productions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
