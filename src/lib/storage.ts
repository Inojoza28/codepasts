import type { Folder, Snippet } from "./types";

const SNIPPETS_KEY = "devfolder.snippets.v1";
const LEGACY_SNIPPETS_KEY = "codepast.snippets.v1";
const FOLDERS_KEY = "devfolder.folders.v1";
const LEGACY_FOLDERS_KEY = "codepast.folders.v1";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const storage = {
  loadSnippets(): Snippet[] {
    if (typeof window === "undefined") return [];
    const current = safeParse<Snippet[] | null>(localStorage.getItem(SNIPPETS_KEY), null);
    if (current) return current;

    const legacy = safeParse<Snippet[]>(localStorage.getItem(LEGACY_SNIPPETS_KEY), []);
    if (legacy.length > 0) {
      localStorage.setItem(SNIPPETS_KEY, JSON.stringify(legacy));
      localStorage.removeItem(LEGACY_SNIPPETS_KEY);
    }
    return legacy;
  },
  saveSnippets(snippets: Snippet[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(SNIPPETS_KEY, JSON.stringify(snippets));
  },
  loadFolders(): Folder[] {
    if (typeof window === "undefined") return [];
    const current = safeParse<Folder[] | null>(localStorage.getItem(FOLDERS_KEY), null);
    if (current) return current;

    const legacy = safeParse<Folder[]>(localStorage.getItem(LEGACY_FOLDERS_KEY), []);
    if (legacy.length > 0) {
      localStorage.setItem(FOLDERS_KEY, JSON.stringify(legacy));
      localStorage.removeItem(LEGACY_FOLDERS_KEY);
    }
    return legacy;
  },
  saveFolders(folders: Folder[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
  },
};

export function uid(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 10)
  );
}
