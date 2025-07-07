import { View, Text, StatusBar, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomIcon from '@/components/CustomIcon'
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { dummyFoodDetailItems } from '@/constants/data'
import { ScrollView } from 'react-native-gesture-handler'
import AdditionItem from '@/components/AdditionItem'
import Review from '@/components/Review'
import { images } from '@/constants/images'


const DetailsHeader=memo(({props}:{props:NativeStackHeaderProps})=>{
  return(
    <View className='bg-[#fafafa] px-4 py-3 gap-5 flex-row items-center justify-between'>
        {/* left */}
        <View className=''>
          {props.navigation.canGoBack() && <TouchableOpacity className='rounded-full py-2 px-3 ' onPress={() => props.navigation.goBack()}>
            <CustomIcon iconLibraryType='Ionicons' iconName='arrow-back' size={24} color='#000' />
          </TouchableOpacity>}
        </View>
        
        {/* right */}
        <TouchableOpacity onPress={() => router.push('/search')}>
          <CustomIcon iconLibraryType='Ionicons' iconName='search' size={24} color='#000' />
        </TouchableOpacity>
      </View>
  )
})

DetailsHeader.displayName="DetailHeader"

const AdditionalFoodList=memo(({data,title}:{data:AdditionalTopping[],title:string})=>{
  return(
    <View className=' gap-4'>
            <Text className='font-quicksand-bold font-bold text-2xl text-text-secondary'>{title}</Text>
            <FlatList
              data={data}
              className='bg-[#fafafa] py-3 px-2'
              renderItem={({item})=>{
                return <AdditionItem item={item} />
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item)=>item.id.toString()}
              contentContainerStyle={{gap:10}}
              ItemSeparatorComponent={()=>{
                return <View className='w-2 h-full bg-transparent'/>
              }}
              />
          </View>
  )
})

AdditionalFoodList.displayName="AdditionalFoodList"

const RatingStars = memo(({ rating, max = 5, size = 20 }: { rating: number, max?: number, size?: number }) => {
  // Only full and half stars, no partials
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating - fullStars >= 0.5
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <View className="flex-row items-center">
      {[...Array(fullStars)].map((_, i) => (
        <View key={`star-full-${i}`} className='mr-0.5'>
          <CustomIcon
            key={`star-full-${i}`}
            iconLibraryType="Ionicons"
            iconName="star"
            size={size}
            color="#FE8C00"
          />
        </View>
      ))}
      {hasHalfStar && (
       <View key="star-half" className='mr-0.5'>
          <CustomIcon
            key="star-half"
            iconLibraryType="Ionicons"
            iconName="star-half"
            size={size}
            color="#FE8C00"
          />
       </View>
      )}
      {[...Array(emptyStars)].map((_, i) => (
       <View key={`star-outline-${i}`} className='mr-0.5'>
          <CustomIcon
            key={`star-outline-${i}`}
            iconLibraryType="Ionicons"
            iconName="star-outline"
            size={size}
            color="#FE8C00"
          />
       </View>
      ))}
    </View>
  )
})
RatingStars.displayName = "RatingStars"


