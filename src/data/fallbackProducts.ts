import type { Product } from '../types'

const riceDescription = 'Majimoto Rice from trusted Mpibwe District farms, carefully packed for dependable family meals.'
const beansDescription = 'Majimoto Beans from trusted Mpibwe District farms, naturally grown and carefully packed.'

// Temporary placeholder prices; replace these with confirmed prices before launch.
export const fallbackProducts: Product[] = [
  { id: 'rice-1kg', name: 'Majimoto Rice', category: 'Rice', weight: '1 KG', description: riceDescription, image: '/products/rice 1 kg.png', source: 'Mpibwe District, Tanzania', stock: 60, isFeatured: true, sizes: [{ id: 'rice-1kg', label: '1 KG', price: 4200, stock: 60 }] },
  { id: 'rice-2kg', name: 'Majimoto Rice', category: 'Rice', weight: '2 KG', description: riceDescription, image: '/products/rice 2 kg.png', source: 'Mpibwe District, Tanzania', stock: 0, sizes: [{ id: 'rice-2kg', label: '2 KG', price: 8000, stock: 0 }] },
  { id: 'rice-5kg', name: 'Majimoto Rice', category: 'Rice', weight: '5 KG', description: riceDescription, image: '/products/rice 5 kg.png', source: 'Mpibwe District, Tanzania', stock: 30, isFeatured: true, sizes: [{ id: 'rice-5kg', label: '5 KG', price: 19000, stock: 30 }] },
  { id: 'rice-10kg', name: 'Majimoto Rice', category: 'Rice', weight: '10 KG', description: riceDescription, image: '/products/rice 10 kg.png', source: 'Mpibwe District, Tanzania', stock: 20, sizes: [{ id: 'rice-10kg', label: '10 KG', price: 37000, stock: 20 }] },
  { id: 'rice-15kg', name: 'Majimoto Rice', category: 'Rice', weight: '15 KG', description: riceDescription, image: '/products/rice 15 kg.png', source: 'Mpibwe District, Tanzania', stock: 0, sizes: [{ id: 'rice-15kg', label: '15 KG', price: 55000, stock: 0 }] },
  { id: 'rice-20kg', name: 'Majimoto Rice', category: 'Rice', weight: '20 KG', description: riceDescription, image: '/products/rice 20 kg.png', source: 'Mpibwe District, Tanzania', stock: 0, sizes: [{ id: 'rice-20kg', label: '20 KG', price: 72000, stock: 0 }] },
  { id: 'beans-1kg', name: 'Majimoto Beans', category: 'Beans', weight: '1 KG', description: beansDescription, image: '/products/beans 1 kg.jpeg', source: 'Mpibwe District, Tanzania', stock: 50, isFeatured: true, sizes: [{ id: 'beans-1kg', label: '1 KG', price: 3800, stock: 50 }] },
  { id: 'beans-2kg', name: 'Majimoto Beans', category: 'Beans', weight: '2 KG', description: beansDescription, image: '/products/beans 2 kg.jpeg', source: 'Mpibwe District, Tanzania', stock: 0, sizes: [{ id: 'beans-2kg', label: '2 KG', price: 7000, stock: 0 }] },
  { id: 'beans-5kg', name: 'Majimoto Beans', category: 'Beans', weight: '5 KG', description: beansDescription, image: '/products/beans 5.jpeg', source: 'Mpibwe District, Tanzania', stock: 20, isFeatured: true, sizes: [{ id: 'beans-5kg', label: '5 KG', price: 17500, stock: 20 }] },
  { id: 'beans-10kg', name: 'Majimoto Beans', category: 'Beans', weight: '10 KG', description: beansDescription, image: '/products/beans 10 kg.jpeg', source: 'Mpibwe District, Tanzania', stock: 12, sizes: [{ id: 'beans-10kg', label: '10 KG', price: 33500, stock: 12 }] },
  { id: 'beans-15kg', name: 'Majimoto Beans', category: 'Beans', weight: '15 KG', description: beansDescription, image: '/products/beans 15 kg.jpeg', source: 'Mpibwe District, Tanzania', stock: 0, sizes: [{ id: 'beans-15kg', label: '15 KG', price: 49000, stock: 0 }] },
  { id: 'beans-20kg', name: 'Majimoto Beans', category: 'Beans', weight: '20 KG', description: beansDescription, image: '/products/beans 20 kg.jpeg', source: 'Mpibwe District, Tanzania', stock: 0, sizes: [{ id: 'beans-20kg', label: '20 KG', price: 64000, stock: 0 }] },
]
