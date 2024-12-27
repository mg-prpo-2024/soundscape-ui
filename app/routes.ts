import { type RouteConfig } from "@react-router/dev/routes";
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";

export default remixRoutesOptionAdapter((defineRoutes) => {
  return defineRoutes((route) => {
    route("/", "routes/home.tsx", { index: true });
    route("/login", "routes/login.tsx");
  });
}) satisfies RouteConfig;
