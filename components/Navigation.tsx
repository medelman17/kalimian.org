"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Music, Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePlayer = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="text-lg font-semibold">
                Kalimian and the Inequities
              </Link>
              <Badge
                variant="secondary"
                className="animate-pulse bg-amber-100 text-amber-700 font-medium"
              >
                Swan Song Alert!
              </Badge>
            </div>

            <div className="flex items-center">
              <div className="hidden md:flex items-center space-x-4 mr-6">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="#showcase">The Concept</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="#movements">Movements</Link>
                </Button>
              </div>

              <Button size="sm" className="gap-2" onClick={togglePlayer}>
                <Music className="h-4 w-4" /> Listen Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Persistent Music Player */}
      <div
        className={`fixed right-0 bottom-0 z-40 bg-background transition-all duration-300 ease-in-out shadow-lg border border-border ${
          isExpanded ? "w-full sm:w-[500px] h-[500px]" : "w-64 h-16"
        }`}
      >
        <div
          className={`absolute inset-0 flex flex-col ${
            isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex justify-between items-center p-2 border-b">
            <span className="font-medium">Now Playing</span>
            <Button variant="ghost" size="icon" onClick={togglePlayer}>
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 p-2 overflow-hidden">
            <iframe
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              frameBorder="0"
              height="100%"
              style={{
                width: "100%",
                overflow: "hidden",
                borderRadius: "8px",
              }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src="https://embed.music.apple.com/us/playlist/when-david-takes-on-goliath-an-emotional-journey/pl.u-3EDbUP4Ayrl"
              title="Kalimian and the Inequities - Apple Music Playlist"
            />
          </div>
        </div>

        <div
          className={`flex items-center justify-between h-full px-3 ${
            isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="flex items-center">
            <Music className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium truncate">
              Kalimian and the Inequities
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={togglePlayer}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
