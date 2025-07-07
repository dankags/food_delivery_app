import { View, Text, TouchableOpacity, Image, Dimensions, Pressable, StyleSheet, Platform } from 'react-native'
import React, { memo } from 'react'
import CustomIcon from './CustomIcon'

const {width}=Dimensions.get('screen')

const ITEM_WIDTH=width*0.24
const ITEM_HEIGHT=ITEM_WIDTH*1.2
const IMAGE_HEIGHT=ITEM_WIDTH*0.7

interface AdditionItemProps {
  item: AdditionalTopping
  onPress?: () => void
  isSelected?: boolean
}

const AdditionItem: React.FC<AdditionItemProps> = memo(({ item, onPress, isSelected = false }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[{width:ITEM_WIDTH,height:ITEM_HEIGHT},styles.shadow]}
      className={`rounded-2xl bg-transparent border ${isSelected ? 'border-orange-500 ' : 'border-transparent '}`}
    >
      <View className="flex-1 items-center rounded-t-2xl ">
       <View className='w-full flex-1 bg-white rounded-t-2xl items-center justify-center'>
            <Image 
              source={item.image} 
              style={{width:ITEM_WIDTH,height:IMAGE_HEIGHT}}
              className=""
              resizeMode="cover"
            />
       </View>
        <View className='w-full px-3 py-2 flex-row items-center justify-between rounded-b-2xl bg-[#3C2F2F]'>
            <Text className="font-quicksand-medium  text-white text-center truncate">{item.name}</Text>
            <View className='bg-[#EF2A39] rounded-full p-1'><CustomIcon iconLibraryType='Ionicons' iconName='add' size={16} color="#FFFFFF" /></View>
        </View>
      </View>
    </Pressable>
  )
})

AdditionItem.displayName = 'AdditionItem'

const styles = StyleSheet.create({
    shadow:{
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
            },
            android: {
              elevation: 3,
            },
          }),},
});

export default AdditionItem
