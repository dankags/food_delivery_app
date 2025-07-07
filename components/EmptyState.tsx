import { View, Text, Image } from 'react-native'
import { images } from '@/constants/images'
import { memo } from 'react'

interface EmptyStateProps {
  title?: string
  description?: string
  image?: any
}

const EmptyState = memo(({ 
  title = "Nothing matched your search", 
  description = "Try a different search term or check for typos.",
  image = images.emptyState 
}: EmptyStateProps) => {
    return (
        <View className='flex-1 justify-center '>
             <View className='w-full items-center gap-8 mb-20'>
               <Image source={images.emptyState} resizeMode='contain' className='w-full aspect-video'/>
               <View className='gap-3 items-center'>
                 <Text className='text-3xl font-quicksand-bold text-text-secondary'>Nothing matched your search</Text>
                 <Text className='text-lg font-quicksand-regular text-text-secondary'>Try a different search term or check for typos.</Text>
               </View>
               </View>
          </View>
    )
})

EmptyState.displayName = 'EmptyState'

export default EmptyState
