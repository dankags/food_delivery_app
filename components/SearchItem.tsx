import { memo, useCallback } from 'react'
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CustomIcon from './CustomIcon'
import { router } from 'expo-router'

const { width } = Dimensions.get("screen")
const SEARCH_ITEM_WIDTH = width * 0.45
const SEARCH_ITEM_HEIGHT = SEARCH_ITEM_WIDTH * 1.2

interface SearchItemProps {
  id: string|number
  name: string
  price: number
  image: any
  description: string
  category: string
  isFavorite?: boolean
  onAddToCart?: () => void
  onPress?: () => void
}

const SearchItem = memo<SearchItemProps>(({ 
  id,
  name, 
  price, 
  image, 
  description, 
  category, 
  isFavorite = false,
  onAddToCart,
  onPress 
}: SearchItemProps) => {
  
  const handleAddToCart = useCallback(() => {
    onAddToCart?.()
  }, [onAddToCart])

  const handlePress = useCallback(() => {
    console.log(id)
    router.push({
      pathname: "/(pages)/(others)/detail/[id]",
      params: {
        id
      }
    })
  }, [onPress])

  return (
    <TouchableOpacity 
      className='relative items-center justify-end px-4 py-3 bg-transparent rounded-lg' 
      style={[{ width: SEARCH_ITEM_WIDTH, height: SEARCH_ITEM_HEIGHT }]}
      onPress={handlePress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${category}, $${price}`}
      accessibilityHint="Double tap to view details"
    >
      <View style={styles.shadow} className='rounded-2xl bg-white p-4 w-full h-[78%] justify-end items-center'>
        <Text className='text-text-secondary text-xl font-quicksand-bold font-bold text-center' numberOfLines={2}>
          {name}
        </Text>
        <Text className='text-gray-400 text-sm font-quicksand-bold font-bold'>
          from $ {price.toFixed(2)}
        </Text>
        <TouchableOpacity 
          className='flex-row items-center gap-2 py-2'
          onPress={handleAddToCart}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Add to cart"
          accessibilityHint="Adds this item to your shopping cart"
        >
          <CustomIcon iconLibraryType='Ionicons' iconName='add' size={20} color='#FE8C00'/>
          <Text className='text-text-primary font-quicksand-bold font-bold'>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      <View className='absolute top-0 w-[90%] aspect-square'>
        <Image 
          source={image} 
          className='w-full h-full' 
          resizeMode="contain"
          accessibilityLabel={`${name} image`}
        />
      </View>
    </TouchableOpacity>
  )
})

SearchItem.displayName = 'SearchItem'

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

export default SearchItem
