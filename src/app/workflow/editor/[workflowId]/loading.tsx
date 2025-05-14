import { EDITOR_LOADING_ICON_SIZE } from "@/constants/constants";
import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <Loader2
        size={EDITOR_LOADING_ICON_SIZE}
        className="animate-spin stroke-primary"
      />
    </div>
  );
};

export default Loading;
