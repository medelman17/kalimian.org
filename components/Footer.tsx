import Link from "next/link";
import { Github, Instagram, Music, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-foreground/5 border-t py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left side - branding and copyright */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Kalimian and the Inequities
            </h3>
            <p className="text-sm text-foreground/70">
              A prog-rock odyssey about housing justice and tenant rights.
            </p>
            <p className="text-sm text-foreground/60">
              © {currentYear} You Were Warned Records. All rights reserved.
            </p>
          </div>

          {/* Middle - links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#showcase"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  The Concept
                </Link>
              </li>
              <li>
                <Link
                  href="#movements"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  Movements
                </Link>
              </li>
              <li>
                <Link
                  href="#apple-music"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  Listen
                </Link>
              </li>
            </ul>
          </div>

          {/* Right side - social links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://music.apple.com/us/playlist/your-playlist-url"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                <Music className="h-5 w-5" />
                <span className="sr-only">Apple Music</span>
              </a>
            </div>
            <p className="text-xs text-foreground/60 max-w-[200px]">
              Stream the concept album on all major platforms
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
