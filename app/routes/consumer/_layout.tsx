import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { Outlet } from "react-router";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-svh w-full overflow-auto">
        <SidebarTrigger />
        {children}
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
