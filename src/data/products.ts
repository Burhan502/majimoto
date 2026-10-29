import type { Product } from '../types'
import { fallbackProducts } from './fallbackProducts'
import { apiRequest } from '../services/api'

export const DELIVERY_FEE_TZS = 3500
export const WHATSAPP_NUMBER = '+255768415973'

let cachedProducts: Product[] | null = null

export const products: Product[] = fallbackProducts

function applyPlaceholderPrices(products: Product[]): Product[] {
  return products.map((product) => {
    return {
      ...product,
      sizes: product.sizes.map((size) => {
        const placeholderPrice = fallbackProducts
          .filter((item) => item.category === product.category)
          .flatMap((item) => item.sizes)
          .find((item) => item.label === size.label)?.price
        return { ...size, price: size.price ?? placeholderPrice }
      }),
    }
  })
}

export async function loadProducts(): Promise<Product[]> {
  try {
    const data = await apiRequest<Product[]>('/api/products')
    if (Array.isArray(data) && data.length > 0) {
      cachedProducts = applyPlaceholderPrices(data)
      return cachedProducts
    }
  } catch {
    cachedProducts = fallbackProducts
  }

  return cachedProducts ?? fallbackProducts
}

export const featuredProducts = fallbackProducts.filter((product) => product.isFeatured)

export const formatTZS = (value: number) => {
  return new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency: 'TZS',
    maximumFractionDigits: 0,
  }).format(value)
}
