'use client'
import { useEffect, useState } from 'react'
import StudioShell from '@/components/ui/StudioShell'
import { supabase } from '@/lib/supabase'

const PANEL_TYPES = ['masthead', 'full-bleed-image', 'text-only', 'artist-list', 'pillar-grid', 'colophon']

export default function PagesEditor() {
  const [pages, setPages] = useState<any[]>([])
  const [activePage, setActivePage] = useState<any>(null)
  const [panels, setPanels] = useState<any[]>([])
  const [activePanel, setActivePanel] = useState<any>(null)
  const [images, setImages] = useState<any[]>([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    supabase.from('pages').select('*').order('slug').then(({ data }) => setPages(data ?? []))
    supabase.from('images').select('id, r2_key, public_url, alt_text').order('created_at', { ascending: false }).then(({ data }) => setImages(data ?? []))
  }, [])

  async function selectPage(page: any) {
    setActivePage(page)
    setActivePanel(null)
    const { data } = await supabase.from('panels').select('*').eq('page_id', page.id).order('sort_order')
    setPanels(data ?? [])
  }

  async function savePanel() {
    if (!activePanel) return
    await supabase.from('panels').upsert(activePanel)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function addPanel() {
    if (!activePage) return
    const { data } = await supabase.from('panels').insert({ page_id: activePage.id, sort_order: panels.length, type: 'masthead', headline: 'New panel' }).select().single()
    if (data) { setPanels(p => [...p, data]); setActivePanel(data) }
  }

  async function deletePanel(id: string) {
    if (!confirm('Delete this panel?')) return
    await supabase.from('panels').delete().eq('id', id)
    setPanels(p => p.filter(x => x.id !== id))
    setActivePanel(null)
  }

  async function movePanel(id: string, dir: 'up' | 'down') {
    const idx = panels.findIndex(p => p.id === id)
    if ((dir === 'up' && idx === 0) || (dir === 'down' && idx === panels.length - 1)) return
    const newPanels = [...panels]
    const swap = dir === 'up' ? idx - 1 : idx + 1
    ;[newPanels[idx], newPanels[swap]] = [newPanels[swap], newPanels[idx]]
    newPanels.forEach((p, i) => { p.sort_order = i })
    setPanels(newPanels)
    for (const p of newPanels) await supabase.from('panels').update({ sort_order: p.sort_order }).eq('id', p.id)
  }

  function up(field: string, value: any) {
    if (!activePanel) return
    setActivePanel({ ...activePanel, [field]: value })
  }

  const inputStyle = { width: '100%', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, background: 'rgba(242,237,230,0.05)', border: '1px solid #2a2520', color: '#f2ede6', padding: '9px 12px', outline: 'none' }
  const textareaStyle = { ...inputStyle, resize: 'vertical' as const, minHeight: 80 }
  const labelStyle = { display: 'block', fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: '#5a5550', marginBottom: 6 }

  return (
    <StudioShell>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

        {/* PAGE LIST */}
        <div style={{ width: 180, borderRight: '1px solid #2a2520', overflowY: 'auto', flexShrink: 0 }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #2a2520', fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3a3530' }}>Pages</div>
          {pages.map(p => (
            <div key={p.id} onClick={() => selectPage(p)} style={{ padding: '11px 16px', cursor: 'pointer', fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: activePage?.id === p.id ? '#f2ede6' : '#5a5550', background: activePage?.id === p.id ? 'rgba(242,237,230,0.05)' : 'transparent', borderLeft: activePage?.id === p.id ? '2px solid #c0392b' : '2px solid transparent' }}>
              {p.slug === 'home' ? 'Home' : p.slug.charAt(0).toUpperCase() + p.slug.slice(1)}
            </div>
          ))}
        </div>

        {/* PANEL LIST */}
        <div style={{ width: 220, borderRight: '1px solid #2a2520', overflowY: 'auto', flexShrink: 0 }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #2a2520', fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3a3530', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Panels</span>
            {activePage && <button onClick={addPanel} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, background: 'transparent', border: '1px solid #2a2520', color: '#5a5550', padding: '4px 8px', cursor: 'pointer' }}>+ Add</button>}
          </div>
          {panels.map((panel, i) => (
            <div key={panel.id} onClick={() => setActivePanel(panel)} style={{ padding: '11px 16px', cursor: 'pointer', borderBottom: '1px solid #1e1c18', background: activePanel?.id === panel.id ? 'rgba(242,237,230,0.05)' : 'transparent', borderLeft: activePanel?.id === panel.id ? '2px solid #c8b99a' : '2px solid transparent' }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: activePanel?.id === panel.id ? '#f2ede6' : '#5a5550', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{panel.headline || panel.content_headline || `Panel ${i + 1}`}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3a3530', marginTop: 2 }}>{panel.type}</div>
            </div>
          ))}
          {activePage && panels.length === 0 && <div style={{ padding: '16px', fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: '#3a3530' }}>No panels. Click + Add.</div>}
        </div>

        {/* EDITOR */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>
          {!activePage && <div style={{ color: '#3a3530', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, marginTop: 40 }}>← Select a page</div>}

          {activePage && !activePanel && (
            <>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, color: '#f2ede6', marginBottom: 24 }}>{activePage.slug} — Page settings</div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Page title</label>
                <input style={inputStyle} value={activePage.title} onChange={e => setActivePage({ ...activePage, title: e.target.value })} />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Meta description</label>
                <textarea style={textareaStyle} rows={3} value={activePage.meta_description} onChange={e => setActivePage({ ...activePage, meta_description: e.target.value })} />
              </div>
              <button onClick={async () => { await supabase.from('pages').update({ title: activePage.title, meta_description: activePage.meta_description }).eq('id', activePage.id); setSaved(true); setTimeout(() => setSaved(false), 2000) }}
                style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', background: saved ? '#2a4030' : '#c0392b', border: 'none', color: '#f2ede6', padding: '11px 24px', cursor: 'pointer' }}>
                {saved ? 'Saved ✓' : 'Save settings'}
              </button>
            </>
          )}

          {activePanel && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 400, color: '#f2ede6', marginBottom: 4 }}>{activePanel.headline || activePanel.content_headline || 'Panel'}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5a5550' }}>{activePanel.type}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => movePanel(activePanel.id, 'up')} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, background: 'transparent', border: '1px solid #2a2520', color: '#5a5550', padding: '5px 10px', cursor: 'pointer' }}>↑</button>
                  <button onClick={() => movePanel(activePanel.id, 'down')} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, background: 'transparent', border: '1px solid #2a2520', color: '#5a5550', padding: '5px 10px', cursor: 'pointer' }}>↓</button>
                  <button onClick={() => deletePanel(activePanel.id)} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'transparent', border: '1px solid #5a1a16', color: '#c0392b', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Panel type</label>
                <select style={{ ...inputStyle, width: 'auto' }} value={activePanel.type} onChange={e => up('type', e.target.value)}>
                  {PANEL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div style={{ height: 1, background: '#2a2520', margin: '20px 0' }} />

              {(activePanel.type === 'masthead' || activePanel.type === 'text-only') && <>
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>Headline (plain text)</label>
                  <input style={inputStyle} value={activePanel.headline || ''} onChange={e => up('headline', e.target.value)} />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>Headline — italic portion</label>
                  <input style={inputStyle} value={activePanel.headline_em || ''} onChange={e => up('headline_em', e.target.value)} placeholder="e.g. stays." />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>Lede / body</label>
                  <textarea style={textareaStyle} rows={5} value={activePanel.lede || activePanel.body_text || ''} onChange={e => up(activePanel.type === 'masthead' ? 'lede' : 'body_text', e.target.value)} />
                </div>
                {activePanel.type === 'text-only' && (
                  <div style={{ marginBottom: 18 }}>
                    <label style={labelStyle}>Background</label>
                    <select style={{ ...inputStyle, width: 'auto' }} value={activePanel.background || 'canal'} onChange={e => up('background', e.target.value)}>
                      <option value="canal">Canal (dark)</option>
                      <option value="paper">Paper (light)</option>
                      <option value="ink">Ink (black)</option>
                    </select>
                  </div>
                )}
              </>}

              {activePanel.type === 'full-bleed-image' && <>
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>Photograph</label>
                  <select style={inputStyle} value={activePanel.image_id || ''} onChange={e => up('image_id', e.target.value)}>
                    <option value="">— Select image —</option>
                    {images.map(img => <option key={img.id} value={img.id}>{img.alt_text || img.r2_key}</option>)}
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
                  <div>
                    <label style={labelStyle}>Pillar code</label>
                    <input style={inputStyle} value={activePanel.pillar_code || ''} onChange={e => up('pillar_code', e.target.value)} placeholder="01 · WITNESS" />
                  </div>
                  <div>
                    <label style={labelStyle}>Overlay sub</label>
                    <input style={inputStyle} value={activePanel.overlay_sub || ''} onChange={e => up('overlay_sub', e.target.value)} />
                  </div>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>Content label</label>
                  <input style={inputStyle} value={activePanel.content_label || ''} onChange={e => up('content_label', e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
                  <div>
                    <label style={labelStyle}>Headline (plain)</label>
                    <input style={inputStyle} value={activePanel.content_headline || ''} onChange={e => up('content_headline', e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Headline (italic)</label>
                    <input style={inputStyle} value={activePanel.content_headline_em || ''} onChange={e => up('content_headline_em', e.target.value)} />
                  </div>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>Body text</label>
                  <textarea style={textareaStyle} rows={4} value={activePanel.content_body || ''} onChange={e => up('content_body', e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
                  <div>
                    <label style={labelStyle}>Link text</label>
                    <input style={inputStyle} value={activePanel.content_link_text || ''} onChange={e => up('content_link_text', e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Link href</label>
                    <input style={inputStyle} value={activePanel.content_link_href || ''} onChange={e => up('content_link_href', e.target.value)} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
                  <div>
                    <label style={labelStyle}>Stamp top</label>
                    <input style={inputStyle} value={activePanel.stamp_top || ''} onChange={e => up('stamp_top', e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Stamp bottom</label>
                    <input style={inputStyle} value={activePanel.stamp_bottom || ''} onChange={e => up('stamp_bottom', e.target.value)} />
                  </div>
                </div>
              </>}

              <div style={{ height: 1, background: '#2a2520', margin: '20px 0' }} />
              <button onClick={savePanel} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', background: saved ? '#2a4030' : '#c0392b', border: 'none', color: '#f2ede6', padding: '11px 24px', cursor: 'pointer' }}>
                {saved ? 'Saved ✓' : 'Save panel →'}
              </button>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: '#3a3530', marginLeft: 12 }}>Live within 60 seconds.</span>
            </>
          )}
        </div>
      </div>
    </StudioShell>
  )
}
