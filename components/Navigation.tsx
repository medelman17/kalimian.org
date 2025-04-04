import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export function Navigation() {
  return (
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
                <Link href="#concept">The Concept</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="#movements">Movements</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="#listen">Listen</Link>
              </Button>
            </div>

            <Button size="sm" className="gap-2" asChild>
              <Link
                href="https://music.apple.com/us/playlist/when-david-takes-on-goliath-an-emotional-journey/pl.u-3EDbUP4Ayrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Listen Now <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
