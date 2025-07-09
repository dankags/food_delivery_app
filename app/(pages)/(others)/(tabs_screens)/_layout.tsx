import { router, Tabs, usePathname } from 'expo-router'
import { images } from '@/constants/images'
import { Image } from 'expo-image'
import { Pressable, Text, View } from 'react-native'
import CustomIcon from '@/components/CustomIcon'
import { useCallback } from 'react'

type TabProps={
  name:string,
  href:string|undefined,
  children:React.ReactNode,
  notification?:number
}

const Tab=({name,href,children,notification}:TabProps)=>{
  const pathName=usePathname()
  const isFocused=pathName===href
  const color = isFocused ? '#FE8C00' : '#878787'
  const navigate = useCallback(() => {
    if (href) {
      router.push(href as any)
    }
  }, [href])
  return(
    <Pressable className='justify-center items-center relative pb-safe' style={{flex:1}} onPress={navigate}>
      {children}
      {notification && (
        <View className={`absolute -top-1 left-1/2 translate-x-1/2 ${notification>99?"px-1 py1":"w-5 h-5"} bg-primary justify-center items-center rounded-full`}>
          <Text className='text-white text-sm font-quicksand-bold font-bold '>{notification>99?"99+":notification}</Text>
        </View>
      )}
      <Text className='font-quicksand-semibold font-semibold text-sm' style={{fontSize:12,color}}>{name}</Text>
      </Pressable>
  )
}

export default function TabLayout() {
  const pathName=usePathname()
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton:({href})=>(
            <Tab name="Home" href={href}>
              <CustomIcon iconLibraryType="MaterialCommunityIcons" iconName="home" size={24} color={pathName==="/"?"#FE8C00":"#878787"} />
            </Tab>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarButton:({href})=>(
            <Tab name="Search" href={href}>
              <CustomIcon iconLibraryType="Ionicons" iconName="search" size={24} color={pathName==="/search"?"#FE8C00":"#878787"} />
            </Tab>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarButton:({href})=>(
            <Tab name="Cart" href={href} notification={2}>
              <CustomIcon iconLibraryType='MaterialCommunityIcons' iconName='shopping-outline' size={24} color={pathName==="/cart"?"#FE8C00":"#878787"} />
            </Tab>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',        
          tabBarButton:({href})=>(
            <Tab name="Profile" href={href}>
              <CustomIcon iconLibraryType="AntDesign" iconName="user" size={24} color={pathName==="/profile"?"#FE8C00":"#878787"} />
            </Tab>
          ),
        }}
      />
    </Tabs>
  )
}
