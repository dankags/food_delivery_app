import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, Text, View,Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants/images';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const { height: screenHeight } = Dimensions.get('screen');

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  activeTab: 'signin' | 'signup';
  setActiveTab: (tab: 'signin' | 'signup') => void;
}

const Tabs=({activeTab,setActiveTab}:{activeTab:'signin' | 'signup',setActiveTab:(tab:'signin' | 'signup')=>void})=>{
  

  const handleTabSwitch = (tab: 'signin' | 'signup') => {
    setActiveTab(tab);
  };

  return (
    <View className=''>
      {/* Tab Switch */}
      <View className='flex-row bg-tab-primary rounded-xl p-1 mb-6 shadow-sm'>
        <TouchableOpacity
          className={`flex-1 py-3 px-4 rounded-lg ${
            activeTab === 'signin' ? 'bg-white' : 'bg-transparent'
          }`}
          onPress={() => handleTabSwitch('signin')}
        >
          <Text
            className={`text-center font-quicksand-medium text-base ${
              activeTab === 'signin' ? 'text-text-primary' : 'text-gray-500'
            }`}
          >
            Login
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className={`flex-1 py-3 px-4 rounded-lg ${
            activeTab === 'signup' ? 'bg-white' : 'bg-transparent'
          }`}
          onPress={() => handleTabSwitch('signup')}
        >
          <Text
            className={`text-center font-quicksand-medium text-base ${
              activeTab === 'signup' ? 'text-text-primary' : 'text-gray-500'
            }`}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      
   
    </View>
  );
}

export default function AuthLayout({ children, title, subtitle,setActiveTab,activeTab }: AuthLayoutProps) {
 
  return (
    <View className='flex-1 relative'>
      <StatusBar style='light'/>
      {/* Top Image Section - Takes 1/4 of screen */}
      <View 
        className="relative"
        style={{ height: screenHeight * 0.32 }}
      >
        <Image
          source={images.burgerTwo}
          className="w-full h-full bg-neutral-800"
          resizeMode='contain'
        />
        <View className="absolute inset-0 bg-black/30 justify-center items-start ">
          <Image source={images.logo} className='size-32 ' resizeMode='contain'/>
          <View className=' items-start gap-2 px-5'>
            <Text className='text-4xl font-quicksand-bold font-bold text-white text-center mb-2'>
            Get Started now
            </Text>
            <Text className='font-quicksand-medium text-base text-white text-center opacity-90'>
            Create an account or log in to explore   
            </Text>
        </View>
        </View>
      </View>
      <View className='absolute top-0 right-0 left-0 bottom-0 flex-1 '>
    <SafeAreaView style={{flex:1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className=" flex-1 "
      >
     

      {/* Bottom Sheet - Takes 3/4 of screen */}
   
   <View className='absolute bottom-0 w-full h-3/4 p-5 bg-neutral-50 rounded-t-3xl'>
        {/* <View className='mb-5'>
        <Text className='text-3xl font-quicksand-bold font-bold mb-2 text-text-secondary'>{title}</Text>
        {subtitle && <Text className='text-base text-gray-400 leading-6'>{subtitle}</Text>}
        
        </View> */}
     <Tabs activeTab={activeTab} setActiveTab={setActiveTab}/>
    {children}
   </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
    </View>
    </View>
  );
} 