"use client";

import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import {
  CommandList,
  CommandEmpty,
  CommandItem,
  CommandGroup,
  CommandInput,
  CommandDialog,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import SearchIconButton from "./searchIcon";
import SearchCommand from "./searchCommand";

const suggestions = [
  { label: "Flugnummer LH123", value: "LH123", type: "flight" },
  { label: "Abflug: Frankfurt (FRA)", value: "FRA", type: "airport" },
  { label: "Ziel: München (MUC)", value: "MUC", type: "airport" },
  { label: "Abflug: Berlin (BER)", value: "BER", type: "airport" },
  { label: "Ziel: Hamburg (HAM)", value: "HAM", type: "airport" },
];

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const router = useRouter();

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  useEffect(() => {
    if (selectedValue) {
      if (
        filteredSuggestions.find(
          (suggestion) => suggestion.value === selectedValue
        )?.type === "flight"
      ) {
        router.push(`/s/?flugnummer=${selectedValue}`);
      } else {
        router.push(`/s/?flughafen=${selectedValue}`);
      }
    }
  }, [selectedValue, router, filteredSuggestions]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <Button
        variant="searchButton"
        size="searchButton"
        onClick={() => setOpen(true)}
        className="gap-3"
      >
        <SearchIconButton />
        Flug finden
        <SearchCommand />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Flugnummer oder Flughafen eingeben..."
          value={inputValue}
          onValueChange={setInputValue}
          autoFocus
        />
        <CommandList>
          <CommandEmpty>Keine Ergebnisse gefunden.</CommandEmpty>
          <CommandGroup heading="Vorschläge">
            {filteredSuggestions.map((suggestion) => (
              <CommandItem
                key={suggestion.value}
                onSelect={() => {
                  setInputValue(suggestion.label);
                  setSelectedValue(suggestion.value);
                  setOpen(false);
                }}
              >
                {suggestion.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
