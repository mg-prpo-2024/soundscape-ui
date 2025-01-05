import { route, layout, type RouteConfig, index } from "@react-router/dev/routes";

export default [
  route("/login", "routes/auth/login.tsx"),
  layout("routes/auth/auth-guard.tsx", [
    index("routes/home.tsx"),
    route("/plans", "routes/subscriptions/plans.tsx"),
    route("/subscriptions/success", "routes/subscriptions/success.tsx"),
  ]),
] satisfies RouteConfig;
