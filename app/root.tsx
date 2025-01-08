import { Links, Meta, Outlet, Scripts, ScrollRestoration, useNavigate } from "react-router";
import type { LinksFunction } from "react-router";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "~/components/ui/sonner";

import "./tailwind.css";
import { useInitAuth0Client } from "~/services/auth0";
import { config } from "~/config";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

function initTheme() {
  const theme = window.matchMedia(`(prefers-color-scheme: dark)`).matches ? `dark` : `light`;
  document.documentElement.classList.add(theme);
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script suppressHydrationWarning>{`(${initTheme.toString()})()`}</script>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const queryClient = new QueryClient();

export default function App() {
  const navigate = useNavigate();
  const onRedirectCallback = (appState: AppState | undefined) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={config.auth0.domain}
      clientId={config.auth0.clientId}
      authorizationParams={{
        redirect_uri: typeof window !== "undefined" ? window.location.origin : "",
        audience: config.auth0.audience,
        scope: config.auth0.scope,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <GlobalAuthSetter>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </GlobalAuthSetter>
    </Auth0Provider>
  );
}

function GlobalAuthSetter({ children }: { children: React.ReactNode }) {
  useInitAuth0Client();
  return children;
}
