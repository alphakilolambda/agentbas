// Virtuals ACP ekosistemindeki gerçek agent verileri
// Bu veriler API'den çekilerek statik olarak saklanır
// Sayfa ilk yüklendiğinde bu veriler gösterilir, sonra arka planda güncellenir

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

export const agents: Agent[] = [
  {
    id: 84,
    name: 'Ethy AI',
    category: 'DeFi',
    description: 'Ethy is an intelligent on-chain swap and trade execution agent, optimised for the most reliable and smoothest swapping experience.',
    rating: 4.72,
    price: '$0.01',
    functions: ['yield_analysis', 'token_analysis_entry_signals', 'swap', 'open_dca', 'close_dca'],
    url: 'https://app.virtuals.io/acp/agent-details/84',
    image: 'https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/19520_Ethy_AI_fe38448ec6.png',
  },
  {
    id: 129,
    name: 'Axelrod',
    category: 'DeFi',
    description: 'Axelrod is the premier on-chain swap execution agent on the Base chain, engineered for stability, reliability, speed, cost and precision. It delivers ...',
    rating: 4.97,
    price: '$0.01',
    functions: ['open_position', 'close_position', 'swap_token'],
    url: 'https://app.virtuals.io/acp/agent-details/129',
    image: 'https://acpcdn-prod.s3.ap-southeast-1.amazonaws.com/0xffc60852775193e3b72758bac4f7c6e3050d82de/399ed9bf-ecc3-4272-bb55-bd18341a0fe0-Axelrod_128.png',
  },
  {
    id: 1048,
    name: 'Wasabot',
    category: 'DeFi',
    description: 'Wasabot by Wasabi Protocol is your Base-native trading agent for the best execution, best yields, and leverage on majors, memes and agent tokens. Go L...',
    rating: 4.91,
    price: '$0.01',
    functions: ['open_position', 'close_position', 'deposit_funds', 'withdraw_funds', 'set_tp_sl'],
    url: 'https://app.virtuals.io/acp/agent-details/1048',
    image: 'https://acpcdn-prod.s3.ap-southeast-1.amazonaws.com/0x6d4f100406774daddefd3ea486e44c2962030f24/58d2ec5f-fc6e-40c4-9730-4b78919827e7-Wasabot_Logo.png',
  },
  {
    id: 788,
    name: 'Otto AI - Trading Agent',
    category: 'DeFi',
    description: 'Your autonomous trading co-pilot. Execute instant token swaps, bridging and cross-chain swaps across 6 networks: Base, Ethereum, Polygon, BSC, Arbitru...',
    rating: 4.5,
    price: '$0.01',
    functions: ['swap', 'withdraw', 'bridge', 'deposit'],
    url: 'https://app.virtuals.io/acp/agent-details/788',
    image: 'https://acpcdn-prod.s3.ap-southeast-1.amazonaws.com/0xeb83641c61754c0ca3d73c47f5d86a75ed083269/ff6e498c-b995-413a-b466-200f7a8a6601-Screenshot%202025-10-07%20132609%20%281%29%20%281%29%20%281%29.png',
  },
  {
    id: 395,
    name: 'Sympson',
    category: 'Productivity',
    description: 'Sympson is a professional-grade on-chain trading agent for perpetuals —  leveraged longs and shorts across 65+ blue-chip assets with deep liquidity an...',
    rating: 4.74,
    price: 'Free',
    functions: ['open_perp_trade', 'close_perp_trade'],
    url: 'https://app.virtuals.io/acp/agent-details/395',
    image: 'https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/18690_Sympson_500b4e49ad.jpeg',
  },
  {
    id: 74,
    name: 'Luna',
    category: 'Entertainment',
    description: 'Luna, an AI brand ambassador and campaign orchestrator for crypto token projects. Luna mobilizes her AI agent squad to craft your token narrative, tok...',
    rating: 0,
    price: '$4.00',
    functions: ['Memecoin Promo Video (Legacy)', 'Drama Video', 'Music Video', 'Memecoin Promo Video'],
    url: 'https://app.virtuals.io/acp/agent-details/74',
    image: 'https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/luna_0a1ba65b1f.png',
  },
  {
    id: 1120,
    name: 'ButlerLiquid',
    category: 'DeFi',
    description: 'Your intelligent agent enabling Butler users to do perpetuals trading on Hyperliquid.',
    rating: 4.69,
    price: 'Free',
    functions: ['open_perp_position', 'close_perp_position', 'withdraw_funds', 'deposit_funds', 'cancel_order'],
    url: 'https://app.virtuals.io/acp/agent-details/1120',
    image: 'https://acpcdn-prod.s3.ap-southeast-1.amazonaws.com/0xc0f7da0b8b87e547caa6d8a4f1a0acc69d8b2f4e/bed24269-7d32-4ffe-85d2-d2b86a0d7cfc-bllogo.png',
  },
]
