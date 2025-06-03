"use client";

import { cn } from "@/lib/utils/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import SignInWithGoogleButton from "./SignInWithGoogleButton";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, Form } from "@/components/ui/form";
import { handleError, handleSuccess } from "@/lib/utils/result-handler";
import { signInWithMagicLink } from "@/app/(auth)/login/actions";

const loginSchema = z.object({
  email: z.string().email({
    message: "Bitte gib eine gültige E-Mail-Adresse ein.",
  }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await signInWithMagicLink(values.email);
    } catch (error) {
      handleError(error);
      setError("Fehler beim Senden der E-Mail");
    } finally {
      handleSuccess("E-Mail wurde erfolgreich gesendet");
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card className="rounded-xl p-4 border space-y-4">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Wilkommen!</CardTitle>
          <CardDescription>Einloggen mit deinem Google Account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid gap-4">
                <div className="flex flex-col gap-4">
                  <SignInWithGoogleButton />
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-foreground">
                    Oder via Email
                  </span>
                </div>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <div className="grid gap-2">
                        <Label
                          htmlFor="email"
                          className={cn({
                            "text-jdColor-red": !!error,
                          })}
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          placeholder="justin@example.com"
                          type="email"
                          className={cn({
                            "border border-jdColor-red": !!error,
                          })}
                          required
                          {...field}
                        />
                      </div>
                    )}
                  />
                  {error && <p className="text-error text-sm">{error}</p>}
                  <Button
                    variant="callToAction"
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "E-Mail senden..." : "Magic Link senden"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-center text-sm">
        {/*
        Mit der Anmeldung akzeptierst du die{' '}
        <Link
          href="/datenschutz"
          className="underline hover:text-jdColor-red transition-colors"
        >
          Datenschutzbestimmungen
        </Link>
        .
        <br /> */}
        Rechtliche Informationen im{" "}
        <Link
          href="/impressum"
          className="underline hover:text-jdColor-red transition-colors"
        >
          Impressum
        </Link>
        .
      </div>
    </div>
  );
}
