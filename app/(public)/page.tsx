"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRightIcon,
  Zap,
  Shield,
  Sparkles,
  GithubIcon,
  BookOpenIcon,
  CheckCircle2,
  Rocket,
  Code2,
  Layers,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Zap,
    title: "Blitzschnell",
    description:
      "Next.js 16 mit Turbopack - 5x schnellere Builds, 100x schnellere HMR. Deine App läuft wie Raketen.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Shield,
    title: "Production Ready",
    description:
      "Supabase Backend, TypeScript, RLS Policies - alles was du brauchst für skalierbare, sichere Apps.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Sparkles,
    title: "Modern Stack",
    description:
      "React 19, Tailwind CSS v4, shadcn/ui - der modernste Tech-Stack für dein nächstes Projekt.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

const stats = [
  { label: "Next.js", value: "16.1" },
  { label: "React", value: "19.2" },
  { label: "TypeScript", value: "5.x" },
  { label: "Supabase", value: "Latest" },
];

const techStack = [
  { name: "Next.js 16", icon: Rocket },
  { name: "React 19", icon: Code2 },
  { name: "Tailwind v4", icon: Layers },
  { name: "Supabase", icon: Shield },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 md:py-32 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" />
        
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto px-4">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-sm font-medium border-primary/20 bg-primary/5"
            >
              <Sparkles className="size-3 mr-1.5" />
              Next.js 16 • React 19 • Production Ready
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Ship faster.
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Build better.
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Das modernste Next.js Template mit allem was du brauchst.{" "}
            <span className="text-foreground font-medium">
              Zero config. Maximum speed.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <Button asChild size="lg" className="gap-2 text-base px-8 h-12">
              <a
                href="https://github.com/Nitsujdev/next-app-template"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="size-5" />
                Get Started
                <ArrowRightIcon className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 text-base px-8 h-12">
              <a
                href="https://github.com/Nitsujdev/next-app-template#readme"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookOpenIcon className="size-5" />
                View Docs
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors"
              >
                <tech.icon className="size-6 text-primary" />
                <span className="font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 text-center mb-16">
            <Badge variant="outline" className="w-fit mx-auto mb-2">
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Everything you need to{" "}
              <span className="text-primary">ship fast</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Production-ready setup. Modern stack. Zero configuration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="relative gap-4">
                  <div
                    className={`size-14 rounded-xl ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className={`size-7 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base text-foreground/70 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What's included
            </h2>
            <p className="text-lg text-foreground/70">
              All the essentials for building modern web applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Authentication with Supabase",
              "TypeScript configuration",
              "Tailwind CSS v4 setup",
              "shadcn/ui components",
              "SEO optimized metadata",
              "Error handling utilities",
              "Theme support (light/dark)",
              "Responsive design",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0" />
                <span className="text-foreground/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden border-2 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]" />
            <CardContent className="relative p-12 text-center">
              <Rocket className="size-12 mx-auto mb-6 opacity-90" />
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to build something amazing?
              </h3>
              <p className="text-lg text-primary-foreground/90 mb-8 max-w-xl mx-auto">
                Clone the repository and start building your next project in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="gap-2 text-base px-8 h-12"
                >
                  <a
                    href="https://github.com/Nitsujdev/next-app-template"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon className="size-5" />
                    Clone Repository
                    <ArrowRightIcon className="size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2 text-base px-8 h-12"
                >
                  <a
                    href="https://github.com/Nitsujdev/next-app-template#readme"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BookOpenIcon className="size-5" />
                    Read Documentation
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
