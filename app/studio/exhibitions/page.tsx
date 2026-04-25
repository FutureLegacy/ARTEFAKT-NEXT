'use client'
import { useEffect, useState } from 'react'
import StudioShell from '@/components/ui/StudioShell'
import { supabase } from '@/lib/supabase'

const BLANK = { title: '', artist_name: '', artist_bio: '', artist_url: '', dates_label: '', dates_start: '', dates_end: '', description: '', status: 'upcoming', sort_order: 0, image_id: null as string | null }

export default function ExhibitionsPage() {
  const [exhibitions, setExhibitions] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [form, setForm] = useState<typeof BLANK>(BLANK)
  const [images, setImages] = useState<any[]>([])
  const [saved, setSaved] = useState(false)
  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    load()
    supabase.from('images').select('id, alt_text, public_url').order('created_at', { ascending: false }).then(({ data }) => setImages(data ?? []))
  }, [])

  async function load() {
    const { data } = await supabase.from('exhibitions').select('*').order('sort_order')
    setExhibitions(data ?? [])
  }

  function selectEx(ex: any) {
    setSelected(ex)
    setIsNew(false)
    setForm({ title: ex.title, artist_name: ex.artist_name, artist_bio: ex.artist_bio || '', artist_url: ex.artist_url || '', dates_label: ex.dates_label || '', dates_start: ex.dates_start || '', dates_end: ex.dates_end || '', description: ex.description || '', status: ex.status, sort_order: ex.sort_order, image_id: ex.image_id })
  }

  function newEx() { setSelected(null); setIsNew(true); setForm({ ...BLANK, sort_order: exhibitions.length }) }

  async function save() {
    if (!form.artist_name || !form.title) return
    if (isNew) {
      const { data } = await supabase.from('exhibitions').insert(form).select().single()
      if (data) { setExhibitions(e => [data, ...e]); setSelected(data); setIsNew(false) }
    } else if (selected) {
      await supabase.from('exhibitions').update(form).eq('id', selected.id)
      setExhibitions(e => e.map(x => x.id === selected.id ? { ...selected, ...form } : x))
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function deleteEx() {
    if (!selected || !confirm(`Delete "${selected.title}"?`)) return
    await supabase.from('exhibitions').delete().eq('id', selected.id)
    setExhibitions(e => e.filter(x => x.id !== selected.id))
    setSelected(null)
  }

  const f = (k: string, v: any) => setForm(prev => ({ ...prev, [k]: v }))

  return (
    <StudioShell>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <div style={{ width: 260, borderRight: '1px solid #2a2520', overflowY: 'auto', flexShrink: 0 }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #2a2520', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 400, color: '#f2ede6' }}>Exhibitions</span>
            <button onClick={newEx} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#c0392b', border: 'none', color: '#f2ede6', padding: '6px 12px', cursor: 'pointer' }}>+ New</button>
          </div>
          {exhibitions.map((ex: any) => (
            <div key={ex.id} onClick={() => selectEx(ex)} style={{ padding: '12px 20px', cursor: 'pointer', borderBottom: '1px solid #1e1c18', background: selected?.id === ex.id ? 'rgba(242,237,230,0.05)' : 'transparent', borderLeft: selected?.id === ex.id ? '2px solid #c0392b' : '2px solid transparent' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: '#f2ede6' }}>{ex.artist_name}</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, textTransform: 'uppercase', color: ex.status === 'current' ? '#6aaa70' : ex.status === 'upcoming' ? '#c8b99a' : '#3a3530' }}>{ex.status}</span>
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: '#5a5550' }}>{ex.title}</div>
              {ex.dates_label && <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: '#3a3530', marginTop: 2 }}>{ex.dates_label}</div>}
            </div>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 48px', maxWidth: 700 }}>
          {!selected && !isNew ? (
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: '#3a3530', marginTop: 40 }}>← Select or create an exhibition.</div>
          ) : (
            <>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 400, color: '#f2ede6', marginBottom: 28 }}>{isNew ? 'New Exhibition' : form.artist_name}</div>
              {[
                { key: 'artist_name', label: 'Artist name *', type: 'input' },
                { key: 'title', label: 'Exhibition title *', type: 'input' },
                { key: 'dates_label', label: 'Dates (display)', type: 'input', placeholder: 'e.g. September 2026' },
                { key: 'artist_bio', label: 'Artist biography', type: 'textarea' },
                { key: 'artist_url', label: 'Artist website', type: 'input' },
                { key: 'description', label: 'Exhibition description', type: 'textarea' },
              ].map(field => (
                <div key={field.key} style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5a5550', marginBottom: 6 }}>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea rows={4} value={(form as any)[field.key] || ''} onChange={e => f(field.key, e.target.value)}
                      style={{ width: '100%', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, background: 'rgba(242,237,230,0.05)', border: '1px solid #2a2520', color: '#f2ede6', padding: '9px 12px', outline: 'none', resize: 'vertical' }} />
                  ) : (
                    <input value={(form as any)[field.key] || ''} placeholder={(field as any).placeholder} onChange={e => f(field.key, e.target.value)}
                      style={{ width: '100%', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, background: 'rgba(242,237,230,0.05)', border: '1px solid #2a2520', color: '#f2ede6', padding: '9px 12px', outline: 'none' }} />
                  )}
                </div>
              ))}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5a5550', marginBottom: 6 }}>Status</label>
                <select value={form.status} onChange={e => f('status', e.target.value)}
                  style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, background: 'rgba(242,237,230,0.05)', border: '1px solid #2a2520', color: '#f2ede6', padding: '9px 12px', outline: 'none', width: '100%' }}>
                  <option value="upcoming">Upcoming</option>
                  <option value="current">Current</option>
                  <option value="past">Past</option>
                </select>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5a5550', marginBottom: 6 }}>Exhibition image</label>
                <select value={form.image_id || ''} onChange={e => f('image_id', e.target.value || null)}
                  style={{ width: '100%', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, background: 'rgba(242,237,230,0.05)', border: '1px solid #2a2520', color: '#f2ede6', padding: '9px 12px', outline: 'none' }}>
                  <option value="">— No image —</option>
                  {images.map((img: any) => <option key={img.id} value={img.id}>{img.alt_text || img.id}</option>)}
                </select>
              </div>
              <div style={{ height: 1, background: '#2a2520', margin: '24px 0' }} />
              <button onClick={save} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', background: saved ? '#2a4030' : '#c0392b', border: 'none', color: '#f2ede6', padding: '11px 28px', cursor: 'pointer', marginRight: 10 }}>
                {saved ? 'Saved ✓' : isNew ? 'Create exhibition' : 'Save changes'}
              </button>
              {!isNew && selected && (
                <button onClick={deleteEx} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'transparent', border: '1px solid #3a1a16', color: '#5a2a28', padding: '10px 18px', cursor: 'pointer' }}>Delete</button>
              )}
            </>
          )}
        </div>
      </div>
    </StudioShell>
  )
}
