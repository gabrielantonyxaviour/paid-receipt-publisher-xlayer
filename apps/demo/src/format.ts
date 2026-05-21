export function shortHash(value: string, size: number) {
  if (value.length <= size) return value;
  const side = Math.max(6, Math.floor((size - 3) / 2));
  return `${value.slice(0, side)}...${value.slice(-side)}`;
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  try {
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return value;
  }
}
