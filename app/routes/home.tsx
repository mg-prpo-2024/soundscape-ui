import { useAuth0 } from "@auth0/auth0-react";
import type { MetaFunction } from "react-router";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [{ title: "SoundScape" }, { name: "description", content: "Music app" }];
};

export default function Index() {
  const { logout } = useAuth0();
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-1">
        <h1>Hello world</h1>
        <Button>Continue</Button>
        <Button onClick={() => logout()}>Log Out</Button>
      </div>
    </div>
  );
}
