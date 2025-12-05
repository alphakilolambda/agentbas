// Virtuals API'den agent verilerini çekmek için utility fonksiyonlar

export interface VirtualsAgent {
  id: number
  name: string
  description: string
  category: string
  rating: number
  profilePic?: string
  jobs: Array<{
    id: number
    name: string
    price: number
    description: string
  }>
  offerings: Array<{
    id: number
    name: string
    price: number
  }>
  successfulJobCount?: number
  successRate?: number
}

export interface FormattedAgent {
  id: number
  name: string
  category: string
  description: string
  rating: number
  price: string
  functions: string[]
  url: string
  image?: string
  stats?: {
    jobs: number
    successRate: number
  }
}

export async function fetchAgentFromVirtuals(id: number): Promise<FormattedAgent | null> {
  try {
    const response = await fetch(`https://acpx.virtuals.io/api/agents/${id}/details`, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      console.error(`Agent ${id} için API yanıt vermedi:`, response.status)
      return null
    }

    const data = await response.json()
    return formatVirtualsAgentData(data.data)
  } catch (error) {
    console.error(`Agent ${id} çekilirken hata:`, error)
    return null
  }
}

function formatVirtualsAgentData(data: any): FormattedAgent {
  // Jobs'dan fonksiyon isimlerini çıkar
  const functions = data.jobs?.map((job: any) => job.name) || []
  
  // En düşük fiyatı bul (jobs ve offerings'den)
  const prices = [
    ...(data.offerings?.map((o: any) => o.price) || []),
    ...(data.jobs?.map((j: any) => j.price) || [])
  ]
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0
  const priceStr = minPrice > 0 ? `$${minPrice.toFixed(2)}` : 'Free'
  
  // Kategori mapping
  const categoryMap: Record<string, string> = {
    'ON_CHAIN': 'DeFi',
    'AI': 'AI',
    'DESIGN': 'Design',
    'DEVELOPMENT': 'Development',
    'MARKETING': 'Marketing',
    'CONTENT': 'Content',
    'SUPPORT': 'Support',
  }
  
  // Açıklamayı temizle (ilk satırı al, \n karakterlerini temizle)
  const cleanDescription = data.description
    ?.split('\n')
    .filter((line: string) => line.trim().length > 0)[0] 
    || data.description?.split('\n')[0] 
    || ''
  
  return {
    id: data.id,
    name: data.name || `Agent ${data.id}`,
    category: categoryMap[data.category] || data.category || 'General',
    description: cleanDescription.substring(0, 150) + (cleanDescription.length > 150 ? '...' : ''),
    rating: data.rating || 0,
    price: priceStr,
    functions: functions.slice(0, 5), // İlk 5 fonksiyonu göster
    url: `https://app.virtuals.io/acp/agent-details/${data.id}`,
    image: data.profilePic,
    stats: data.successfulJobCount && data.successRate ? {
      jobs: data.successfulJobCount,
      successRate: data.successRate,
    } : undefined,
  }
}

export async function fetchMultipleAgents(ids: number[]): Promise<FormattedAgent[]> {
  const agents = await Promise.all(
    ids.map(id => fetchAgentFromVirtuals(id))
  )
  
  return agents.filter((agent): agent is FormattedAgent => agent !== null)
}

