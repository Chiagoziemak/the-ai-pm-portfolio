/**
 * Format date string into human-readable format (e.g. "Jan 19, 2026" or "Apr 2025").
 * Handles ISO dates (YYYY-MM-DD), timestamps, year-month (YYYY-MM), and year-only (YYYY) safely without timezone shifting.
 */
export function formatDisplayDate(dateStr?: string | null): string {
  if (!dateStr || typeof dateStr !== "string") return "";
  const trimmed = dateStr.trim();
  if (!trimmed) return "";

  // Year only e.g. "2024"
  if (/^\d{4}$/.test(trimmed)) {
    return trimmed;
  }

  // YYYY-MM-DD or YYYY-MM
  const parts = trimmed.split(/[-/T\s]/);
  if (parts.length >= 3 && parts[0].length === 4) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 0-indexed
    const day = parseInt(parts[2], 10);

    if (!isNaN(year) && !isNaN(month) && !isNaN(day) && month >= 0 && month <= 11) {
      const date = new Date(Date.UTC(year, month, day));
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      });
    }
  }

  if (parts.length === 2 && parts[0].length === 4) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    if (!isNaN(year) && !isNaN(month) && month >= 0 && month <= 11) {
      const date = new Date(Date.UTC(year, month, 1));
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      });
    }
  }

  // Fallback to standard parse if possible
  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return trimmed;
}
