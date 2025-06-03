import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/sidebar/app-sidebar";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col h-dvh flex-1 overflow-x-hidden bg-muted">
        <main className="flex-1 px-4">{children}</main>
      </div>
    </SidebarProvider>
  );
}
