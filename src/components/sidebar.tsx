"use client";

import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { DEFAULT_ICON_SIZE, SIDEBAR_ROUTES } from "@/constants/constants";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { getActiveRoute } from "@/lib/helper/get-active-route";
import UserAvailableCreditsBadge from "./user-available-credits-badge";

const Sidebar = () => {
  const pathname = usePathname();
  const activeRoute = getActiveRoute(pathname, SIDEBAR_ROUTES);

  return (
    <div
      className="hidden relative md:block min-w-[300px] max-w-[300px] h-screen overflow-hidden
    w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2
    border-separate"
    >
      <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
        <Logo />
      </div>
      <div className="p-2">
        <UserAvailableCreditsBadge />
      </div>
      <div className="flex flex-col p-2">
        {SIDEBAR_ROUTES.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={buttonVariants({
              variant:
                activeRoute.href === route.href
                  ? "sidebarActiveItem"
                  : "sidebarItem",
            })}
          >
            <route.icon size={DEFAULT_ICON_SIZE} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
