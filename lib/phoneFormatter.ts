/**
 * Phone number formatting utilities for US numbers
 */

export const formatPhoneNumber = (value: string | null | undefined): string => {
  if (!value) return "";
  const cleaned = value.toString().replace(/\D/g, "");

  if (cleaned.length === 0) return "";
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  if (cleaned.length <= 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
};

export const formatPhoneForBackend = (
  value: string | null | undefined,
): string => {
  if (!value) return "";
  const cleaned = value.toString().replace(/\D/g, "");

  if (cleaned.length === 0) return "";

  if (cleaned.length === 11 && cleaned.startsWith("1")) {
    return `+1${cleaned.slice(1)}`;
  }

  if (cleaned.length > 11 && cleaned.startsWith("1")) {
    return `+1${cleaned.slice(-10)}`;
  }

  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  }

  if (cleaned.length > 10) {
    return `+1${cleaned.slice(-10)}`;
  }

  return cleaned;
};

export const isValidUSPhoneNumber = (
  value: string | null | undefined,
): boolean => {
  if (!value) return false;
  const cleaned = value.toString().replace(/\D/g, "");
  return cleaned.length === 10;
};
