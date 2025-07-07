import { cn, formatDateTime } from '@/lib/util'
import React from 'react'
import { Image, Text, View } from 'react-native'

const Review: React.FC<Review> = ({ id,name,rating,comment,date,image }) => {
  return (
    <View className="flex-row items-start gap-3 p-3 bg-white rounded-xl shadow-sm">
      <Image
        source={image}
        className="w-12 h-12 rounded-full"
        resizeMode="cover"
      />
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-quicksand-semibold text-base text-black">{name}</Text>
          <Text className="text-xs text-gray-400">{formatDateTime(date).dateOnly}</Text>
        </View>
        <View className="flex-row items-center  mb-1">
          {/* Render stars based on review rating */}
          {Array.from({ length: 5 }).map((_, idx) => {
            const isFullStar = idx < Math.floor(rating);
            const isHalfStar = idx === Math.floor(rating) && rating % 1 !== 0;
            const isEmptyStar = idx >= Math.ceil(rating);
            
            return (
              <Text
                key={idx}
                className={cn(
                  '',
                  isFullStar ? 'text-yellow-400' : 
                  isHalfStar ? 'text-yellow-400' : 'text-gray-300'
                )}
              >
                {isHalfStar ? '☆' : '★'}
              </Text>
            );
          })}
        </View>
        <Text className="text-sm font-quicksand-light font-medium text-text-secondary">{comment}</Text>
      </View>
    </View>
  )
}

export default Review
