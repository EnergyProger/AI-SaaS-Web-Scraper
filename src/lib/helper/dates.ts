import { Period } from "@/types/analytics";
import { endOfMonth, intervalToDuration, startOfMonth } from "date-fns";

export const datesToDurationString = (
  start: Date | null | undefined,
  end: Date | null | undefined
) => {
  if (!start || !end) return null;

  const timeElapsed = end.getTime() - start.getTime();

  if (timeElapsed < 1000) return `${timeElapsed}ms`;

  const duration = intervalToDuration({
    start: 0,
    end: timeElapsed,
  });

  return `${duration.minutes || 0}m ${duration.seconds || 0}s`;
};

export const periodToDateRange = (period: Period) => {
  const startDate = startOfMonth(new Date(period.year, period.month));
  const endDate = endOfMonth(new Date(period.year, period.month));

  return { startDate, endDate };
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};
