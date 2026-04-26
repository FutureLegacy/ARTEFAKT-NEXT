'use client'
import { useEffect, useState } from 'react'
import StudioShell from '@/components/ui/StudioShell'
import { supabase } from '@/lib/supabase'

export default function ImagesPage() {
    const [images, setImages] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [])

  async function load() {
        setLoading(true)
        const { data, error } = await supabase
          .from('images')
          .select('*')
          .order('created_at', { ascending: false })
        console.log('images loaded:', data?.length, 'error:', JSON.stringify(error))
        setImages(data ?? [])
        setLoading(false)
  }

  return (
        <StudioShell>
              <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 32, marginBottom: 8 }}>Images</h1>h1>
              <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: 11, color: '#6b6760', marginBottom: 32 }}>
                {loading ? 'Loading...' : `${images.length} images in library`}
              </p>p>
        
          {images.length === 0 && !loading && (
                  <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: 11, color: '#444', textAlign: 'center', marginTop: 64 }}>
                            No images found.
                  </p>p>
              )}
        
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 2 }}>
                {images.map(img => (
                    <div key={img.id} style={{ background: '#111' }}>
                                <img
                                                src={img.url || img.public_url}
                                                alt={img.alt_text || ''}
                                                style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', display: 'block' }}
                                                onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2' }}
                                              />
                                <div style={{ padding: '6px 8px', background: '#0c0b09' }}>
                                              <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: 9, color: '#c4bfb4', margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                                {img.project || 'Artefakt'}
                                              </p>p>
                                              <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: 8, color: '#444', margin: '2px 0 0' }}>
                                                {img.filename}
                                              </p>p>
                                </div>div>
                    </div>div>
                  ))}
              </div>div>
        </StudioShell>StudioShell>
      )
}</StudioShell>
