"use client";

import React from "react";
import { ThemeToggle } from "@/components/theme/themeToggle";
import { RocketIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const PublicHeader = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity group"
        >
          <div className="relative">
            <RocketIcon className="size-5 text-primary group-hover:scale-110 transition-transform" />
            <Sparkles className="absolute -top-1 -right-1 size-2.5 text-primary animate-pulse" />
          </div>
          <span>AppTemplate</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors relative group"
          >
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </Link>
          <a
            href="https://github.com/Nitsujdev/next-app-template"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <Badge variant="outline" className="text-xs border-primary/20 bg-primary/5">
            v16.1
          </Badge>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
