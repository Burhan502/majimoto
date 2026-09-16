import type { Product } from '../types'

export const fallbackProducts: Product[] = [
  {
    id: 'rice-1kg',
    name: 'Majimoto Rice',
    category: 'Rice',
    description: 'Premium rice sourced from Mpanda farms, carefully cleaned and packed for daily family meals.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
    source: 'Mpanda, Tanzania',
    stock: 120,
    isFeatured: true,
    sizes: [
      { id: '1kg', label: '1 KG', price: 4200, stock: 60 },
      { id: '5kg', label: '5 KG', price: 19000, stock: 30 },
      { id: '10kg', label: '10 KG', price: 37000, stock: 20 },
      { id: '25kg', label: '25 KG', price: 89000, stock: 8 },
      { id: '50kg', label: '50 KG', price: 175000, stock: 5 },
    ],
  },
  {
    id: 'beans-1kg',
    name: 'Majimoto Beans',
    category: 'Beans',
    description: 'Nutritious and carefully selected beans from trusted agricultural sources in Mpanda.',
    image: 'https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=900&q=80',
    source: 'Mpanda, Tanzania',
    stock: 90,
    isFeatured: true,
    sizes: [
      { id: '1kg', label: '1 KG', price: 3800, stock: 50 },
      { id: '5kg', label: '5 KG', price: 17500, stock: 20 },
      { id: '10kg', label: '10 KG', price: 33500, stock: 12 },
      { id: '25kg', label: '25 KG', price: 82000, stock: 5 },
      { id: '50kg', label: '50 KG', price: 160000, stock: 3 },
    ],
  },
]
