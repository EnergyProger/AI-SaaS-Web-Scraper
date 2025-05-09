import { DEFAULT_ICON_SIZE, SIDEBAR_ROUTES } from "@/constants/constants";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button, buttonVariants } from "../ui/button";
import { MenuIcon } from "lucide-react";
import Logo from "../logo";
import Link from "next/link";

const MobileSidebar = () => {
  const pathname = usePathname();
  const activeRoute =
    SIDEBAR_ROUTES.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || SIDEBAR_ROUTES[0];

  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-[400px] sm:w-[540px] space-y-4"
            side="left"
          >
            <Logo />
            <div className="flex flex-col gap-1">
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
                  onClick={() => setOpen((prevState) => !prevState)}
                >
                  <route.icon size={DEFAULT_ICON_SIZE} />
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default MobileSidebar;
