import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://artefakt.foundation'
  const now = new Date()
  return [
    { url: base,              lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/witness`,  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/akademy`,  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/preserve`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/sustain`,  lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
