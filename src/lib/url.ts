/**
 * Normalizes an external URL entered by editors:
 * - Rejects non-string / empty values
 * - Rejects dangerous protocols like javascript:, data:, vbscript:
 * - Preserves http://, https://, mailto:, tel:
 * - Prepends https:// to bare domains (e.g. okeysontransports.com -> https://okeysontransports.com)
 */
export function normalizeExternalUrl(rawUrl?: string | null): string | undefined {
  if (!rawUrl || typeof rawUrl !== "string") return undefined;
  const trimmed = rawUrl.trim();
  if (!trimmed) return undefined;

  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:")
  ) {
    return undefined;
  }

  if (
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("mailto:") ||
    lower.startsWith("tel:")
  ) {
    return trimmed;
  }

  // Prepend https:// to bare domains / paths
  return "https://" + trimmed;
}