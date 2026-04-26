'use client'
import { useEffect, useState, useRef } from 'react'
import StudioShell from '@/components/ui/StudioShell'
import { supabase } from '@/lib/supabase'

export default function ImagesPage() {
  const [images, setImages] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState('')
  const [form, setForm] = useState({ alt_text: '', caption: '', credit: '', year: '', location: '', project: '' })
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('images').select('*').order('created_at', { ascending: false })
    setImages(data ?? [])
  }

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return
    setUploading(true)
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      setProgress(`Uploading ${i + 1} of ${files.length}: ${file.name}`)
      const fd = new FormData()
      fd.append('file', file)
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      const res = await fetch('/api/studio/upload', { method: 'POST', body: fd })
      if (!res.ok) {
        const err = await res.json()
        setProgress(`Error: ${err.error}`)
      }
    }
    setUploading(false)
    setProgress('')
    load()
  }

  return (
    <StudioShell>
      <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 32, marginBottom: 32 }}>Images</h1>

      {/* Metadata form */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
        {(['project','caption','credit','location','year','alt_text'] as const).map(field => (
          <div key={field}>
            <label style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>{field.replace('_',' ')}</label>
            <input
              value={form[field]}
              onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
              style={{ width: '100%', background: '#1a1814', border: '1px solid #333', color: '#f4f1ea', padding: '8px 10px', fontFamily: 'var(--font-ibm-plex-mono)', fontSize: 12 }}
            />
          </div>
        ))}
      </div>

      {/* Upload zone */}
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
        style={{ border: '2px dashed #444', padding: 48, textAlign: 'center', marginBottom: 32, cursor: 'pointer' }}
        onClick={() => fileRef.current?.click()}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={e => handleFiles(e.target.files)}
        />
        {uploading
          ? <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: 12, color: '#c8522a' }}>{progress}</p>
          : <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: 11, color: '#6b6760', letterSpacing: '0.12em' }}>CLICK TO SELECT OR DRAG FILES HERE</p>
        }
      </div>

      {/* Image grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
        {images.map(img => (
          <div key={img.id} style={{ position: 'relative', aspectRatio: '3/2', overflow: 'hidden', background: '#111' }}>
            <img src={img.url} alt={img.alt_text || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.7)', padding: '6px 8px' }}>
              <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: 9, color: '#c4bfb4', margin: 0 }}>{img.project || img.filename}</p>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && !uploading && (
        <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: 11, color: '#444', textAlign: 'center', marginTop: 64 }}>No images yet. Upload above.</p>
      )}
    </StudioShell>
  )
}
