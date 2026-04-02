export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,6}$/;

export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== "string") return false;
  const trimmedEmail = email.trim();
  if (trimmedEmail.length === 0 || trimmedEmail.length > 254) return false;
  if (!trimmedEmail.includes("@")) return false;
  const parts = trimmedEmail.split("@");
  if (parts.length !== 2) return false;
  const [localPart, domainPart] = parts;
  if (localPart.length === 0 || localPart.length > 64) return false;
  if (domainPart.length === 0 || domainPart.length > 253) return false;
  return EMAIL_REGEX.test(trimmedEmail);
};
