import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import { Spinner } from "~/components/ui/spinner";

const Component = withAuthenticationRequired(() => <Outlet />, {
  onRedirecting: () => <div>redirecting...</div>,
  returnTo: typeof window !== "undefined" ? window.location.pathname : "",
});

export default function AuthenticationGuard() {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  // return <Outlet />; // TODO: redirect to login page
  return <Component />;
}
