"use client";
import { Card } from "@/components/ui/card";

import { SearchBar } from "@/components/shared/searchBar";
import Image from "next/image";
import LogoWall from "@/components/public/logoWall";
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-8 items-center justify-center text-center">
        <div className="flex flex-col gap-8 w-full md:w-3/4 lg:w-2/3">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <h1 className="text-4xl font-bold">
                Turbulenzen vor dem Abflug vorraus sagen
              </h1>
              <p className="text-foreground text-lg">
                Finde mit wenigen Klicks alle relevanten Informationen zu deinem
                Flug.
              </p>
            </div>
            <SearchBar />
          </div>
          <Image
            src="/images/hero_img.svg"
            alt="Hero"
            width={1}
            height={1}
            className="w-full"
          />
        </div>
        <LogoWall />
        <div className="flex flex-col gap-8 w-full mt-8 py-4">
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-4xl font-bold">
              Turbulenzen vor dem Abflug vorraus sagen
            </h2>
            <p className="text-foreground/80 text-lg">
              Finde mit wenigen Klicks alle relevanten Informationen zu deinem
              Flug.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <Card className="bg-background-offset text-foreground text-left border-2 shadow-md py-4 justify-between">
              <CardHeader className="gap-1">
                <CardTitle className="text-xl font-bold">
                  Step 01: Flug finden
                </CardTitle>
                <CardDescription className="text-lg text-foreground/80">
                  Beschreibung des dritten Features mit allen wichtigen Details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  className="w-full mt-4"
                  src="/images/Card01_Kontoanbindungen.svg"
                  alt="Hero"
                  width={1}
                  height={1}
                />
              </CardContent>
            </Card>
            <Card className="bg-background-offset text-foreground text-left border-2 shadow-md py-4 justify-between">
              <CardHeader className="gap-1">
                <CardTitle className="text-xl font-bold">
                  Step 02: Vorhersage erstellen lassen
                </CardTitle>
                <CardDescription className="text-lg text-foreground/80">
                  Beschreibung des dritten Features mit allen wichtigen Details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  className="w-full mt-4"
                  src="/images/Card01_Kontoanbindungen.svg"
                  alt="Hero"
                  width={1}
                  height={1}
                />
              </CardContent>
            </Card>
            <Card className="bg-background-offset text-foreground text-left border-2 shadow-md py-4 justify-between">
              <CardHeader className="gap-1">
                <CardTitle className="text-xl font-bold">
                  Step 03: Vorbereitet ins Flugzeug einsteigen
                </CardTitle>
                <CardDescription className="text-lg text-foreground/80">
                  Beschreibung des dritten Features mit allen wichtigen Details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  className="w-full mt-4"
                  src="/images/Card01_Kontoanbindungen.svg"
                  alt="Hero"
                  width={1}
                  height={1}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

/*<div className="flex flex-col gap-2 items-center justify-center text-center w-1/2 mx-auto">
<span className="text-cyan text-xl uppercase font-bold">
Dein kostenloser AboCheck
</span>
<h2 className="text-4xl font-bold">
Dein Assistent für deine Ausgaben
</h2>
<p className="text-foreground/80 text-lg">
Verschaffe dir finanzielle Klarheit und Gelassenheit, indem du den
Überblick über deine Abonements und Transaktionen behältst.
</p>
<Button>Ausgaben checken</Button>
</div>
<div className="grid grid-cols-1 gap-4 w-full">
<div className="grid grid-cols-2 gap-4">
<Card className="bg-muted text-foreground pb-0">
  <CardHeader>
    <CardTitle className="text-3xl font-bold">
      Konten anbinden und durchstarten
    </CardTitle>
  </CardHeader>
  <CardContent className="pb-0">
    <p>
      In wenigen Klicks alles automatisiert verknüpfen: Egal ob Depot,
      Girokonto oder Kreditkarte. Wir haben Schnittstellen für über
      350 Anbieter.
    </p>
    <Image
      className="w-full mt-6"
      src="/images/Card01_Kontoanbindungen.svg"
      alt="Hero"
      width={1}
      height={1}
    />
  </CardContent>
</Card>
<Card className="bg-muted text-foreground">
  <CardHeader>
    <CardTitle className="text-3xl font-bold">
      Tracking all deiner Ausgaben
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p>
      Folge der Wertentwicklung deiner Aktien, ETFs, Fonds, Kryptos,
      Immobilien, Rohstoffe oder sonstigen Assets.
    </p>
    <Image
      className="w-full"
      src="/images/Card01_Kontoanbindungen.svg"
      alt="Hero"
      width={1}
      height={1}
    />
  </CardContent>
</Card>
</div>

<div className="grid grid-cols-3 gap-4">
<Card className="bg-muted text-foreground">
  <CardHeader>
    <CardTitle className="text-2xl font-bold">Feature 1</CardTitle>
  </CardHeader>
  <CardContent>
    <p>
      Beschreibung des ersten Features mit allen wichtigen Details.
    </p>
    <Image
      className="w-full mt-4"
      src="/images/Card01_Kontoanbindungen.svg"
      alt="Hero"
      width={1}
      height={1}
    />
  </CardContent>
</Card>
<Card className="bg-muted text-foreground">
  <CardHeader>
    <CardTitle className="text-2xl font-bold">Feature 2</CardTitle>
  </CardHeader>
  <CardContent>
    <p>
      Beschreibung des zweiten Features mit allen wichtigen Details.
    </p>
    <Image
      className="w-full mt-4"
      src="/images/Card01_Kontoanbindungen.svg"
      alt="Hero"
      width={1}
      height={1}
    />
  </CardContent>
</Card>
<Card className="bg-muted text-foreground">
  <CardHeader>
    <CardTitle className="text-2xl font-bold">Feature 3</CardTitle>
  </CardHeader>
  <CardContent>
    <p>
      Beschreibung des dritten Features mit allen wichtigen Details.
    </p>
    <Image
      className="w-full mt-4"
      src="/images/Card01_Kontoanbindungen.svg"
      alt="Hero"
      width={1}
      height={1}
    />
  </CardContent>
</Card>
</div>
<div className="grid">
<Card className="bg-muted text-foreground">
  <CardContent className="flex flex-row justify-between gap-4">
    <h3 className="text-3xl font-bold">
      Jetzt kostenlosen Account einrichten
    </h3>
    <Button>
      <ArrowRightIcon />
      Jetzt kostenlos einrichten
    </Button>
  </CardContent>
</Card>
</div>
*/
