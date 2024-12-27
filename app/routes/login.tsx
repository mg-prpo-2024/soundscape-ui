import { Form } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { ClientOnly } from "~/utils/clientOnly";
import { Button } from "~/components/ui/button";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default function Login() {
  return (
    <ClientOnly>
      <LoginButton />
    </ClientOnly>
  );
}
