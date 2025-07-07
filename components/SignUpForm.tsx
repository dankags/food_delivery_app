import { signUpUser } from "@/lib/user.action";
import { router } from "expo-router";
import { memo, useState, useTransition } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

type SignUpFormInput={
    fullName:string,
    email:string,
    password:string,
    confirmPassword:string,
    phone:string,
  }

const SignUpForm=memo(({setActiveTab}:{setActiveTab:(tab:'signin' | 'signup')=>void})=>{
    const [form,setForm] = useState<SignUpFormInput>({
      fullName:'',
      email:'',
      password:'',
      confirmPassword:'',
      phone:'',
    })
    const [isPending,startTransition] = useTransition()
  
    const handleSignUp = async () => {
      if (!form.fullName || !form.email || !form.password || !form.confirmPassword || !form.phone) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
  
      if (form.password !== form.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
  
      if (form.password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters long');
        return;
      }
  
      startTransition(async()=>{
        try {
          const {confirmPassword,...userData}=form
          const {session,user,error} = await signUpUser(userData)
          if(user && session){
            router.push('/auth/success')
          }else{
            Alert.alert('Error', error || 'Failed to sign up. Please try again.');
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to sign up. Please try again.');
        }
      })
      try {
        // TODO: Implement actual sign-up logic
        console.log('Signing up with:', { form });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Navigate to success page or main app
        router.push('/auth/success');
      } catch (error) {
        Alert.alert('Error', 'Failed to sign up. Please try again.');
      } finally {
      }
    };
  
    const handleSignIn = () => {
      setActiveTab('signin');
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
                value={form.fullName}
                onChangeText={(text)=>setForm({...form,fullName:text})}
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
                value={form.email}
                onChangeText={(text)=>setForm({...form,email:text})}
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
                value={form.password}
                onChangeText={(text)=>setForm({...form,password:text})}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
  

  
            <TouchableOpacity
              className={`rounded-xl py-4 items-center mb-6 ${
                isPending ? 'bg-gray-400' : 'bg-primary'
              }`}
              onPress={handleSignUp}
              disabled={isPending}
            >
              <Text className="text-white text-base font-semibold">
                {isPending ? 'Creating Account...' : 'Create Account'}
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
})

SignUpForm.displayName='SignUpForm'

export default SignUpForm