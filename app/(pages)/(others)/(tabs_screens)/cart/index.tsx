import CartItemComponent from '@/components/cartItem'
import CustomIcon from '@/components/CustomIcon'
import { useCart } from '@/hooks/useCart'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { router, Stack } from 'expo-router'
import React, { memo, useCallback } from 'react'
import { Alert, FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface CartHeaderProps {
  props: NativeStackHeaderProps
  isSelectionMode: boolean
  selectedItemsCount: number
  onToggleSelectionMode: () => void
  onSelectAll: () => void
  onClearSelection: () => void
  onRemoveSelected: () => void
}

const CartHeader = memo<CartHeaderProps>(({ 
  props, 
  isSelectionMode, 
  selectedItemsCount, 
  onToggleSelectionMode, 
  onSelectAll, 
  onClearSelection, 
  onRemoveSelected 
}) => {
  const handleRemoveSelected = useCallback(() => {
    Alert.alert(
      "Remove Items",
      `Are you sure you want to remove ${selectedItemsCount} item${selectedItemsCount > 1 ? 's' : ''}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", style: "destructive", onPress: onRemoveSelected }
      ]
    )
  }, [selectedItemsCount, onRemoveSelected])

  return (
    <View className='bg-[#fafafa] p-4 gap-3'>
      {/* Top row */}
      <View className='flex-row items-center justify-between'>
        {/* Left - Back button */}
        <View>
          {props.navigation.canGoBack() && (
            <TouchableOpacity 
              onPress={() => props.navigation.goBack()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <CustomIcon iconLibraryType='Ionicons' iconName='arrow-back' size={24} color='#000' />
            </TouchableOpacity>
          )}
        </View>

        {/* Center - Title */}
        <Text className='text-2xl font-quicksand-bold font-bold text-gray-800'>
          {isSelectionMode ? `Selected (${selectedItemsCount})` : 'Cart'}
        </Text>

        {/* Right - Search or Selection controls */}
        <View className='flex-row items-center gap-2'>
          {isSelectionMode ? (
            <>
              <TouchableOpacity 
                onPress={onSelectAll}
                className='p-2'
                accessibilityRole="button"
                accessibilityLabel="Select all items"
              >
                <CustomIcon iconLibraryType='Ionicons' iconName='checkmark-circle-outline' size={20} color='#EB920C' />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={onClearSelection}
                className='p-2'
                accessibilityRole="button"
                accessibilityLabel="Clear selection"
              >
                <CustomIcon iconLibraryType='Ionicons' iconName='close-circle-outline' size={20} color='#666' />
              </TouchableOpacity>
              {selectedItemsCount > 0 && (
                <TouchableOpacity 
                  onPress={handleRemoveSelected}
                  className='p-2'
                  accessibilityRole="button"
                  accessibilityLabel="Remove selected items"
                >
                  <CustomIcon iconLibraryType='Ionicons' iconName='trash-outline' size={20} color='#ff4444' />
                </TouchableOpacity>
              )}
            </>
          ) : (
            <>
              <TouchableOpacity 
                onPress={onToggleSelectionMode}
                className='p-2'
                accessibilityRole="button"
                accessibilityLabel="Enter selection mode"
              >
                <CustomIcon iconLibraryType='Ionicons' iconName='checkbox-outline' size={20} color='#666' />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => router.push('/search')}
                accessibilityRole="button"
                accessibilityLabel="Search for more items"
              >
                <CustomIcon iconLibraryType='Ionicons' iconName='search' size={24} color='#000' />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Selection mode instructions */}
      {isSelectionMode && (
        <Text className='text-sm text-gray-600 text-center'>
          Tap items to select, long press to enter selection mode
        </Text>
      )}
    </View>
  )
})

CartHeader.displayName = 'CartHeader'

const CartSummary = memo<{ totalItems: number; totalPrice: number; onCheckout: () => void }>(
  ({ totalItems, totalPrice, onCheckout }) => {
    if (totalItems === 0) return null

    return (
      <View className='bg-white p-4 border-t border-gray-200'>
        {/* title */}
        <Text className='text-2xl font-quicksand-bold font-bold text-gray-800 my-4'>Payment Summary</Text>
        
        {/* total items checkout */}
        <View className='flex-row items-center justify-between mb-4'>
          <Text className='text-lg font-quicksand-semibold text-gray-800'>
            Total ({totalItems} item{totalItems > 1 ? 's' : ''})
          </Text>
          <Text className='text-xl font-quicksand-semibold text-text-secondary'>
            ${totalPrice.toFixed(2)}
          </Text>
        </View>

        {/* Delivery fee */}
        <View className='flex-row items-center justify-between mb-4'>
          <Text className='text-lg font-quicksand-semibold text-gray-800'>
            Delivery Fee
          </Text>
          <Text className='text-xl font-quicksand-bold text-text-secondary'>
            Free
          </Text>
        </View>

        {/* Discount */}
        <View className='flex-row items-center justify-between mb-4'>
          <Text className='text-lg font-quicksand-semibold text-gray-800'>
            Discount
          </Text>
          <Text className='text-xl font-quicksand-bold text-green-500'>
            -${140}
          </Text>
        </View>

        <View className='flex-row items-center justify-between mb-4 h-0.5 w-full bg-gray-200'/>

        {/* Total */}
        <View className='flex-row items-center justify-between mb-4'>
          <Text className='text-2xl font-quicksand-bold text-gray-800'>
            Total 
          </Text>
          <Text className='text-2xl font-quicksand-bold text-text-secondary'>
            {/* remember to put discount here */}
            ${(totalPrice-140).toFixed(2)}
          </Text>
        </View>
        
        <TouchableOpacity 
          onPress={onCheckout}
          className='bg-orange-500 py-3 px-6 rounded-lg items-center'
          accessibilityRole="button"
          accessibilityLabel="Proceed to checkout"
        >
          <Text className='text-white font-quicksand-bold text-lg'>
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
)

CartSummary.displayName = 'CartSummary'

const EmptyCart = memo(() => (
  <View className='flex-1 items-center justify-center p-8'>
    <CustomIcon 
      iconLibraryType='Ionicons' 
      iconName='cart-outline' 
      size={80} 
      color='#ccc' 
    />
    <Text className='text-xl font-quicksand-bold text-gray-400 mt-4 text-center'>
      Your cart is empty
    </Text>
    <Text className='text-gray-500 mt-2 text-center'>
      Add some delicious items to get started
    </Text>
    <TouchableOpacity 
      onPress={() => router.push('/search')}
      className='bg-orange-500 py-3 px-6 rounded-lg mt-6'
      accessibilityRole="button"
      accessibilityLabel="Browse menu"
    >
      <Text className='text-white font-quicksand-bold'>
        Browse Menu
      </Text>
    </TouchableOpacity>
  </View>
))

EmptyCart.displayName = 'EmptyCart'

// ListHeaderComponent
const ListHeaderComponent=memo(()=>{
  return(
    <View className='bg-[#fafafa] pb-6'>
      <View className='flex-row items-center justify-between w-full'>
        {/* left */}
        <View className=''>
          <Text className='text-text-primary text-sm font-quicksand-bold font-bold'>SEARCH</Text>
          <View className='flex-row items-center gap-2'>
            <Text className='text-text-secondary text-sm font-quicksand-bold font-bold'>Find your Favorite Food</Text>
          </View>
        </View>
    
        {/* right */}
        <View className='bg-[#fafafa] rounded-full'>
          <TouchableOpacity 
            activeOpacity={0.8} 
            className='px-3 py-2 border-2 border-primary rounded-full'
            accessibilityRole="button"
            accessibilityLabel="Shopping cart"
            accessibilityHint="Opens shopping cart"
          >
            <Text className='text-text-primary  font-quicksand-bold font-bold'>Change Location</Text>          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
})

ListHeaderComponent.displayName = 'ListHeaderComponent'


const Cart = () => {
  const {
    cartItems,
    selectedItems,
    isSelectionMode,
    totalItems,
    totalPrice,
    selectedItemsCount,
    updateQuantity,
    removeItem,
    toggleSelectionMode,
    toggleItemSelection,
    selectAllItems,
    clearSelection,
    removeSelectedItems,
    isItemSelected,
  } = useCart()

  const handleCheckout = useCallback(() => {
    // Navigate to checkout screen
    console.log('Navigate to checkout')
  }, [])

  const handleLongPress = useCallback((id: string | number) => {
    if (!isSelectionMode) {
      toggleSelectionMode()
      toggleItemSelection(cartItems.find(item => item.id === id)!)
    }
  }, [isSelectionMode, toggleSelectionMode, toggleItemSelection, cartItems])

  const renderCartItem = useCallback(({ item }: { item: any }) => (
    <CartItemComponent
      {...item}
      isSelected={isItemSelected(item.id)}
      isSelectionMode={isSelectionMode}
      onQuantityChange={updateQuantity}
      onRemove={removeItem}
      onToggleSelection={() => toggleItemSelection(item)}
      onLongPress={handleLongPress}
    />
  ), [isItemSelected, isSelectionMode, updateQuantity, removeItem, toggleItemSelection, handleLongPress])

  const keyExtractor = useCallback((item: any) => item.id.toString(), [])

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
        <StatusBar barStyle="dark-content" backgroundColor='#fafafa' />
        <Stack.Screen 
          options={{
            headerShown: true,
            header: (props) => (
              <CartHeader
                props={props}
                isSelectionMode={false}
                selectedItemsCount={0}
                onToggleSelectionMode={() => {}}
                onSelectAll={() => {}}
                onClearSelection={() => {}}
                onRemoveSelected={() => {}}
              />
            )
          }}
        />
        <EmptyCart />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <StatusBar barStyle="dark-content" backgroundColor='#fafafa' />
      <Stack.Screen 
        options={{
          headerShown: true,
          header: (props) => (
            <CartHeader
              props={props}
              isSelectionMode={isSelectionMode}
              selectedItemsCount={selectedItemsCount}
              onToggleSelectionMode={toggleSelectionMode}
              onSelectAll={selectAllItems}
              onClearSelection={clearSelection}
              onRemoveSelected={removeSelectedItems}
            />
          )
        }}
      />
      
      <FlatList
        data={cartItems}
        ListHeaderComponent={ListHeaderComponent}
        keyExtractor={keyExtractor}
        renderItem={renderCartItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        ItemSeparatorComponent={()=>{
          return(
            <View className='h-2 bg-[#fafafa]' />
          )
        }}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={5}
      />
      
      <CartSummary 
        totalItems={totalItems} 
        totalPrice={totalPrice} 
        onCheckout={handleCheckout}
      />
    </SafeAreaView>
  )
}

export default Cart
