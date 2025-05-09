import Logo from "@/components/logo";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <Logo />
      {children}
    </div>
  );
};

export default Layout;
