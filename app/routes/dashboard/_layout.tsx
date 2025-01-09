import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <section className="h-svh w-full overflow-auto py-6">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="py-3 text-xs uppercase opacity-75">Artist Dashboard</h1>
        <Outlet />
      </div>
    </section>
  );
}
