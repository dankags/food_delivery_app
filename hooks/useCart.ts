import { dummyCartItems } from '@/constants/data'
import { useCallback, useMemo, useState } from 'react'

export interface CartItem {
  id: number | string
  name: string
  price: number
  image: any
  quantity: number
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(dummyCartItems)
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([])
  const [isSelectionMode, setIsSelectionMode] = useState(false)

  // Memoized calculations
  const totalItems = useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.quantity, 0), 
    [cartItems]
  )

  const totalPrice = useMemo(() => 
    cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), 
    [cartItems]
  )

  const selectedItemsCount = useMemo(() => selectedItems.length, [selectedItems])
  const selectedItemsTotal = useMemo(() => 
    selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), 
    [selectedItems]
  )

  // Cart operations
  const updateQuantity = useCallback((id: string | number, newQuantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }, [])

  const removeItem = useCallback((id: string | number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
    setSelectedItems(prev => prev.filter(item => item.id !== id))
  }, [])

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

  // Selection operations
  const toggleSelectionMode = useCallback(() => {
    setIsSelectionMode(prev => !prev)
    if (selectedItems.length > 0) {
      setSelectedItems([])
    }
  }, [selectedItems.length])

  const toggleItemSelection = useCallback((item: CartItem) => {
    setSelectedItems(prev => {
      const isSelected = prev.some(selectedItem => selectedItem.id === item.id)
      if (isSelected) {
        return prev.filter(selectedItem => selectedItem.id !== item.id)
      } else {
        return [...prev, item]
      }
    })
    
    // Auto-enable selection mode when first item is selected
    if (!isSelectionMode) {
      setIsSelectionMode(true)
    }
  }, [isSelectionMode])

  const selectAllItems = useCallback(() => {
    setSelectedItems([...cartItems])
    setIsSelectionMode(true)
  }, [cartItems])

  const clearSelection = useCallback(() => {
    setSelectedItems([])
    setIsSelectionMode(false)
  }, [])

  const removeSelectedItems = useCallback(() => {
    const selectedIds = selectedItems.map(item => item.id)
    setCartItems(prev => prev.filter(item => !selectedIds.includes(item.id)))
    setSelectedItems([])
    setIsSelectionMode(false)
  }, [selectedItems])

  // Check if item is selected
  const isItemSelected = useCallback((id: string | number) => 
    selectedItems.some(item => item.id === id), 
    [selectedItems]
  )

  return {
    // State
    cartItems,
    selectedItems,
    isSelectionMode,
    
    // Computed values
    totalItems,
    totalPrice,
    selectedItemsCount,
    selectedItemsTotal,
    
    // Cart operations
    updateQuantity,
    removeItem,
    addToCart,
    
    // Selection operations
    toggleSelectionMode,
    toggleItemSelection,
    selectAllItems,
    clearSelection,
    removeSelectedItems,
    isItemSelected,
  }
} 