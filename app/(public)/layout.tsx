import type { Metadata } from "next";
import PublicHeader from "@/components/public/header";
import PublicFooter from "@/components/public/footer";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to our Next.js application - your modern web solution built with the latest technologies.",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicHeader />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">{children}</main>
      <PublicFooter />
    </>
  );
}
