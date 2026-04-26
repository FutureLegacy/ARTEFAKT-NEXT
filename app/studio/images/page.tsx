export default function StudioImagesPage() {
  return (
    <main style={{ padding: 48, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <p style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#777' }}>
        Artefakt Studio
      </p>

      <h1 style={{ fontSize: 36, margin: '12px 0 16px' }}>
        Images
      </h1>

      <p style={{ maxWidth: 640, lineHeight: 1.6, color: '#555' }}>
        The studio images page is temporarily simplified so the production build can complete.
        Public site images are served from the site image folder.
      </p>

      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
        <img src="/images/witness.jpg" alt="Witness" style={{ width: '100%', height: 220, objectFit: 'cover' }} />
        <img src="/images/connect.jpg" alt="Connect" style={{ width: '100%', height: 220, objectFit: 'cover' }} />
        <img src="/images/legacy.jpg" alt="Legacy" style={{ width: '100%', height: 220, objectFit: 'cover' }} />
        <img src="/images/sustain.jpg" alt="Sustain" style={{ width: '100%', height: 220, objectFit: 'cover' }} />
      </div>
    </main>
  )
}
