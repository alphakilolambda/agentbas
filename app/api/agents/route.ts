import { NextResponse } from 'next/server'
import { fetchMultipleAgents } from '@/lib/virtualsApi'

// Agent verilerini Virtuals API'den çekmek için API route
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ids = searchParams.get('ids')

  if (!ids) {
    return NextResponse.json({ error: 'Agent ID\'leri gerekli' }, { status: 400 })
  }

  const agentIds = ids.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
  
  if (agentIds.length === 0) {
    return NextResponse.json({ error: 'Geçerli Agent ID\'leri gerekli' }, { status: 400 })
  }
  
  try {
    // Virtuals API'den verileri çek
    const agentsData = await fetchMultipleAgents(agentIds)
    
    return NextResponse.json({ 
      agents: agentsData,
      count: agentsData.length 
    })
  } catch (error) {
    console.error('Agent verileri alınırken hata:', error)
    return NextResponse.json(
      { error: 'Agent verileri alınamadı' },
      { status: 500 }
    )
  }
}


