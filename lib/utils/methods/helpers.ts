import {
  PAYPAL_ALLOWED_CURRENCIES,
  STRIPE_ALLOWED_CURRENCIES,
} from "../constants/currencies";
import { OrderStatus } from "../interfaces";

export function formatDate(dateString?: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatDateAndTime(dateString: string): string {
  const date = new Date(dateString);
  return `${date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}, ${date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`;
}

export function formatTime(dateString?: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
}

export function getStatusLabel(status: OrderStatus): string {
  switch (status) {
    case "PENDING":
      return "Pending";
    case "ACCEPTED":
      return "Accepted";
    case "ASSIGNED":
      return "Assigned to Rider";
    case "PICKED":
      return "On the Way";
    case "DELIVERED":
      return "Delivered";
    case "COMPLETED":
      return "Completed";
    case "CANCELLED":
      return "Cancelled";
    default:
      return status;
  }
}

export function getStatusColor(
  status: OrderStatus
): "success" | "info" | "warning" | "danger" | undefined {
  switch (status) {
    case "PENDING":
      return "warning";
    case "ACCEPTED":
      return "info";
    case "ASSIGNED":
      return "info";
    case "PICKED":
      return "success";
    case "DELIVERED":
      return "success";
    case "COMPLETED":
      return "success";
    case "CANCELLED":
      return "danger";
    default:
      return undefined;
  }
}

// Format date from timestamp
export const formatDateForCreatedAt = (timestamp: string) => {
  try {
    const date = new Date(Number.parseInt(timestamp));
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());

      // Format time from [hours, minutes] to HH:MM format
    export const formatTimeForHoursMins = (time: [string, string]) => {
        return `${time[0].padStart(2, "0")}:${time[1].padStart(2, "0")}`;
    };
    
 
  // Get the current day in a readable format
  //Example "MON" => "Monday"
  export const getCurrentDay = (day: string) => {
    switch (day) {
      case "MON": return "Monday";
      case "TUE": return "Tuesday";
      case "WED": return "Wednesday";
      case "THU": return "Thursday";
      case "FRI": return "Friday";
      case "SAT": return "Saturday";
      case "SUN": return "Sunday";
      default: return "";
    }
  };
  
