import CustomIcon from '@/components/CustomIcon'
import EmptyState from '@/components/EmptyState'
import SearchItem from '@/components/SearchItem'
import { FilterType, useSearch } from '@/hooks/useSearch'
import { router, Stack } from 'expo-router'
import { memo, useCallback, useState } from 'react'
import { Dimensions, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width } = Dimensions.get("screen")

// Constants
const SEARCH_ITEM_WIDTH = width * 0.45
const SEARCH_ITEM_HEIGHT = SEARCH_ITEM_WIDTH * 1.2
const FILTERS: FilterType[] = ["All", "Burgers", "Pizza", "Fries", "Drinks"]
const ITEM_SEPARATOR_HEIGHT = width * 0.02
const HORIZONTAL_SEPARATOR_WIDTH = width * 0.02

interface FilterItemProps {
  item: FilterType
  index: number
  selectedFilter: FilterType
  onPress: (filter: FilterType) => void
}

interface SearchHeaderProps {
  cartItemCount: number
  onCartPress: () => void
}

interface SearchInputProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
}

// Memoized Components
const FilterItem = memo<FilterItemProps>(({ item, index, selectedFilter, onPress }) => {
  const isSelected = selectedFilter === item
  
  return (
    <TouchableOpacity 
      key={index} 
      className={`${isSelected ? "bg-primary" : "bg-white"} rounded-full px-4 py-2`} 
      onPress={() => onPress(item)}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={`Filter by ${item}`}
    >
      <Text className={`${isSelected ? "text-white" : "text-text-secondary"} font-quicksand-bold font-bold`}>
        {item}
      </Text>
    </TouchableOpacity>
  )
})

FilterItem.displayName = 'FilterItem'

const SearchInput = memo<SearchInputProps>(({ value, onChangeText, placeholder = "Search for food" }) => {
  return (
    <View className='w-full items-center justify-center'>
      <View className='w-full rounded-full bg-white py-2 px-3 flex-row items-center justify-between'>
        <TextInput 
          placeholder={placeholder} 
          className='flex-1 text-black font-quicksand-semibold font-semibold'
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <CustomIcon iconLibraryType='Ionicons' iconName='search' size={24} color='#9ca3af'/>
      </View>
    </View>
  )
})

SearchInput.displayName = 'SearchInput'

interface SearchHeaderProps {
  cartItemCount: number
  onCartPress: () => void
  searchValue: string
  onSearchChange: (text: string) => void
}

const SearchHeader = memo<SearchHeaderProps>(({ cartItemCount, onCartPress, searchValue, onSearchChange }) => {
  return (
    <View className='bg-[#fafafa] p-4 gap-5'>
      <View className='flex-row items-center justify-between w-full'>
        {/* left */}
        <View className='bg-[#fafafa]'>
          <Text className='text-text-primary text-sm font-quicksand-bold font-bold'>SEARCH</Text>
          <View className='flex-row items-center gap-2'>
            <Text className='text-text-secondary text-sm font-quicksand-bold font-bold'>Find your Favorite Food</Text>
          </View>
        </View>
    
        {/* right */}
        <View className='bg-[#fafafa]'>
          <TouchableOpacity 
            activeOpacity={0.8} 
            className='relative p-2 justify-center items-center rounded-full bg-text-secondary'
            onPress={onCartPress}
            accessibilityRole="button"
            accessibilityLabel="Shopping cart"
            accessibilityHint="Opens shopping cart"
          >
            <CustomIcon iconLibraryType='MaterialCommunityIcons' iconName='shopping-outline' size={24} color='#fff'/>
            {cartItemCount > 0 && (
              <View className='absolute -top-1 -right-1 w-5 h-5 bg-primary justify-center items-center rounded-full'>
                <Text className='text-white text-sm font-quicksand-bold font-bold'>{cartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <SearchInput value={searchValue} onChangeText={onSearchChange} />
    </View>
  )
})

SearchHeader.displayName = 'SearchHeader'

const SearchFilterHeader = memo<{ selectedFilter: FilterType; onFilterChange: (filter: FilterType) => void }>(
  ({ selectedFilter, onFilterChange }) => {
    const renderFilterItem = useCallback(({ item, index }: { item: FilterType; index: number }) => (
      <FilterItem 
        item={item} 
        index={index} 
        selectedFilter={selectedFilter} 
        onPress={onFilterChange}
      />
    ), [selectedFilter, onFilterChange])

    const keyExtractor = useCallback((item: FilterType, index: number) => `${item}-${index}`, [])

    const ItemSeparator = useCallback(() => <View style={{ width: HORIZONTAL_SEPARATOR_WIDTH }} />, [])

    return (
      <FlatList
      className='mb-3'
        data={FILTERS}
        renderItem={renderFilterItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        scrollEventThrottle={16}
        decelerationRate="fast"
        ItemSeparatorComponent={ItemSeparator}
      />
    )
  }
)

SearchFilterHeader.displayName = 'SearchFilterHeader'

const Search = () => {
  const {
    selectedFilter,
    searchQuery,
    filteredItems,
    handleFilterChange,
    handleSearchChange,
    hasActiveFilters
  } = useSearch()
  
  const [cartItemCount, setCartItemCount] = useState(1) // This would come from your cart state management

  const handleCartPress = useCallback(() => {
    router.push('/cart')
  }, [])

  const handleAddToCart = useCallback((item: any) => {
    // This would integrate with your cart context
    console.log('Adding to cart:', item)
    // addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })
  }, [])

  const renderSearchItem = useCallback(({ item, index }: { item: SearchItem; index: number }) => (
    <SearchItem 
      {...item} 
      description={item.description || ''} 
      category={item.category || ''}
      onAddToCart={() => handleAddToCart(item)}
    />
  ), [handleAddToCart])

  const keyExtractor = useCallback((item: any, index: number) => `${item.id}-${index}`, [])

  const ItemSeparator = useCallback(() => <View style={{ height: ITEM_SEPARATOR_HEIGHT }} />, [])

  const ListHeaderComponent = useCallback(() => (
    <SearchFilterHeader selectedFilter={selectedFilter} onFilterChange={handleFilterChange} />
  ), [selectedFilter, handleFilterChange])

  const ListEmptyComponent = useCallback(() => <EmptyState />, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>     
      <StatusBar barStyle="dark-content" backgroundColor='#fafafa' />
              <Stack.Screen 
          options={{
            headerShown: true,
            header: () => <SearchHeader 
              cartItemCount={cartItemCount} 
              onCartPress={handleCartPress}
              searchValue={searchQuery}
              onSearchChange={handleSearchChange}
            />
          }}
        />
  
      <FlatList 
        className='bg-[#fafafa] gap-4'
        data={filteredItems}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderSearchItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        scrollEventThrottle={1000/16}
        decelerationRate="fast"
        ItemSeparatorComponent={ItemSeparator}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={6}
        getItemLayout={(data, index) => ({
          length: SEARCH_ITEM_HEIGHT + ITEM_SEPARATOR_HEIGHT,
          offset: (SEARCH_ITEM_HEIGHT + ITEM_SEPARATOR_HEIGHT) * index,
          index,
        })}
      />
    </SafeAreaView>
  )
}

export default Search
