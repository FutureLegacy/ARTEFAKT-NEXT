'use client'

import { useEffect, useState } from 'react'
import StudioShell from '@/components/ui/StudioShell'
import { supabase } from '@/lib/supabase'

type ImageRow = {
  id: string
  filename?: string | null
  project?: string | null
  title?: string | null
  public_url?: string | null
  storage_path?: string | null
  created_at?: string | null
}

export default function ImagesPage() {
  const [images, setImages] = useState<ImageRow[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    setErrorMessage(null)

    const { data, error } = await supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Images load error:', error)
      setErrorMessage(error.message)
      setImages([])
    } else {
      setImages(data ?? [])
    }

    setLoading(false)
  }

  return (
    <StudioShell>
      <main className="p-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Artefakt Studio
          </p>
          <h1 className="text-3xl font-semibold">Images</h1>
          <p className="mt-2 text-sm text-neutral-500">
            {loading ? 'Loading...' : `${images.length} images in library`}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 rounded border border-red-300 bg-red-50 p-4 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <article key={img.id} className="overflow-hidden rounded border border-neutral-200 bg-white">
              {img.public_url ? (
                <img
                  src={img.public_url}
                  alt={img.title || img.filename || 'Archive image'}
                  className="h-56 w-full object-cover"
                />
              ) : (
                <div className="flex h-56 w-full items-center justify-center bg-neutral-100 text-sm text-neutral-400">
                  No preview
                </div>
              )}

              <div className="p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                  {img.project || 'Artefakt'}
                </p>
                <h2 className="mt-1 truncate text-sm font-medium">
                  {img.title || img.filename || 'Untitled image'}
                </h2>
              </div>
            </article>
          ))}
        </div>
      </main>
    </StudioShell>
  )
}
