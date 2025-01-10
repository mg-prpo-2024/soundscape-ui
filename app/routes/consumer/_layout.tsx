import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { Outlet } from "react-router";
import { AudioPlayer } from "~/components/audio-player";
import { useState } from "react";

export default function Layout() {
  useState(() => {
    console.log("Mounting component");
  });
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="h-svh w-full overflow-auto">
          <main className="relative h-[calc(100svh_-_5rem)] w-full overflow-auto pb-14">
            <SidebarTrigger className="sticky left-0 top-0" />

            <div className="flex flex-1 flex-col px-10 pt-8">
              <Outlet />
            </div>
          </main>
          <AudioPlayer />
        </div>
      </SidebarProvider>
    </>
  );
}
