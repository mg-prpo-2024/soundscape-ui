import { Form } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { ClientOnly } from "~/utils/clientOnly";
import { Button } from "~/components/ui/button";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => loginWithRedirect({ authorizationParams: { scope: "read:current_user" } })}
    >
      Log In
    </Button>
  );
};

export default function Login() {
  return (
    <div className="relative">
      <svg
        className="fixed inset-0 w-screen h-screen z-0"
        id="visual"
        viewBox="0 0 960 540"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <rect x="0" y="0" width="960" height="540" fill="#00060c"></rect>
        <g transform="translate(481.97514358457863 269.5743476786405)">
          <path
            d="M135.4 -133.9C164.7 -106.1 170.4 -53 175.7 5.3C181 63.6 185.9 127.3 156.6 149.8C127.3 172.3 63.6 153.6 7.5 146.1C-48.6 138.6 -97.1 142.1 -132.4 119.6C-167.8 97.1 -189.9 48.6 -182.1 7.8C-174.3 -33 -136.7 -66 -101.3 -93.8C-66 -121.7 -33 -144.3 10 -154.3C53 -164.4 106.1 -161.7 135.4 -133.9"
            fill="#0066FF"
          ></path>
        </g>
      </svg>

      <div className="relative z-10 flex items-center h-screen justify-center flex-col gap-10">
        <h1 className="text-3xl font-bold ">Welcome to SoundScape</h1>
        <LoginButton />
      </div>
    </div>
  );
}
