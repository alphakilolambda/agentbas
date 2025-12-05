// Virtuals Metrics API'den popüler agent'ları çekmek için utility fonksiyonlar
// Bu endpoint volume (aGDP) değerine göre sıralı veri veriyor

export interface VirtualsMetricsAgent {
  id: number
  name: string
  profilePic?: string
  volume: number
  grossAgenticAmount: number
  memoCount: number
  successfulJobCount: number
  uniqueBuyerCount: number
  successRate: number
  lastActiveAt: string
  isVirtualAgent: number
  virtualAgentId?: number | null
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
    volume?: number
  }
  isOnline?: boolean
}

export async function fetchPopularAgentsByVolume(limit: number = 9): Promise<FormattedAgent[]> {
  try {
    // Metrics endpoint'inden volume'a göre sıralı agent'ları al
    const metricsResponse = await fetch(
      `https://acpx.virtuals.io/api/internal/redash/agent-metrics?page=1&pageSize=${limit}&sortBy=volume&sortOrder=desc`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 }, // 1 saat cache
      }
    )

    if (!metricsResponse.ok) {
      console.error('Agent metrics çekilemedi:', metricsResponse.status)
      return []
    }

    const metricsData = await metricsResponse.json()
    const metricsAgents: VirtualsMetricsAgent[] = metricsData.data || []

    // Her agent için detaylı bilgileri çek
    const agentsWithDetails = await Promise.all(
      metricsAgents.map(async (metricsAgent) => {
        try {
          // Detay endpoint'inden tam bilgileri al
          const detailsResponse = await fetch(
            `https://acpx.virtuals.io/api/agents/${metricsAgent.id}/details`,
            {
              headers: {
                'Accept': 'application/json',
              },
              next: { revalidate: 3600 },
            }
          )

          if (!detailsResponse.ok) {
            // Detay çekilemezse sadece metrics bilgilerini kullan
            return formatMetricsAgentData(metricsAgent, null)
          }

          const detailsData = await detailsResponse.json()
          return formatMetricsAgentData(metricsAgent, detailsData.data)
        } catch (error) {
          console.error(`Agent ${metricsAgent.id} detayları çekilirken hata:`, error)
          return formatMetricsAgentData(metricsAgent, null)
        }
      })
    )

    return agentsWithDetails.filter((agent): agent is FormattedAgent => agent !== null)
  } catch (error) {
    console.error('Popüler agent\'lar çekilirken hata:', error)
    return []
  }
}

function formatMetricsAgentData(
  metricsAgent: VirtualsMetricsAgent,
  detailsData: any | null
): FormattedAgent | null {
  // Detaylardan bilgileri al, yoksa varsayılanlar kullan
  const description = detailsData?.description
    ?.split('\n')
    .filter((line: string) => line.trim().length > 0)[0] 
    || detailsData?.description?.split('\n')[0] 
    || ''

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

  const category = detailsData?.category
    ? (categoryMap[detailsData.category] || detailsData.category)
    : 'General'

  // Functions listesi
  const functions = detailsData?.jobs?.map((job: any) => job.name) || []

  // En düşük fiyatı bul
  const prices = [
    ...(detailsData?.offerings?.map((o: any) => o.price || o.priceUsd) || []),
    ...(detailsData?.jobs?.map((j: any) => j.price) || []),
  ]
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0
  const priceStr = minPrice > 0 ? `$${minPrice.toFixed(2)}` : 'Free'

  return {
    id: metricsAgent.id,
    name: metricsAgent.name || `Agent ${metricsAgent.id}`,
    category,
    description: description.substring(0, 150) + (description.length > 150 ? '...' : ''),
    rating: detailsData?.rating || 0,
    price: priceStr,
    functions: functions.slice(0, 5),
    url: `https://app.virtuals.io/acp/agent-details/${metricsAgent.id}`,
    image: metricsAgent.profilePic || detailsData?.profilePic,
    stats: {
      jobs: metricsAgent.successfulJobCount,
      successRate: metricsAgent.successRate,
      volume: metricsAgent.volume,
    },
    isOnline: metricsAgent.lastActiveAt !== '2999-12-31T00:00:00',
  }
}

