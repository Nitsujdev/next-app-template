"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // Mounted-Status hinzufügen, um Hydration-Fehler zu vermeiden
  const [mounted, setMounted] = useState(false);

  // Nach dem Client-seitigen Mounting setzen
  useEffect(() => {
    setMounted(true);
  }, []);

  // Vor dem Mounting eine leere Button-Komponente rendern
  if (!mounted) {
    return (
      <Button variant="themeToggle" size="icon" className="rounded-full" />
    );
  }

  return (
    <Button
      variant="themeToggle"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  );
}
