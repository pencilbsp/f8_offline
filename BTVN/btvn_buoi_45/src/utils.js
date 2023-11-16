import clsx from "clsx";
import vi from "date-fns/locale/vi";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const timeToNow = (time) => formatDistanceToNow(new Date(time), { locale: vi, addSuffix: true });

export const getGameResult = (histories, number) => {
  const latest = histories[histories.length - 1];
  return latest === number;
};

export function getTryCount(range) {
  if (range < 128) return 7;
  if (range < 256) return 8;
  if (range < 512) return 9;
  if (range < 1024) return 10;
  return 11;
}
