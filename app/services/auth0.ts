import { useAuth0 } from "@auth0/auth0-react";
import { config } from "~/config";

export let auth0Client: ReturnType<typeof useAuth0> | undefined = undefined;

export function useInitAuth0Client() {
  auth0Client = useAuth0();
}

export async function getAccessToken() {
  if (!auth0Client) {
    throw new Error("Auth0 client not initialized");
  }
  return await auth0Client.getAccessTokenSilently({
    authorizationParams: {
      audience: config.auth0.audience,
      scope: "read:current_user",
    },
  });
}
setTimeout(() => {
  getAccessToken()
    .then((token) => {
      console.log(token);
    })
    .catch((err) => {});
}, 500);
