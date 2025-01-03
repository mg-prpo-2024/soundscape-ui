import { useAuth0 } from "@auth0/auth0-react";

export let auth0Client: ReturnType<typeof useAuth0> | undefined = undefined;

export function useInitAuth0Client() {
  auth0Client = useAuth0();
}

export async function getAccessToken() {
  if (!auth0Client) {
    throw new Error("Auth0 client not initialized");
  }
  const domain = "dev-2piaq4s.us.auth0.com";
  return await auth0Client.getAccessTokenSilently({
    authorizationParams: {
      audience: `https://${domain}/api/v2/`,
      scope: "read:current_user",
    },
  });
}
setTimeout(() => {
  getAccessToken()
    .then((token) => {
      console.log(token);
    })
    .catch((err) => {
      console.error(err);
    });
}, 500);
