import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Transmission } from "@/types/enums"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTransmissionEnumValue = (transmission: string | undefined): Transmission | null => {
  if (!transmission) {
    return null;
  }

  switch (transmission) {
    case "Automatic":
      return Transmission.Automatic;
    case "Manual":
      return Transmission.Manual;
    case "CVT":
      return Transmission.CVT;
    default:
      return null; // Handle invalid transmission
  }
};