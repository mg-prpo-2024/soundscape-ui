import { route, layout, type RouteConfig, index } from "@react-router/dev/routes";

export default [
  route("/login", "routes/auth/login.tsx"),
  layout("routes/auth/auth-guard.tsx", [
    layout("routes/consumer/_layout.tsx", [
      index("routes/consumer/home.tsx"),
      route("/album/:albumId", "routes/consumer/album.tsx"),
      route("/artist/:artistId", "routes/consumer/artist.tsx"),
    ]),
    route("/dashboard", "routes/dashboard/_layout.tsx", [
      index("routes/dashboard/home.tsx"),
      route("create", "routes/dashboard/create.tsx"),
      route("album/new", "routes/dashboard/new-album.tsx"),
      route("album/:albumId", "routes/dashboard/album.tsx"),
    ]),
    route("/plans", "routes/consumer/subscriptions/plans.tsx"),
    route("/subscriptions/success", "routes/consumer/subscriptions/success.tsx"),
  ]),
] satisfies RouteConfig;
