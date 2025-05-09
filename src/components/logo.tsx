import { LOGO_FONT_SIZE, LOGO_ICON_SIZE } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { SquareDashedMousePointer } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  fontSize?: string;
  iconSize?: number;
};

const Logo = ({
  fontSize = LOGO_FONT_SIZE,
  iconSize = LOGO_ICON_SIZE,
}: Props) => {
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-extrabold flex items-center gap-2",
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-2">
        <SquareDashedMousePointer size={iconSize} className="stroke-white" />
      </div>
      <div>
        <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
          AIWeb
        </span>
        <span className="text-stone-700 dark:text-stone-300">ScrapeFlow</span>
      </div>
    </Link>
  );
};

export default Logo;
