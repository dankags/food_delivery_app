import AuthLayout from '@/components/AuthLayout';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';



const SignInForm=()=>{
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement actual sign-in logic
      console.log('Signing in with:', { email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to success page or main app
      router.push('/auth/success');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    // set active tab to signup
    
  };

  return (
      <ScrollView className='flex-1 '

      >
        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-500 mb-2">
            Email
          </Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3.5 text-base bg-gray-50"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-500 mb-2">
            Password
          </Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3.5 text-base bg-gray-50"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity className="self-end mb-6">
          <Text className="text-primary text-sm font-medium">
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`rounded-xl py-4 items-center mb-6 ${
            isLoading ? 'bg-gray-400' : 'bg-primary'
          }`}
          onPress={handleSignIn}
          disabled={isLoading}
        >
          <Text className="text-white text-base font-semibold">
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-4 text-gray-500 text-sm">or</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        <TouchableOpacity className="items-center" onPress={handleSignUp}>
          <Text className="text-gray-500 text-sm">
            Don&apos;t have an account? <Text className="text-primary font-semibold">Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
   
  );
}

const SignUpForm=({setActiveTab}:{setActiveTab:(tab:'signin' | 'signup')=>void})=>{
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSignUp = async () => {
      if (!fullName || !email || !password || !confirmPassword || !phone) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
  
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
  
      if (password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters long');
        return;
      }
  
      setIsLoading(true);
      try {
        // TODO: Implement actual sign-up logic
        console.log('Signing up with:', { fullName, email, password, phone });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Navigate to success page or main app
        router.push('/auth/success');
      } catch (error) {
        Alert.alert('Error', 'Failed to sign up. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleSignIn = () => {
      router.push('/auth/sign-in');
    };
  
    return (
    
    
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="mb-5">
              <Text className="text-base font-semibold text-gray-700 mb-2">
                Full Name
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3.5 text-base bg-gray-50"
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
  
            <View className="mb-5">
              <Text className="text-base font-semibold text-gray-700 mb-2">
                Email
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3.5 text-base bg-gray-50"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
  
  
            <View className="mb-5">
              <Text className="text-base font-semibold text-gray-700 mb-2">
                Password
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3.5 text-base bg-gray-50"
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
  
           
  
            <TouchableOpacity
              className={`rounded-xl py-4 items-center mb-6 ${
                isLoading ? 'bg-gray-400' : 'bg-primary'
              }`}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              <Text className="text-white text-base font-semibold">
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>
  
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="mx-4 text-gray-500 text-sm">or</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>
  
            <TouchableOpacity className="items-center mb-6" onPress={handleSignIn}>
              <Text className="text-gray-500 text-sm">
                Already have an account? <Text className="text-text-primary font-semibold">Sign In</Text>
              </Text>
            </TouchableOpacity>
  
            <View className="items-center px-5">
              <Text className="text-gray-500 text-xs text-center leading-4">
                By signing up, you agree to our{' '}
                <Text className="text-text-primary font-medium">Terms of Service</Text> and{' '}
                <Text className="text-text-primary font-medium">Privacy Policy</Text>
              </Text>
            </View>
          </ScrollView>
       
    );
}

export default function AuthIndex() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  return (
    <AuthLayout
    title="Create Account"
    subtitle="Sign up to get started with food delivery"
    activeTab={activeTab}
    setActiveTab={setActiveTab}
  >
    {activeTab === 'signin' ? <SignInForm/> : <SignUpForm setActiveTab={setActiveTab}/>}
  </AuthLayout>
  );
}
