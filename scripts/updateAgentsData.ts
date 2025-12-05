// Agent verilerini API'den çekip static data dosyasını güncelleyen script
// Kullanım: npx tsx scripts/updateAgentsData.ts

import { writeFileSync } from 'fs'
import { join } from 'path'

const AGENT_IDS = [84, 129, 1048, 788, 395, 74, 1120]

interface AgentData {
  id: number
  name: string
  description: string
  category: string
  rating: number
  profilePic?: string
  jobs: Array<{
    name: string
    price: number
  }>
  successfulJobCount?: number
  successRate?: number
}

interface FormattedAgent {
  id: number
  name: string
  category: string
  description: string
  rating: number
  price: string
  functions: string[]
  url: string
  image?: string
}

async function fetchAgent(id: number): Promise<FormattedAgent | null> {
  try {
    const response = await fetch(`https://acpx.virtuals.io/api/agents/${id}/details`)
    if (!response.ok) {
      console.error(`Agent ${id} için yanıt alınamadı:`, response.status)
      return null
    }

    const data = await response.json()
    const agent: AgentData = data.data

    // Açıklamayı temizle (ilk satır)
    const cleanDescription = agent.description
      .split('\n')
      .filter(line => line.trim().length > 0)[0] || agent.description.split('\n')[0] || ''

    // En düşük fiyatı bul
    const prices = agent.jobs?.map(j => j.price) || []
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0
    const priceStr = minPrice > 0 ? `$${minPrice.toFixed(2)}` : 'Ücretsiz'

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

    return {
      id: agent.id,
      name: agent.name,
      category: categoryMap[agent.category] || agent.category || 'General',
      description: cleanDescription.substring(0, 150) + (cleanDescription.length > 150 ? '...' : ''),
      rating: agent.rating || 0,
      price: priceStr,
      functions: agent.jobs?.map(j => j.name).slice(0, 5) || [],
      url: `https://app.virtuals.io/acp/agent-details/${agent.id}`,
      image: agent.profilePic,
    }
  } catch (error) {
    console.error(`Agent ${id} çekilirken hata:`, error)
    return null
  }
}

async function main() {
  console.log('Agent verileri çekiliyor...\n')
  
  const agents: FormattedAgent[] = []
  
  for (const id of AGENT_IDS) {
    console.log(`Çekiliyor: Agent ${id}...`)
    const agent = await fetchAgent(id)
    
    if (agent) {
      agents.push(agent)
      console.log(`✓ ${agent.name} çekildi\n`)
    } else {
      console.log(`✗ Agent ${id} çekilemedi\n`)
    }
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  
  // TypeScript dosyasını oluştur
  const fileContent = `// Virtuals ACP ekosistemindeki gerçek agent verileri
// Bu dosya otomatik olarak güncellenir - manuel düzenlemeyin

export interface Agent {
  id: number
  name: string
  category: string
  description: string
  rating: number
  price: string
  functions: string[]
  url: string
  image?: string
}

export const agents: Agent[] = ${JSON.stringify(agents, null, 2).replace(/"(\w+)":/g, '$1:')}
`

  const filePath = join(process.cwd(), 'data', 'agents.ts')
  writeFileSync(filePath, fileContent, 'utf-8')
  
  console.log(`\n✓ ${agents.length} agent verisi data/agents.ts dosyasına kaydedildi!`)
  console.log(`Dosya yolu: ${filePath}`)
}

main().catch(console.error)

