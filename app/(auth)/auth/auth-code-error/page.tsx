import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-8 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6 text-center">
        <h1 className="text-3xl font-bold">Authentifizierungsfehler</h1>
        <p className="text-muted-foreground">
          Bei der Anmeldung ist ein Fehler aufgetreten. Dies könnte folgende
          Gründe haben:
        </p>
        <ul className="list-disc text-left ml-8 text-muted-foreground space-y-2">
          <li>Der Authentifizierungslink ist abgelaufen</li>
          <li>Der Link wurde bereits verwendet</li>
          <li>Es gab ein technisches Problem bei der Anmeldung</li>
        </ul>
        <p className="text-muted-foreground mt-2">
          Magic Links sind aus Sicherheitsgründen nur für eine begrenzte Zeit
          gültig (24 Stunden) und können nur einmal verwendet werden.
        </p>
        <div className="flex flex-col gap-4 mt-4">
          <Link href="/login">
            <Button className="w-full">Zurück zum Login</Button>
          </Link>
          <Link href="/login?action=magic">
            <Button className="w-full">Neuen Magic Link anfordern</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
