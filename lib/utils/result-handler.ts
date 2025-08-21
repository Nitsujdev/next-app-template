import { toast } from "sonner";

export function handleError(title: string, error: unknown) {
  console.error(`${title}:`, error);

  const message =
    error instanceof Error
      ? error.message
      : error?.toString() || "Ein unbekannter Fehler ist aufgetreten";

  toast.error(title, {
    description: message,
    duration: 5000,
  });
}

export function handleSuccess(title: string, message?: string) {
  console.log(`${title}:`, message);

  toast.success(title, {
    description: message,
    duration: 3000,
  });
}

export function handleWarning(title: string, message?: string) {
  console.warn(`${title}:`, message);

  toast.warning(title, {
    description: message,
    duration: 4000,
  });
}

export function handleInfo(title: string, message?: string) {
  console.info(`${title}:`, message);

  toast.info(title, {
    description: message,
    duration: 3000,
  });
}
