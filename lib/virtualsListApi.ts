// Virtuals Liste API'den popüler agent'ları çekmek için utility fonksiyonlar

export interface VirtualsListAgent {
  id: number
  name: string
  description: string
  category: string | null
  rating: number | null
  profilePic?: string
  grossAgenticAmount?: number
  metrics: {
    successfulJobCount: number
    successRate: number
    uniqueBuyerCount: number
    isOnline: boolean
    lastActiveAt: string
  }
  offerings: Array<{
    name: string
    priceUsd: number
  }>
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
  isOnline?: boolean
}

export async function fetchPopularAgents(limit: number = 9): Promise<FormattedAgent[]> {
  try {
    const response = await fetch(
      `https://acpx.virtuals.io/api/agents?&sort=successfulJobCount&search=`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    )

    if (!response.ok) {
      console.error('Popüler agent\'lar çekilemedi:', response.status)
      return []
    }

    const data = await response.json()
    const agents: VirtualsListAgent[] = data.data || []
    
    // aGDP (grossAgenticAmount) değerine göre sırala (yüksekten düşüğe)
    const sortedAgents = agents.sort((a, b) => {
      const aGDP = a.grossAgenticAmount || 0
      const bGDP = b.grossAgenticAmount || 0
      return bGDP - aGDP
    })
    
    // İlk N agent'ı formatla
    return sortedAgents.slice(0, limit).map(formatListAgentData)
  } catch (error) {
    console.error('Popüler agent\'lar çekilirken hata:', error)
    return []
  }
}

function formatListAgentData(agent: VirtualsListAgent): FormattedAgent {
  // Functions listesi
  const functions = agent.offerings?.map(offering => offering.name) || []
  
  // En düşük fiyatı bul
  const prices = agent.offerings?.map(o => o.priceUsd) || []
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0
  const priceStr = minPrice > 0 ? `$${minPrice.toFixed(2)}` : 'Free'
  
  // Kategori mapping
  const categoryMap: Record<string, string> = {
    'ON_CHAIN': 'DeFi',
    'PRODUCTIVITY': 'Productivity',
    'ENTERTAINMENT': 'Entertainment',
    'INFORMATION': 'Information',
    'AI': 'AI',
    'DESIGN': 'Design',
    'DEVELOPMENT': 'Development',
    'MARKETING': 'Marketing',
    'CONTENT': 'Content',
    'SUPPORT': 'Support',
  }
  
  // Açıklamayı temizle (ilk satırı al)
  const cleanDescription = agent.description
    ?.split('\n')
    .filter(line => line.trim().length > 0)[0] 
    || agent.description?.split('\n')[0] 
    || ''
  
  return {
    id: agent.id,
    name: agent.name || `Agent ${agent.id}`,
    category: agent.category 
      ? (categoryMap[agent.category] || agent.category) 
      : 'General',
    description: cleanDescription.substring(0, 150) + (cleanDescription.length > 150 ? '...' : ''),
    rating: agent.rating || 0,
    price: priceStr,
    functions: functions.slice(0, 5), // İlk 5 fonksiyonu göster
    url: `https://app.virtuals.io/acp/agent-details/${agent.id}`,
    image: agent.profilePic,
    stats: agent.metrics ? {
      jobs: agent.metrics.successfulJobCount,
      successRate: agent.metrics.successRate,
    } : undefined,
    isOnline: agent.metrics?.isOnline,
  }
}

