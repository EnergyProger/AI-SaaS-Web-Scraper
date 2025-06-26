import Logo from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import {
  SETTING_LOADER_ICON_SIZE,
  SETTING_LOGO_ICON_SIZE,
} from "@/constants/settings";
import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-4">
      <Logo iconSize={SETTING_LOGO_ICON_SIZE} fontSize="text-3xl" />
      <Separator className="max-w-xs" />
      <div className="flex justify-center items-center gap-2">
        <Loader2
          size={SETTING_LOADER_ICON_SIZE}
          className="animate-spin stroke-primary"
        />
        <p className="text-muted-foreground">Setting up your account</p>
      </div>
    </div>
  );
};

export default Loading;
