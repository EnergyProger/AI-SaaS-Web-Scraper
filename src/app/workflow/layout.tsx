import Logo from "@/components/logo";
import ThemeModeToggle from "@/components/theme-mode-toggle";
import { Separator } from "@/components/ui/separator";
import { LOGO_FONT_SIZE, LOGO_ICON_SIZE } from "@/constants/constants";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col w-full h-screen">
      {children}
      <Separator />
      <footer className="flex justify-between items-center p-2">
        <Logo iconSize={LOGO_ICON_SIZE} fontSize={LOGO_FONT_SIZE} />
        <ThemeModeToggle />
      </footer>
    </div>
  );
};

export default Layout;
