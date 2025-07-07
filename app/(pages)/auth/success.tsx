import { images } from '@/constants/images';
import { useUser } from '@/contexts/userContext';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { Text, TouchableOpacity, View,Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const {height,width}=Dimensions.get("screen")

export default function Success() {
  const {refetch} = useUser()
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleContinue = async() => {
    // Navigate to main app
    try{
      await refetch()
      router.replace('/(pages)/(others)/(tabs_screens)');
    }catch(error){
      console.log(error)
    }
  };

  return (
    <View className="flex-1 bg-neutral-950 justify-start">
      <StatusBar style='light' />
      <View className='' style={{height:height*0.5,width}}>
        <Image source={images.burgerTwo} className='w-full h-full ' resizeMode='contain'/>
      </View>

      <View className='absolute inset-0'>
        <SafeAreaView className='flex-1'>
        <BottomSheet
         ref={bottomSheetRef}
         index={0}
         snapPoints={['50%']}
         enablePanDownToClose={false}
         enableDynamicSizing={false}
         enableContentPanningGesture={false}
         enableHandlePanningGesture={false}
        >
          <BottomSheetView className='flex-1 px-5 justify-end pt-12'>
          <View className='flex-1 justify-center '>
             <View className='w-full items-center gap-8 mb-20'>
               <Image source={images.illustrationSuccess} resizeMode='contain' className='w-full aspect-video'/>
               <View className='gap-3 items-center'>
                 <Text className='text-3xl font-quicksand-bold text-text-secondary'>Login Successful</Text>
                 <Text className='text-lg font-quicksand-regular text-text-secondary'>You’re all set to continue where you left off.</Text>
               </View>
               </View>
            <TouchableOpacity
            className={`rounded-full py-4 items-center  ${
              'bg-primary'
            }`}
            onPress={handleContinue}
          >
            <Text className="text-white text-base font-semibold">
              Continue to App
            </Text>
          </TouchableOpacity>
          </View>
          </BottomSheetView>
        </BottomSheet>
        </SafeAreaView></View>
    </View>
  );
}
