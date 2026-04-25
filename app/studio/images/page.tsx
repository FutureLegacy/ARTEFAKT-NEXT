'use client'
import { useEffect, useState, useRef } from 'react'
import StudioShell from '@/components/ui/StudioShell'
import { supabase } from '@/lib/supabase'

export default function ImagesPage() {
  const [images, setImages] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [saved, setSaved] = useState(false)
  const [filter, setFilter] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({ alt_text: '', caption: '', credit: '', year: '', location: '', project: '' })

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('images').select('*').order('created_at', { ascending: false })
    setImages(data ?? [])
  }

  function selectImage(img: any) {
    setSelected(img)
    setForm({ alt_text: img.alt_text || '', caption: img.caption || '', credit: img.credit || '', year: img.year?.toString() || '', location: img.location || '', project: img.project || '' })
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files?.length) return
    setUploading(true)
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      setUploadProgress(`Uploading ${i + 1} / ${files.length}: ${file.name}`)
      const fd = new FormData()
      fd.append('file', file)
      fd.append('alt_text', file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '))
      await fetch('/api/studio/upload', { method: 'POST', body: fd })
    }
    setUploading(false)
    setUploadProgress('')
    load()
    if (fileRef.current) fileRef.current.value = ''
  }

  async function saveMetadata() {
    if (!selected) return
    await supabase.from('images').update({ alt_text: form.alt_text, caption: form.caption, credit: form.credit, year: form.year ? parseInt(form.year) : null, location: form.location, project: form.project }).eq('id', selected.id)
    setImages(imgs => imgs.map(i => i.id === selected.id ? { ...i, ...form, year: form.year ? parseInt(form.year) : null } : i))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function deleteImage() {
    if (!selected || !confirm('Delete this image?')) return
    await supabase.from('images').delete().eq('id', selected.id)
    setImages(imgs => imgs.filter(i => i.id !== selected.id))
    setSelected(null)
  }

  const filtered = filter ? images.filter(i => [i.alt_text, i.project, i.location, i.caption].join(' ').toLowerCase().includes(filter.toLowerCase())) : images

  return (
    <StudioShell>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #2a2520', display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 400, color: '#f2ede6' }}>Image Library</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: '#3a3530' }}>{images.length} images</span>
            <div style={{ flex: 1 }} />
            <input placeholder="Filter…" value={filter} onChange={e => setFilter(e.target.value)}
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, background: 'rgba(242,237,230,0.05)', border: '1px solid #2a2520', color: '#f2ede6', padding: '6px 12px', outline: 'none', width: 180 }} />
            <button onClick={() => fileRef.current?.click()} disabled={uploading}
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#c0392b', border: 'none', color: '#f2ede6', padding: '8px 18px', cursor: 'pointer' }}>
              {uploading ? uploadProgress || 'Uploading…' : '+ Upload'}
            </button>
            <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleUpload} />
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10, alignContent: 'start' }}>
            {filtered.map((img: any) => (
              <div key={img.id} onClick={() => selectImage(img)} style={{ cursor: 'pointer', border: selected?.id === img.id ? '2px solid #c0392b' : '2px solid transparent', background: '#1a1814', overflow: 'hidden' }}>
                {img.public_url ? (
                  <img src={img.public_url} alt={img.alt_text} style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', height: 120, background: '#2a2520', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: '#3a3530' }}>No preview</div>
                )}
                <div style={{ padding: '6px 8px' }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: '#9a9088', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{img.alt_text || img.r2_key}</div>
                  {img.project && <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, color: '#3a3530', marginTop: 2 }}>{img.project}</div>}
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div style={{ gridColumn: '1/-1', fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: '#3a3530', paddingTop: 40, textAlign: 'center' }}>{filter ? 'No images match.' : 'No images yet. Upload to get started.'}</div>}
          </div>
        </div>

        <div style={{ width: 300, borderLeft: '1px solid #2a2520', overflowY: 'auto', padding: 24, flexShrink: 0 }}>
          {!selected ? (
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: '#3a3530', paddingTop: 20 }}>Select an image to edit metadata.</div>
          ) : (
            <>
              {selected.public_url && <img src={selected.public_url} alt="" style={{ width: '100%', marginBottom: 20, border: '1px solid #2a2520', display: 'block' }} />}
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: '#3a3530', marginBottom: 16, lineHeight: 1.8 }}>
                {selected.r2_key}<br />{selected.file_size ? `${Math.round(selected.file_size / 1024)} KB` : ''}
              </div>
              {[
                { key: 'alt_text', label: 'Alt text', type: 'input' },
                { key: 'caption', label: 'Caption', type: 'textarea' },
                { key: 'credit', label: 'Credit / © line', type: 'input' },
                { key: 'year', label: 'Year', type: 'input' },
                { key: 'location', label: 'Location', type: 'input' },
                { key: 'project', label: 'Project', type: 'input' },
              ].map(field => (
                <div key={field.key} style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5a5550', marginBottom: 4 }}>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea rows={3} value={(form as any)[field.key]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      style={{ width: '100%', fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, background: 'rgba(242,237,230,0.05)', border: '1px solid #2a2520', color: '#f2ede6', padding: '7px 10px', outline: 'none', resize: 'vertical' }} />
                  ) : (
                    <input value={(form as any)[field.key]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      style={{ width: '100%', fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, background: 'rgba(242,237,230,0.05)', border: '1px solid #2a2520', color: '#f2ede6', padding: '7px 10px', outline: 'none' }} />
                  )}
                </div>
              ))}
              <button onClick={saveMetadata} style={{ width: '100%', fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', background: saved ? '#2a4030' : '#c0392b', border: 'none', color: '#f2ede6', padding: '10px 0', cursor: 'pointer', marginBottom: 8 }}>
                {saved ? 'Saved ✓' : 'Save metadata'}
              </button>
              <button onClick={deleteImage} style={{ width: '100%', fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'transparent', border: '1px solid #3a1a16', color: '#5a2a28', padding: '8px 0', cursor: 'pointer' }}>
                Delete image
              </button>
            </>
          )}
        </div>
      </div>
    </StudioShell>
  )
}
