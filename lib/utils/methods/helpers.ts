import { OrderStatus } from "../interfaces"


export function formatDate(dateString?: string): string {
  if (!dateString) return ""

  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date)
}

export function formatDateAndTime(dateString: string): string {
  const date = new Date(dateString);
  return `${date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })}, ${date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })}`;
}

export function formatTime(dateString?: string): string {
  if (!dateString) return ""

  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date)
}

export function getStatusLabel(status: OrderStatus): string {
  switch (status) {
    case "PENDING":
      return "Pending"
    case "ACCEPTED":
      return "Accepted"
    case "ASSIGNED":
      return "Assigned to Rider"
    case "PICKED":
      return "On the Way"
    case "DELIVERED":
      return "Delivered"
    case "COMPLETED":
      return "Completed"
    case "CANCELLED":
      return "Cancelled"
    default:
      return status
  }
}

export function getStatusColor(status: OrderStatus): "success" | "info" | "warning" | "danger" | undefined {
  switch (status) {
    case "PENDING":
      return "warning"
    case "ACCEPTED":
      return "info"
    case "ASSIGNED":
      return "info"
    case "PICKED":
      return "success"
    case "DELIVERED":
      return "success"
    case "COMPLETED":
      return "success"
    case "CANCELLED":
      return "danger"
    default:
      return undefined
  }
}

export function loadGoogleMapsScript(key: string): Promise<void>{
  return new Promise((resolve, reject) => {
    if (typeof window.google === 'object' && window.google.maps) {
      resolve(); // already loaded
      return;
    }

    const scriptId = 'google-maps-script';
    if (document.getElementById(scriptId)) {
      resolve(); // already injected
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject('Google Maps script failed to load.');
    document.head.appendChild(script);
  });
};