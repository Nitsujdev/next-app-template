"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
const PublicFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mt-4 bg-background-offset text-foreground">
      <div className="container py-8 flex flex-col md:flex-row justify-between gap-4 items-end">
        <div className="flex flex-col items-start gap-2">
          <Image
            src="/brand/luftloch_fav.svg"
            alt="luftloch"
            width={1}
            height={1}
            className="size-12 w-auto"
          />
          <div className="flex flex-col gap-2">
            <span className="text-xl font-bold text-foreground">
              Die Welt erkunden, ohne Angst vor dem Flug.
            </span>
            <span className="text-sm">
              Entwickelt mit ✈️-Angst in Deutschland. &copy; {currentYear}{" "}
              luftloch.
            </span>
          </div>
        </div>
        <nav className="flex gap-4 h-fit">
          <Link href="/impressum" className="text-sm">
            Impressum
          </Link>
          <Separator orientation="vertical" className="" />
          <Link href="/datenschutz" className="text-sm">
            Datenschutz
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default PublicFooter;
