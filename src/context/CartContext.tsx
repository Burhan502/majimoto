import { createContext, useContext, useMemo, useState } from 'react'
import { DELIVERY_FEE_TZS, products } from '../data/products'
import type { CartItem, Product } from '../types'

type CartContextValue = {
  items: CartItem[]
  addToCart: (productId: string, sizeId: string, quantity?: number) => void
  updateQuantity: (productId: string, sizeId: string, delta: number) => void
  removeFromCart: (productId: string, sizeId: string) => void
  clearCart: () => void
  subtotal: number
  deliveryFee: number
  total: number
  cartCount: number
  itemDetails: Array<{ product: Product; sizeId: string; sizeLabel: string; quantity: number; unitPrice: number; lineTotal: number }>
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (productId: string, sizeId: string, quantity = 1) => {
    setItems((current) => {
      const existingItem = current.find((item) => item.productId === productId && item.sizeId === sizeId)

      if (existingItem) {
        return current.map((item) =>
          item.productId === productId && item.sizeId === sizeId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [...current, { productId, sizeId, quantity }]
    })
  }

  const updateQuantity = (productId: string, sizeId: string, delta: number) => {
    setItems((current) =>
      current.flatMap((item) => {
        if (item.productId !== productId || item.sizeId !== sizeId) return [item]

        const nextQuantity = item.quantity + delta
        return nextQuantity <= 0 ? [] : [{ ...item, quantity: nextQuantity }]
      }),
    )
  }

  const removeFromCart = (productId: string, sizeId: string) => {
    setItems((current) => current.filter((item) => !(item.productId === productId && item.sizeId === sizeId)))
  }

  const clearCart = () => setItems([])

  const itemDetails = useMemo(() => {
    return items
      .map((item) => {
        const product = products.find((entry) => entry.id === item.productId)
        if (!product) return null

        const size = product.sizes.find((entry) => entry.id === item.sizeId)
        if (!size) return null

        return {
          product,
          sizeId: item.sizeId,
          sizeLabel: size.label,
          quantity: item.quantity,
          unitPrice: size.price,
          lineTotal: size.price * item.quantity,
        }
      })
      .filter(Boolean) as Array<{
        product: Product
        sizeId: string
        sizeLabel: string
        quantity: number
        unitPrice: number
        lineTotal: number
      }>
  }, [items])

  const subtotal = useMemo(
    () => itemDetails.reduce((total, item) => total + item.lineTotal, 0),
    [itemDetails],
  )

  const deliveryFee = items.length > 0 ? DELIVERY_FEE_TZS : 0
  const total = subtotal + deliveryFee
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      subtotal,
      deliveryFee,
      total,
      cartCount,
      itemDetails,
    }),
    [items, subtotal, deliveryFee, total, cartCount, itemDetails],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
