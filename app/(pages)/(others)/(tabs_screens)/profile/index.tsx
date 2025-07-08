import { router, Stack } from 'expo-router'
import { View, Text, StatusBar, TouchableOpacity, Image, Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import CustomIcon from '@/components/CustomIcon'
import { images } from '@/constants/images'
import { ScrollView } from 'react-native-gesture-handler'
import { fetchAPI } from '@/lib/fetch'
import { useUser } from '@/contexts/userContext'

const ProfileHeader = ({props}:{props:NativeStackHeaderProps}) => {
    return(
        <View className='bg-[#fafafa] p-4 gap-5 flex-row items-center justify-between'>
        {/* left */}
        <View className=''>
          {props.navigation.canGoBack() && <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <CustomIcon iconLibraryType='Ionicons' iconName='arrow-back' size={24} color='#000' />
          </TouchableOpacity>}
        </View>
        {/* center */}
        <View className=''>
            <Text className='text-2xl font-quicksand-bold font-bold'>Profile</Text>
        </View>
        {/* right */}
        <TouchableOpacity onPress={() => router.push('/search')}>
          <CustomIcon iconLibraryType='Ionicons' iconName='search' size={24} color='#000' />
        </TouchableOpacity>
      </View>
    )
}

const Profile = () => {
  const {refetch} = useUser()
  const logout = async () => {
    try{
      const response = await fetchAPI('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    if(response.success){
      await refetch()
      router.replace('/(pages)/auth/(userAuth)')
    }
  }catch(error){
      console.log(error)
    }
  };

    return(
        <SafeAreaView style={{flex:1,backgroundColor:"#fafafa",gap:10}}>
            <StatusBar barStyle="dark-content" backgroundColor='#fafafa' />
            <Stack.Screen options={{
                headerShown: true,
                header: (props) => <ProfileHeader props={props} />
            }}/>
           <View className='w-full items-center justify-center mt-5 mb-4'>
            <View className='relative' style={[styles.avatarShadow]}>
              <Image className="w-48 h-48 rounded-full" source={images.avatar} resizeMode='cover'/>
              <Pressable className='absolute bottom-0 right-0 bg-primary rounded-full p-2' style={{borderWidth:1,borderColor:"#fff"}}>
                <CustomIcon iconLibraryType='Ionicons' iconName='pencil-outline' size={24} color='#fff' />
              </Pressable>
            </View>
           </View>

          <ScrollView className='flex-1 bg-white p-4 mx-4 rounded-xl'>
            {/* full name */}
            <View className='flex-row items-center gap-3 mb-4'>
              <View className='p-3 bg-primary/10 rounded-full'>
                <CustomIcon iconLibraryType='Ionicons' iconName='person-outline' size={32} color='#FE8C00' />
              </View>
              <View className=' items-start gap-2 p-3'>
                <Text className='text-gray-400'>Full Name</Text>
                <Text className='text-xl font-quicksand-bold font-bold'>John Doe</Text> 
              </View>
            </View>
            {/* email */}
            <View className='flex-row items-center gap-3 mb-4'>
              <View className='p-3 bg-primary/10 rounded-full'>
                <CustomIcon iconLibraryType='Ionicons' iconName='mail-outline' size={32} color='#FE8C00' />
              </View>
              <View className=' items-start gap-2 p-3'>
                <Text className='text-gray-400'>Email</Text>
                <Text className='text-xl font-quicksand-bold font-bold'>john.doe@example.com</Text> 
              </View>
            </View>
            {/* phone number */}
            <View className='flex-row items-center gap-3 mb-4'>
              <View className='p-3 bg-primary/10 rounded-full'>
                <CustomIcon iconLibraryType='Ionicons' iconName='call-outline' size={32} color='#FE8C00' />
              </View>
              <View className=' items-start gap-2 p-3'>
                <Text className='text-gray-400'>Phone Number</Text>
                <Text className='text-xl font-quicksand-bold font-bold'>+123 456 7890</Text> 
              </View>
            </View>
            {/* address_1 */}
            <View className='flex-row items-center gap-3 mb-4'>
              <View className='p-3 bg-primary/10 rounded-full'>
                <CustomIcon iconLibraryType='Ionicons' iconName='location-outline' size={32} color='#FE8C00' />
              </View>
              <View className=' items-start gap-2 p-3'>
                <Text className='text-gray-400'>Address 1</Text>
                <Text className='text-xl font-quicksand-bold font-bold'>123 Main St, Anytown, USA</Text> 
              </View>
            </View>
            {/* address_2 */}
            <View className='flex-row items-center gap-3'>
              <View className='p-3 bg-primary/10 rounded-full'>
                <CustomIcon iconLibraryType='Ionicons' iconName='location-outline' size={32} color='#FE8C00' />
              </View>
              <View className=' items-start gap-2 p-3'>
                <Text className='text-gray-400'>Address 2</Text>
                <Text className='text-xl font-quicksand-bold font-bold'>123 Main St, Anytown, USA</Text> 
              </View>
            </View>
          </ScrollView>
          <View className='w-full bg-white p-4 gap-4'>
            <TouchableOpacity className='flex-row items-center justify-center gap-2 border-2 border-primary bg-primary/5 rounded-full p-3'>
              <Text className='text-text-primary text-lg font-quicksand-bold font-bold'>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => logout()} className='flex-row items-center justify-center gap-2 border-2 border-[#F14141] bg-[#F141410D] rounded-full p-3'>
              <CustomIcon iconLibraryType='Ionicons' iconName='log-out-outline' size={26} color='#F14141' />
              <Text className='text-[#F14141] text-lg font-quicksand-bold font-bold'>Logout</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  avatarShadow: {
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
});

export default Profile