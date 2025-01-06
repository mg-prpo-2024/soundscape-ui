import { route, layout, type RouteConfig, index } from "@react-router/dev/routes";

export default [
  route("/login", "routes/auth/login.tsx"),
  layout("routes/auth/auth-guard.tsx", [
    layout("routes/consumer/_layout.tsx", [
      index("routes/consumer/home.tsx"),
      route("/artist/:artistId", "routes/consumer/artist.tsx"),
    ]),
    layout("routes/dashboard/_layout.tsx", [
      // index("routes/dashboard/home.tsx"),
      route("/dashboard/create", "routes/dashboard/create.tsx"),
    ]),
    route("/plans", "routes/consumer/subscriptions/plans.tsx"),
    route("/subscriptions/success", "routes/consumer/subscriptions/success.tsx"),
  ]),
] satisfies RouteConfig;
