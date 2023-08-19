import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timestampToDate = (timestamp: string) => {
  const providedDate = new Date(timestamp);

  const currentDate = new Date();

  // time difference in milliseconds
  const timeDifference = currentDate.getTime() - providedDate.getTime();

  // Days, weeks, and months from milliseconds
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const millisecondsInWeek = millisecondsInDay * 7;
  const millisecondsInMonth = millisecondsInDay * 30;

  const days = Math.floor(timeDifference / millisecondsInDay);
  const weeks = Math.floor(timeDifference / millisecondsInWeek);
  const months = Math.floor(timeDifference / millisecondsInMonth);

  // Relative date
  let relativeDate: string;

  if (days === 0) {
    relativeDate = "Today";
  } else if (days === 1) {
    relativeDate = "Yesterday";
  } else if (days < 7) {
    relativeDate = `${days} days ago`;
  } else if (weeks < 4) {
    relativeDate = weeks === 1 ? "a week ago" : `${weeks} weeks ago`;
  } else {
    relativeDate = months === 1 ? "a month ago" : `${months} months ago`;
  }

  return relativeDate;
};
