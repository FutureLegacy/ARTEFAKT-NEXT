import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email || !email.includes('@')) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    const supabase = createServiceClient()
    const { error } = await supabase.from('mailing_list').upsert({ email, active: true }, { onConflict: 'email' })
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