const Detail = () => {
  const {id}=useLocalSearchParams()
  const [foodDetail,setFoodDetail]=useState<FoodDetailItem|null>(null)

  useEffect(()=>{
    const foodDetail=dummyFoodDetailItems
    if(foodDetail){
      setFoodDetail(foodDetail)
    }
  },[id])

  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#fafafa",gap:4}}>
      <StatusBar barStyle="dark-content" backgroundColor='#fafafa' />
      <Stack.Screen 
          options={{
            headerShown: true,
            header: (props:NativeStackHeaderProps) => <DetailsHeader props={props}
            />
          }}
        />

        {/* main content */}
      <ScrollView className='flex-1 p-4' scrollEventThrottle={1000/16} decelerationRate='fast' >
        {/* top part */}
        <View className='w-full flex-row items-center justify-between gap-2 mb-5'>

          {/* left */}
           <View className="w-1/2">
             <View className='w-full gap-4'>
              {/* name & category */}
              <View className="w-full rounded-2xl">
                <Text className='font-quicksand-bold font-bold text-4xl text-text-secondary'>{foodDetail?.name}</Text>
                <Text className='font-quicksand-regular font-medium text-xl text-gray-500'>{foodDetail?.category}</Text>
              </View>

              {/* rating */}
              <View className='flex-row items-center gap-2 my-2'>
                <View className="flex-row items-center gap-2">
                  {typeof foodDetail?.rating === "number" && (
                    <RatingStars rating={foodDetail.rating} />
                  )}
                </View>
                <Text className='font-quicksand-semibold font-semibold text-xl text-gray-500'>
                  {typeof foodDetail?.rating === "number" ? `${foodDetail.rating}/5` : "N/A"}
                </Text>
              </View>

              {/* Price */}
              <View className='flex-row items-center gap-2 mb-4'>
              <CustomIcon iconLibraryType='Foundation' iconName='dollar' size={32} color='#FE8C00' />
                <Text className='font-quicksand-bold font-bold text-3xl text-text-secondary'>{foodDetail?.price}</Text>
              </View>

              {/* Nutritional information */}
              <View className='w-full'>
               <FlatList
                className=""
                data={foodDetail?.nutrition}
                renderItem={({item})=>{
                  return <View className='items-start gap-2 '>
                    <Text className='font-quicksand-bold font-bold text-2xl text-text-secondary'>{item.name}</Text>
                    <Text className='font-quicksand-medium font-semibold text-xl text-gray-500'>{item.value} {item.unit}</Text>
                  </View>
                }}
                keyExtractor={(item)=>item.id.toString()}
                contentContainerStyle={{gap:10}}
                ItemSeparatorComponent={()=>{
                  return <View className='w-full h-5 bg-transparent'/>
                }}
                numColumns={2}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{gap:20,width:"100%"}}
                />
              </View>

              {/* food type */}
              {foodDetail?.foodType && foodDetail?.foodType.length > 0 && <View className='w-full'>
                <FlatList
                  data={foodDetail?.foodType}
                  renderItem={({item})=>{
                    return  <View className='items-start gap-2 '>
                    <Text className='font-quicksand-bold font-bold text-2xl text-text-secondary'>{item.name}</Text>
                    <Text className='font-quicksand-medium font-semibold text-xl text-gray-500 truncate'>{item.description}</Text>
                  </View>
                  }}
                  ItemSeparatorComponent={()=>{
                    return <View className='w-full h-5 bg-transparent'/>
                  }}
                  keyExtractor={(item)=>item.id.toString()}
                  numColumns={2}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                  columnWrapperStyle={{gap:20,width:"100%"}}
                />
              </View>}

              </View>
             </View>

             {/* right */}
             <View className='w-1/2 justify-start'>
              <Image source={images.burgerThree} className='w-full' resizeMode='contain' />
             </View>
           
        </View>
        
        {/* description & discount */}
        <View className='mb-5 gap-4'>
          <View className='bg-primary/10 rounded-full py-4 px-6 flex-row items-center justify-between'>
            <View className='flex-row items-center gap-2'>
              <CustomIcon iconLibraryType='Foundation' iconName='dollar' size={24} color='#FE8C00' />
              <Text className='font-quicksand-semibold font-semibold text-lg text-text-secondary'>Free Delivery</Text>
            </View>
            <View className='flex-row items-center gap-2'>
              <CustomIcon iconLibraryType='MaterialCommunityIcons' iconName='clock-time-nine' size={24} color='#FE8C00' />
              <Text className='font-quicksand-semibold font-semibold text-lg text-text-secondary'>20-30 min</Text>
            </View>
            <View className='flex-row items-center gap-2'>
              <CustomIcon iconLibraryType='AntDesign' iconName='star' size={24} color='#FE8C00' />
              <Text className='font-quicksand-semibold font-semibold text-lg text-text-secondary'>{foodDetail?.rating}</Text>
            </View>
          </View>
          <Text className='font-quicksand-regular font-medium text-lg'>{foodDetail?.description}</Text>
        </View>

       {/* additional food list */}
        <View className='mb-5 gap-4'>
          {/* addittional toppings */}
          {foodDetail?.addittionalToppings && <AdditionalFoodList data={foodDetail?.addittionalToppings} title="Addittional Toppings" />}

          {/* side dishes */}
          {foodDetail?.sideDishes && <AdditionalFoodList data={foodDetail?.sideDishes} title="Side Dishes" />}

          {/* drink */}
          {foodDetail?.drink && <AdditionalFoodList data={foodDetail?.drink} title="Drink" />}
        </View>

        {/* reviews */}
        <View className='gap-4 bg-[#fafafa] mb-5'>
          {foodDetail?.reviews && 
            <View className=' gap-4'>
            <Text className='font-quicksand-bold font-bold text-2xl text-text-secondary'>Reviews</Text>
            <FlatList
              data={foodDetail?.reviews}
              renderItem={({item})=>{
                return <Review {...item} />
              }}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item)=>item.id.toString()}
              contentContainerStyle={{gap:10}}
              ItemSeparatorComponent={()=>{
                return <View className='h-2 w-full bg-transparent'/>
              }}
              />
          </View>
          }
        </View>

      </ScrollView>

      {/* bottom part */}
      <View className='bg-white px-4 py-5 flex-row items-center justify-between border-t border-gray-200'>
        <View className='flex-row items-center justify-between gap-4'>
          <TouchableOpacity className=''>
            <View className='h-12 w-12 rounded-full bg-primary/10 items-center justify-center'><CustomIcon iconLibraryType='Entypo' iconName='minus' size={24} color='#fa8c00' /></View>
          </TouchableOpacity>
          <Text className='font-quicksand-semibold font-semibold text-2xl text-text-secondary'>1</Text>
          <TouchableOpacity className='h-12 w-12 rounded-full bg-primary/10 items-center justify-center'>
            <CustomIcon iconLibraryType='Entypo' iconName='plus' size={24} color='#fa8c00' />
          </TouchableOpacity>
        </View>

        {/* add to cart */}
        <TouchableOpacity className='bg-primary rounded-full py-4 px-6 flex-row items-center justify-between gap-4'>
          <CustomIcon iconLibraryType='MaterialCommunityIcons' iconName='shopping-outline' size={24} color='#ffffff' />
          <Text className='font-quicksand-semibold font-semibold text-lg text-white'>Add to Cart (${foodDetail?.price})</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default Detail