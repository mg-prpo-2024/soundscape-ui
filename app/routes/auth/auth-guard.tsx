import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import { Spinner } from "~/components/ui/spinner";

export default function AuthenticationGuard({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  const Component = withAuthenticationRequired(
    () => (
      <>
        {children}
        <Outlet />
      </>
    ),
    {
      onRedirecting: () => <div>redirecting...</div>,
      returnTo: window.location.pathname,
    },
  );
  return <Component />;
}
