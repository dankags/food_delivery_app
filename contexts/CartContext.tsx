import React, { createContext, useContext, ReactNode } from 'react'
import { useCart, CartItem } from '@/hooks/useCart'

interface CartContextType {
  cartItems: CartItem[]
  selectedItems: CartItem[]
  isSelectionMode: boolean
  totalItems: number
  totalPrice: number
  selectedItemsCount: number
  selectedItemsTotal: number
  updateQuantity: (id: string | number, newQuantity: number) => void
  removeItem: (id: string | number) => void
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  toggleSelectionMode: () => void
  toggleItemSelection: (item: CartItem) => void
  selectAllItems: () => void
  clearSelection: () => void
  removeSelectedItems: () => void
  isItemSelected: (id: string | number) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const cartHook = useCart()

  return (
    <CartContext.Provider value={cartHook}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
} 