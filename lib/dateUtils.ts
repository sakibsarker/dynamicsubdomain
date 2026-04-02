export const formatDateToYYYYMMDD = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const formatTimeToHHMMAMPM = (time: string): string => {
  const [timePart, period] = time.split(" ");
  const [hours, minutes] = timePart.split(":");
  return `${hours}:${minutes}${period.toLowerCase()}`;
};
