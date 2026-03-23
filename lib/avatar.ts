const DICEBEAR_BASE = "https://api.dicebear.com/9.x/lorelei/svg";

export function getAvatarUrl(fullName: string): string {
  const seed = fullName.trim().toLowerCase().replace(/\s+/g, "-");
  return `${DICEBEAR_BASE}?seed=${encodeURIComponent(seed)}`;
}
