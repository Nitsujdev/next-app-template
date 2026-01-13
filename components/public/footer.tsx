"use client";

import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { RocketIcon, GithubIcon, TwitterIcon } from "lucide-react";

const PublicFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background-offset text-foreground">
      <div className="container py-12 flex flex-col gap-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-start gap-4 max-w-sm">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <RocketIcon className="size-6 text-primary" />
              <span>AppTemplate</span>
            </Link>
            <p className="text-sm text-foreground/70">
              Ein modernes Next.js 16 Template mit Supabase, Tailwind CSS v4 und
              shadcn/ui - der perfekte Startpunkt für dein nächstes Projekt.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Nitsujdev/next-app-template"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="size-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="size-5" />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-sm">Produkt</h4>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="#features"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  Features
                </Link>
                <a
                  href="https://github.com/Nitsujdev/next-app-template#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  Dokumentation
                </a>
              </nav>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-sm">Rechtliches</h4>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/impressum"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  Impressum
                </Link>
                <Link
                  href="/datenschutz"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  Datenschutz
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <Separator />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
          <span>&copy; {currentYear} AppTemplate. All rights reserved.</span>
          <span>
            Built with ❤️ using{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Next.js
            </a>
            ,{" "}
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Supabase
            </a>{" "}
            &{" "}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              shadcn/ui
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
