import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  ShieldCheckIcon,
} from "lucide-react";

export const LOGO_FONT_SIZE = "2xl";
export const LOGO_ICON_SIZE = 20;
export const DEFAULT_ICON_SIZE = 20;

export const SIDEBAR_ROUTES = [
  {
    href: "/",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "workflows",
    label: "Workflows",
    icon: Layers2Icon,
  },
  {
    href: "credentials",
    label: "Credentials",
    icon: ShieldCheckIcon,
  },
  {
    href: "billing",
    label: "Billing",
    icon: CoinsIcon,
  },
];

export const DIALOG_HEADER_ICON_SIZE = 30;

export const TOOLTIP_PROVIDER_DELAY_DURATION = 0;

export const DEFAULT_NODE_ICON_SIZE = 16;
export const TOPBAR_ICON_SIZE = 16;

export const COPY_NODE_POSITION_X = 20;

export const CREDITS_COUNT_UP_DURATION = 0.5;
export const CREDITS_COUNT_UP_DECIMALS = 0;
export const USER_BALANCE_REFETCH_INTERVAL = 30 * 1000;

export const WAIT_FOR_SELECTED_ELEMENT_VISIBLE = "visible";
export const WAIT_FOR_SELECTED_ELEMENT_HIDDEN = "hidden";

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
