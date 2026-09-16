export type ProductCategory = 'Rice' | 'Beans'

export type ProductSize = {
  id: string
  label: string
  price?: number
  stock: number
}

export type Product = {
  id: string
  name: string
  category: ProductCategory
  weight: string
  description: string
  image: string
  source: string
  sizes: ProductSize[]
  stock: number
  isFeatured?: boolean
}

export type CartItem = {
  productId: string
  sizeId: string
  quantity: number
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Preparing'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'

export type OrderItem = {
  productId: string
  productName: string
  sizeLabel: string
  quantity: number
  price: number
}

export type CustomerOrder = {
  id: string
  customerName: string
  phone: string
  whatsapp: string
  deliveryRegion: string
  deliveryDistrict: string
  deliveryArea: string
  deliveryAddress: string
  instructions?: string
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  total: number
  status: OrderStatus
  createdAt: string
}

export type ContactForm = {
  name: string
  email: string
  phone: string
  message: string
}
