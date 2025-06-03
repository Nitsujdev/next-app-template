import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "luftloch | Alle relevanten Infos zu deinem Flug",
  description:
    "luftloch ist ein Tool, das dir hilft, alle relevanten Infos zu deinem Flug zu finden.",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    console.log("redirecting to /");
    redirect("/");
  }

  return children;
}
