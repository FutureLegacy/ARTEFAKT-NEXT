import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const supabase = createServiceClient()

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const alt_text = formData.get('alt_text') as string || ''
    const caption = formData.get('caption') as string || ''
    const credit = formData.get('credit') as string || ''
    const year = formData.get('year') as string || ''
    const location = formData.get('location') as string || ''
    const project = formData.get('project') as string || ''

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

    const { error: storageError } = await supabase.storage
      .from('images')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (storageError) {
      return NextResponse.json({ error: storageError.message }, { status: 500 })
    }

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filename)

    const { data, error: dbError } = await supabase
      .from('images')
      .insert({
        url: publicUrl,
        filename,
        alt_text,
        caption,
        credit,
        year: year ? parseInt(year) : null,
        location,
        project,
      })
      .select()
      .single()

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    return NextResponse.json({ image: data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
