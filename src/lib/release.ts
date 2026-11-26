// Data rilis untuk tombol download (desain: board "Download — states" di lakar-meta/design/lakar-landing.pen).
// Hanya dipanggil di server; hasil fetch di-cache Next (ISR) sesuai `revalidate` per feed.

export const REPO = "fatmuh/lakar";
export const GITHUB_URL = `https://github.com/${REPO}`;
export const RELEASES_URL = `${GITHUB_URL}/releases`;
export const NIGHTLY_RELEASES_URL = `${RELEASES_URL}?q=nightly`;

export type Channel = "stable" | "nightly";
export type Os = "mac" | "windows" | "linux";

export type Asset = {
  id: "mac-arm" | "mac-intel" | "win-exe" | "win-msi" | "linux-appimage" | "linux-deb";
  os: Os;
  label: string;
  ext: string;
  file: string;
  url: string;
};

export type Release = { channel: Channel; version: string; tag: string; assets: Asset[]; sums: string; page: string };

/** Feed updater Tauri yang diterbitkan release.yml: stabil = aset rilis `latest`, nightly = branch `nightly-feed`. */
const FEEDS: Record<Channel, { url: string; revalidate: number }> = {
  stable: { url: `${GITHUB_URL}/releases/latest/download/latest.json`, revalidate: 3600 },
  // Nightly lama dihapus begitu yang baru terbit, jadi feed-nya dibaca lebih sering.
  nightly: { url: `https://raw.githubusercontent.com/${REPO}/nightly-feed/latest.json`, revalidate: 600 },
};

const VERSION_RE = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.]+)?$/;
const TAG_RE = /\/releases\/download\/([^/]+)\//;

/**
 * Nama berkas mengikuti bundle Tauri di release.yml (Lakar_<versi>_<arch>.<ext>).
 * Nightly tidak punya MSI: Windows nightly hanya NSIS (-setup.exe).
 */
function assetsFor(channel: Channel, version: string, base: string): Asset[] {
  const f = (suffix: string) => `Lakar_${version}_${suffix}`;
  const list: Omit<Asset, "url">[] = [
    { id: "mac-arm", os: "mac", label: "Apple silicon", ext: ".dmg", file: f("aarch64.dmg") },
    { id: "mac-intel", os: "mac", label: "Intel", ext: ".dmg", file: f("x64.dmg") },
    { id: "win-exe", os: "windows", label: "Installer", ext: ".exe", file: f("x64-setup.exe") },
    ...(channel === "stable" ? [{ id: "win-msi" as const, os: "windows" as const, label: "MSI package", ext: ".msi", file: f("x64_en-US.msi") }] : []),
    { id: "linux-appimage", os: "linux", label: "AppImage", ext: ".AppImage", file: f("amd64.AppImage") },
    { id: "linux-deb", os: "linux", label: "Debian / Ubuntu", ext: ".deb", file: f("amd64.deb") },
  ];
  return list.map((a) => ({ ...a, url: `${base}${a.file}` }));
}

export async function getRelease(channel: Channel): Promise<Release | null> {
  const feed = FEEDS[channel];
  try {
    const res = await fetch(feed.url, { next: { revalidate: feed.revalidate } });
    if (!res.ok) return null;
    const data = (await res.json()) as { version?: unknown; platforms?: Record<string, { url?: unknown }> };
    const version = typeof data.version === "string" ? data.version : "";
    if (!VERSION_RE.test(version)) return null;
    // Tag rilis diambil dari URL aset di feed (stabil: v0.1.8, nightly: nightly-<ts>).
    const firstUrl = Object.values(data.platforms ?? {}).map((p) => p?.url).find((u): u is string => typeof u === "string");
    const tag = firstUrl?.match(TAG_RE)?.[1];
    if (!tag) return null;
    const base = `${GITHUB_URL}/releases/download/${tag}/`;
    return { channel, version, tag, assets: assetsFor(channel, version, base), sums: `${base}SHA256SUMS.txt`, page: `${GITHUB_URL}/releases/tag/${tag}` };
  } catch {
    return null;
  }
}

/** Jumlah star repo; null bila API tidak terjangkau (atau terkena rate limit). */
export async function getStars(): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: unknown };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}
