import React, { memo, useCallback } from 'react'
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import CustomIcon from './CustomIcon'



interface CartItemProps {
  id: string | number
  name: string
  price: number
  image: any
  quantity: number
  isSelected?: boolean
  isSelectionMode?: boolean
  onQuantityChange?: (id: string | number, newQuantity: number) => void
  onRemove?: (id: string | number) => void
  onToggleSelection?: (id: string | number) => void
  onLongPress?: (id: string | number) => void
}

const CartItemComponent: React.FC<CartItemProps> = memo(({
  id,
  name,
  price,
  image,
  quantity,
  isSelected = false,
  isSelectionMode = false,
  onQuantityChange,
  onRemove,
  onToggleSelection,
  onLongPress
}) => {
  
  const handleIncrement = useCallback(() => {
    onQuantityChange?.(id, quantity + 1)
  }, [id, quantity, onQuantityChange])

  const handleDecrement = useCallback(() => {
    if (quantity > 1) {
      onQuantityChange?.(id, quantity - 1)
    } else {
      onRemove?.(id)
    }
  }, [id, quantity, onQuantityChange, onRemove])

  const handleRemove = useCallback(() => {
    onRemove?.(id)
  }, [id, onRemove])

  const handlePress = useCallback(() => {
    if (isSelectionMode) {
      onToggleSelection?.(id)
    }
  }, [isSelectionMode, onToggleSelection, id])

  const handleLongPress = useCallback(() => {
    onLongPress?.(id)
  }, [onLongPress, id])

  const handleQuantityPress = useCallback((e: any) => {
    e.stopPropagation()
  }, [])

  return (
    <Pressable 
      onLongPress={handleLongPress} 
      onPress={handlePress} 
      className="rounded-lg  mb-3 shadow-sm"
      style={[{ opacity: isSelectionMode && !isSelected ? 0.6 : 1 }]}
    >
      <View style={styles.shadow} className="bg-white flex-row items-center p-4 rounded-lg">
        {/* Checkbox - only show in selection mode */}
        {isSelectionMode && (
          <View className="mr-4">
            <CustomIcon 
              iconLibraryType="Ionicons" 
              iconName={isSelected ? "checkbox" : "square-outline"} 
              size={24} 
              color={isSelected ? "#EB920C" : "#666"} 
            />
          </View>
        )}

        {/* Image */}
        <View className="w-20 h-20 rounded-lg overflow-hidden mr-4 bg-primary/10">
          <Image 
            source={image} 
            className="w-full h-full"
            resizeMode="cover"
            accessibilityLabel={`${name} image`}
          />
        </View>

        {/* Content */}
        <View className="flex-1">
          <Text className="text-lg font-quicksand-bold text-gray-800 mb-1" numberOfLines={2}>
            {name}
          </Text>
          <Text className="text-base font-quicksand-medium text-orange-500 mb-2">
            ${price.toFixed(2)}
          </Text>

          {/* Quantity Controls */}
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={handleDecrement}
              onPressIn={handleQuantityPress}
              className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
              accessibilityRole="button"
              accessibilityLabel="Decrease quantity"
              accessibilityHint="Decreases the quantity of this item"
            >
              <CustomIcon 
                iconLibraryType="Ionicons" 
                iconName="remove" 
                size={16} 
                color="#666" 
              />
            </TouchableOpacity>

            <Text className="mx-4 text-lg font-quicksand-medium text-gray-800 min-w-[20px] text-center">
              {quantity}
            </Text>

            <TouchableOpacity 
              onPress={handleIncrement}
              onPressIn={handleQuantityPress}
              className="w-8 h-8 rounded-full bg-orange-100 items-center justify-center"
              accessibilityRole="button"
              accessibilityLabel="Increase quantity"
              accessibilityHint="Increases the quantity of this item"
            >
              <CustomIcon 
                iconLibraryType="Ionicons" 
                iconName="add" 
                size={16} 
                color="#EB920C" 
              />
            </TouchableOpacity>

            {/* Remove Button - only show when not in selection mode */}
            {!isSelectionMode && (
              <TouchableOpacity 
                onPress={handleRemove}
                onPressIn={handleQuantityPress}
                className="ml-auto p-2"
                accessibilityRole="button"
                accessibilityLabel="Remove item"
                accessibilityHint="Removes this item from cart"
              >
                <CustomIcon 
                  iconLibraryType="Ionicons" 
                  iconName="trash-outline" 
                  size={20} 
                  color="#ff4444" 
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  )
})

CartItemComponent.displayName = 'CartItemComponent'

const styles = StyleSheet.create({
  shadow:{
      ...Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
          },
          android: {
            elevation: 2,
          },
        }),},
});

export default CartItemComponent
