"use client";

import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-xl text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-7 w-7 text-destructive" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-lg text-muted-foreground">
          The page you are trying to access does not exist or may have been
          moved. Please verify the URL or return to the homepage.
        </p>

        {/* Action */}
        <div className="pt-4">
          <Button asChild size="lg" className="font-bold">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
