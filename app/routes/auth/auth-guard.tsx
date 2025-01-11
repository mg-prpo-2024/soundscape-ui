import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Spinner } from "~/components/ui/spinner";
import * as users from "~/services/users";

const Component = withAuthenticationRequired(() => <Outlet />, {
  onRedirecting: () => <div>redirecting...</div>,
  returnTo: typeof window !== "undefined" ? window.location.pathname : "",
});

export default function AuthenticationGuard() {
  const navigate = useNavigate();
  const { isLoading, user } = useAuth0();
  const result = useQuery({
    queryKey: ["me"],
    queryFn: () => users.getUser(user!.sub!),
    enabled: !!user,
  });
  useEffect(() => {
    if (result.data) {
      if (!result.data.stripe_customer_id) {
        navigate("/plans");
      }
    }
  }, [result.data]);
  if (isLoading || result.isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  // return <Outlet />; // TODO: redirect to login page
  return <Component />;
}
