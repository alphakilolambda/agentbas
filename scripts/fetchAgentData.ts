// Virtuals agent verilerini çekmek için script
// Bu script, verilen URL'lerden agent verilerini çeker

interface AgentData {
  id: number
  name: string
  category: string
  description: string
  rating: number
  price: string
  functions: string[]
  url: string
}

const agentUrls = [
  'https://app.virtuals.io/acp/agent-details/84',
  'https://app.virtuals.io/acp/agent-details/129',
  'https://app.virtuals.io/acp/agent-details/1048',
  'https://app.virtuals.io/acp/agent-details/788',
  'https://app.virtuals.io/acp/agent-details/395',
  'https://app.virtuals.io/acp/agent-details/74',
  'https://app.virtuals.io/acp/agent-details/1120',
]

async function fetchAgentData(url: string): Promise<AgentData | null> {
  try {
    // ID'yi URL'den çıkar
    const id = parseInt(url.split('/').pop() || '0')
    
    // API endpoint'ini dene (farklı olasılıklar)
    const apiEndpoints = [
      `https://app.virtuals.io/api/v1/agents/${id}`,
      `https://api.virtuals.io/v1/agents/${id}`,
      `https://app.virtuals.io/api/agents/${id}`,
    ]

    for (const endpoint of apiEndpoints) {
      try {
        const response = await fetch(endpoint, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0',
          },
        })

        if (response.ok) {
          const data = await response.json()
          return formatAgentData(data, id, url)
        }
      } catch (error) {
        // Sonraki endpoint'i dene
        continue
      }
    }

    // API çalışmazsa, HTML'den çekmeyi dene (basit parsing)
    const htmlResponse = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    })
    
    if (htmlResponse.ok) {
      const html = await htmlResponse.text()
      // Meta tag'lerinden veya script tag'lerinden veri çıkar
      // Bu kısım Virtuals'in HTML yapısına bağlı
      return extractFromHTML(html, id, url)
    }

    return null
  } catch (error) {
    console.error(`Error fetching agent data from ${url}:`, error)
    return null
  }
}

function formatAgentData(data: any, id: number, url: string): AgentData {
  return {
    id,
    name: data.name || data.title || `Agent ${id}`,
    category: data.category || data.type || 'General',
    description: data.description || data.summary || '',
    rating: data.rating || data.score || 0,
    price: data.price || data.cost || 'N/A',
    functions: data.functions || data.capabilities || [],
    url,
  }
}

function extractFromHTML(html: string, id: number, url: string): AgentData | null {
  // HTML'den temel bilgileri çıkar
  // Bu kısım Virtuals'in HTML yapısına göre özelleştirilmeli
  
  // Meta tag'lerinden title ve description çek
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
  
  return {
    id,
    name: titleMatch ? titleMatch[1].trim() : `Agent ${id}`,
    category: 'General',
    description: descMatch ? descMatch[1].trim() : '',
    rating: 0,
    price: 'N/A',
    functions: [],
    url,
  }
}

async function main() {
  console.log('Agent verileri çekiliyor...\n')
  
  const agents: AgentData[] = []
  
  for (const url of agentUrls) {
    console.log(`Çekiliyor: ${url}`)
    const data = await fetchAgentData(url)
    
    if (data) {
      agents.push(data)
      console.log(`✓ ${data.name} çekildi\n`)
    } else {
      console.log(`✗ Veri çekilemedi\n`)
    }
    
    // Rate limiting için bekle
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  console.log(`\nToplam ${agents.length} agent verisi çekildi.`)
  console.log('\nVeriler:')
  console.log(JSON.stringify(agents, null, 2))
}

// Script çalıştırılmak istenirse
if (require.main === module) {
  main().catch(console.error)
}

export { fetchAgentData, agentUrls }

