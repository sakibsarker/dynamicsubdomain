export const getTimezoneOffset = (timezone: string): number => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const parts = formatter.formatToParts(new Date());
  const partsObj = Object.fromEntries(parts.map((p) => [p.type, p.value]));

  const browserDate = new Date();
  const tzDate = new Date(
    `${partsObj.year}-${partsObj.month}-${partsObj.day}T${partsObj.hour}:${partsObj.minute}:${partsObj.second}`,
  );

  return (browserDate.getTime() - tzDate.getTime()) / (1000 * 60);
};

export const convertToTimezone = (date: Date, timezone: string): Date => {
  const offset = getTimezoneOffset(timezone);
  return new Date(date.getTime() - offset * 60 * 1000);
};

const parseTimeString = (
  timeStr: string,
): { hours: number; minutes: number } => {
  const trimmed = timeStr.trim();
  const isPM = trimmed.toUpperCase().includes("PM");
  const isAM = trimmed.toUpperCase().includes("AM");

  const timePart = trimmed.replace(/\s*(AM|PM|am|pm)\s*/i, "").trim();

  const [hourStr, minuteStr] = timePart.split(":").map((s) => s.trim());
  let hours = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr || "0", 10);

  if (isPM && hours !== 12) {
    hours += 12;
  } else if (isAM && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
};

const formatTimeString = (hours: number, minutes: number): string => {
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, "0");
  return `${displayHours}:${displayMinutes} ${period}`;
};

export const generateTimeSlots = (
  openTime: string,
  closeTime: string,
): string[] => {
  const slots: string[] = [];

  const open = parseTimeString(openTime);
  const close = parseTimeString(closeTime);

  let currentMinutes = open.hours * 60 + open.minutes;
  const closeMinutes = close.hours * 60 + close.minutes;

  while (currentMinutes < closeMinutes) {
    const hours = Math.floor(currentMinutes / 60);
    const minutes = currentMinutes % 60;
    slots.push(formatTimeString(hours, minutes));
    currentMinutes += 30;
  }

  return slots;
};
