import { SIDEBAR_ROUTES } from "@/constants/common";

export const getActiveRoute = (
  pathname: string,
  routes: typeof SIDEBAR_ROUTES
) => {
  // Cache the home route for quick access
  const homeRoute = routes.find((route) => route.href === "/") || routes[0];

  // Early return for root path
  if (pathname === "/" || pathname === "") {
    return homeRoute;
  }

  // Normalize pathname - remove leading/trailing slashes and convert to lowercase
  const normalizedPath = pathname.toLowerCase().replace(/^\/+|\/+$/g, "");

  // Fast lookup for exact matches
  for (const route of routes) {
    const routePath = route.href.toLowerCase().replace(/^\/+|\/+$/g, "");
    if (routePath === normalizedPath) {
      return route;
    }
  }

  // Check if any route is a prefix of the current path
  // Sort routes by length (descending) to match the most specific route first
  const sortedRoutes = [...routes].sort(
    (a, b) =>
      b.href.replace(/^\/+|\/+$/g, "").length -
      a.href.replace(/^\/+|\/+$/g, "").length
  );

  for (const route of sortedRoutes) {
    const routePath = route.href.toLowerCase().replace(/^\/+|\/+$/g, "");
    if (routePath && normalizedPath.startsWith(routePath)) {
      return route;
    }
  }

  // If we get here, no match was found - return home route
  return homeRoute;
};
