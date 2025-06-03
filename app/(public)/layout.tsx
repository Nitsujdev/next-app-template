import type { Metadata } from "next";
import PublicHeader from "@/components/public/header";
import PublicFooter from "@/components/public/footer";

export const metadata: Metadata = {
  title: "luftloch | Alle relevanten Infos zu deinem Flug",
  description:
    "luftloch ist ein Tool, das dir hilft, alle relevanten Infos zu deinem Flug zu finden.",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicHeader />
      <div className="container">{children}</div>
      <PublicFooter />
    </>
  );
}
