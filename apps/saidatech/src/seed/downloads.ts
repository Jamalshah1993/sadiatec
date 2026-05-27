// Downloads collection requires a `file` upload (relationship to media).
// Real download PDFs must be uploaded via the Payload admin UI before
// creating collection records. Seed is intentionally empty — use the
// DownloadsGridBlock `source: 'inline'` option for homepage demo data.
export async function seedDownloads(): Promise<void> {}
