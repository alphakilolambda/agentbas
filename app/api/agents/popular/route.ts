import { NextResponse } from 'next/server'
import { fetchPopularAgentsByVolume } from '@/lib/virtualsMetricsApi'

// Popüler agent'ları Virtuals Liste API'den çekmek için API route
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '9')
  
  try {
    const agentsData = await fetchPopularAgentsByVolume(limit)
    
    return NextResponse.json({ 
      agents: agentsData,
      count: agentsData.length 
    })
  } catch (error) {
    console.error('Popüler agent verileri alınırken hata:', error)
    return NextResponse.json(
      { error: 'Popüler agent verileri alınamadı' },
      { status: 500 }
    )
  }
}

