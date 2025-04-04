"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SubscribeForm() {
  return (
    <div className="w-full max-w-md">
      <form
        className="flex w-full items-center space-x-2 mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Thank you for subscribing!");
        }}
      >
        <Input type="email" placeholder="Enter your email" required />
        <Button type="submit">Subscribe</Button>
      </form>
      <p className="text-xs text-muted-foreground text-center">
        Subscribe to our newsletter to get updates about new features.
      </p>
    </div>
  );
}
