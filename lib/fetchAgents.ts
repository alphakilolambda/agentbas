// Agent verilerini çekmek için utility fonksiyon

export interface Agent {
  id: number
  name: string
  category: string
  description: string
  rating: number
  price: string
  functions: string[]
  url: string
}

export async function fetchAgents(ids: number[]): Promise<Agent[]> {
  try {
    const idsParam = ids.join(',')
    const response = await fetch(
      `/api/agents?ids=${idsParam}`,
      {
        next: { revalidate: 3600 }, // 1 saat cache
      }
    )

    if (!response.ok) {
      throw new Error('Agent verileri alınamadı')
    }

    const data = await response.json()
    return data.agents || []
  } catch (error) {
    console.error('Agent verileri çekilirken hata:', error)
    return []
  }
}

