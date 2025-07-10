import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getScoreColor = (score: number) => {
  if (score <= 6) return "bg-red-100 text-red-800";
  if (score <= 8) return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-800";
};

export const getScoreLabel = (score: number) => {
  if (score <= 6) return "Detractor";
  if (score <= 8) return "Passive";
  return "Promoter";
};

export type NPSCategory = "detractor" | "passive" | "promoter";

export function getNPSCategory(score: number): NPSCategory {
  if (score <= 6) return "detractor";
  if (score <= 8) return "passive";
  return "promoter";
}
