import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { Outlet } from "react-router";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative h-svh w-full overflow-auto">
        <SidebarTrigger className="sticky left-0 top-0" />
        {children}

        <div className="flex h-full flex-col px-10 pt-8">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
