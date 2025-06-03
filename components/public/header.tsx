"use client";
import React from "react";
import { ThemeToggle } from "@/components/theme/themeToggle";
import { Button } from "@/components/ui/button";
import { WindIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
const PublicHeader = () => {
  const { theme } = useTheme();
  return (
    <>
      <div className="bg-accent p-1 text-accent-foreground text-center flex items-center justify-center gap-1">
        <WindIcon className="size-4" />
        <span>
          Aktueller Wind in Miami{" "}
          <span className="font-bold">[19 Knoten aus Osten]</span>
        </span>
      </div>
      <header className="py-4 container flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Image
            src={
              theme === "dark"
                ? "/brand/luftloch_light.svg"
                : "/brand/luftloch_dark.svg"
            }
            alt="luftloch"
            width={1}
            height={1}
            className="w-24"
          />
          <div className="flex items-center gap-2">
            <Button variant="callToAction">
              <UserIcon className="size-4" />
              Account
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
};

export default PublicHeader;
