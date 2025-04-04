"use client";

import { Button } from "@/components/ui/button";

interface CardActionsProps {
  docsUrl: string;
  learnMoreUrl: string;
  docsText?: string;
  learnMoreText?: string;
}

export function CardActions({
  docsUrl,
  learnMoreUrl,
  docsText = "Documentation",
  learnMoreText = "Learn More",
}: CardActionsProps) {
  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(docsUrl, "_blank")}
      >
        {docsText}
      </Button>
      <Button size="sm" onClick={() => window.open(learnMoreUrl, "_blank")}>
        {learnMoreText}
      </Button>
    </div>
  );
}
