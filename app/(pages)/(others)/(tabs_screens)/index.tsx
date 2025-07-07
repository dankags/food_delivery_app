import { Link, Stack } from 'expo-router'
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackHeaderLeftProps, NativeStackHeaderRightProps } from '@react-navigation/native-stack'
import { images } from '@/constants/images'
import CustomIcon from '@/components/CustomIcon'
import { categories } from '@/constants/data'

const {width} = Dimensions.get("screen")

const HomeHeader=()=>{
  return (
    <View className='bg-[#fafafa]  flex-row items-center justify-between p-4'>
      {/* left */}
      <View className='bg-[#fafafa] '>
      <Text className='text-text-primary text-sm font-quicksand-bold font-bold'>DELIVER TO</Text>
      <View className='flex-row items-center gap-2'>
        <Text className='text-text-secondary text-sm font-quicksand-bold font-bold'>123 Main St, Anytown, USA</Text>
      </View>
    </View>

      {/* right */}
         <View className='bg-[#fafafa]'>
      <TouchableOpacity activeOpacity={0.8} className='relative p-2 justify-center items-center rounded-full bg-text-secondary'>
        <CustomIcon iconLibraryType='MaterialCommunityIcons' iconName='shopping-outline' size={24} color='#fff'/>
        <View className='absolute -top-1 -right-1 w-5 h-5 bg-primary justify-center items-center rounded-full'>
          <Text className='text-white text-sm font-quicksand-bold font-bold '>1</Text>
        </View>
      </TouchableOpacity>
    </View>
    </View>
  )
}

const FirstCategoryCard=({name,color,image,price,imgeSide}:Category)=>{
  return (
    <View
      className="relative rounded-2xl p-4"
      style={{ backgroundColor: color, height: width*0.42 }}
    >
      <View
        className={` items-center justify-center absolute  ${imgeSide === "left" ? "left-0" : "right-0"}`}
        style={{ width: width*0.5, height: width*0.5,top:-width*0.04 }}
      >
        {" "}
        <Image source={image} className=" w-full h-full" resizeMode="contain" />
      </View>

      {price
      ?
      <View className={`  justify-between flex-1 ${imgeSide === "right" ? "items-start" : "items-end"}`}>
        <Text className='text-white text-5xl font-rubik-black font-extrabold'>{name}</Text>
        <Text className='text-white text-4xl font-rubik-black font-extrabold'>$ {price}</Text>
      </View>
      :
      <View className={`flex-1 gap-4 justify-center ${imgeSide === "right" ? "items-start" : "items-end"}`}>
        <Text className='text-white text-5xl font-rubik-black font-extrabold'>{name}</Text>
        <View className='px-3 py-1 border-2 border-white rounded-full'>
          <CustomIcon iconLibraryType='FontAwesome6' iconName='arrow-right-long' size={16} color='#fff'/>
        </View>
      </View>
      }
    </View>
  );
}


const Home = () => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#fafafa"}}>     
      <StatusBar barStyle={"dark-content"} backgroundColor='#fafafa' />
      <Stack.Screen options={{
        headerShown: true,
        header:()=>{
          return <HomeHeader/>
        }
      }}/>

     <FlatList
      className=""
      data={categories}
      renderItem={({item,index})=>{
       return <FirstCategoryCard {...item}/>
      }}
      ItemSeparatorComponent={
        () => <View className='h-4' />
      }
      keyExtractor={(item,index)=>index.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal:10}}
      scrollEventThrottle={1000/16}
      decelerationRate={"fast"}
      />

    </SafeAreaView>
  )
}

export default Home
