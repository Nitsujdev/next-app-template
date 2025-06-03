import { toast } from "sonner";

export const handleError = (error: unknown) => {
  const message =
    error instanceof Error
      ? error.message
      : "Ein unerwarteter Fehler ist aufgetreten";

  if (typeof window !== "undefined") {
    // Nur im Browser ausführen
    toast.error("Es ist ein Fehler aufgetreten", {
      description: message,
      duration: 5000,
    });
  }

  console.error(error);
};

export const handleSuccess = (message: string) => {
  toast.success(message, {
    duration: 5000,
  });
};
