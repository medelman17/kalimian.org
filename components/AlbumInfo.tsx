import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { movements } from "@/lib/data";
import { Music, Play } from "lucide-react";
import Link from "next/link";

export function AlbumInfo() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Movements</h2>
        <div className="space-y-8">
          {movements.map((movement) => (
            <Card
              key={movement.number}
              className="overflow-hidden rounded-lg shadow-sm border p-0"
            >
              <div className="bg-primary p-4 text-primary-foreground rounded-t-lg">
                <h3 className="text-2xl font-bold flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-primary-foreground/80 whitespace-nowrap">
                    Movement {movement.number}:
                  </span>{" "}
                  <span className="leading-tight">{movement.title}</span>
                </h3>
                <p className="mt-2 text-primary-foreground/90">
                  {movement.description}
                </p>
              </div>

              <CardContent className="p-6 py-2">
                <p className="mb-6 text-foreground/80">{movement.content}</p>

                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Music className="h-5 w-5" />
                  <span>Tracks</span>
                </h4>

                <Accordion type="single" collapsible className="w-full">
                  {movement.tracks.map((track) => (
                    <AccordionItem
                      key={`${movement.number}-${track.title}-${track.artist}`}
                      value={`track-${movement.number}-${track.title}`}
                    >
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex justify-between items-center w-full pr-4">
                          <div className="text-left">
                            <span className="font-medium">{track.title}</span>
                            <span className="text-foreground/70 ml-2 hidden sm:inline">
                              by {track.artist}
                            </span>
                            <span className="text-foreground/70 block sm:hidden text-sm">
                              by {track.artist}
                            </span>
                          </div>
                          <Badge variant="outline" className="ml-2 shrink-0">
                            {track.duration}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-1 pb-4">
                        <p className="mb-4 text-foreground/80">
                          {track.description}
                        </p>

                        {track.streamingLinks &&
                          track.streamingLinks.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {track.streamingLinks.map((link) => (
                                <Link
                                  key={`${track.title}-${link.platform}-${link.url}`}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                                >
                                  <Play className="h-3.5 w-3.5" />
                                  {link.platform === "appleMusic"
                                    ? "Apple Music"
                                    : link.platform === "spotify"
                                    ? "Spotify"
                                    : link.platform === "youtube"
                                    ? "YouTube"
                                    : link.platform}
                                  {link.isOfficial && (
                                    <Badge
                                      variant="outline"
                                      className="ml-1 text-xs py-0"
                                    >
                                      Official
                                    </Badge>
                                  )}
                                </Link>
                              ))}
                            </div>
                          )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
