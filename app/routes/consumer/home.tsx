import { useAuth0 } from "@auth0/auth0-react";
import type { MetaFunction } from "react-router";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [{ title: "SoundScape" }, { name: "description", content: "Music app" }];
};

export default function Index() {
  const { user } = useAuth0();
  const username = user?.given_name ?? "";

  return (
    <div className="flex flex-col px-8 pt-2">
      <h1 className="text-xl font-bold">Welcome {username}!</h1>
      <div className="flex flex-col items-center gap-1">
        <Button>Continue</Button>
      </div>
    </div>
  );
}
