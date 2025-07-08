import { useUser } from "@/contexts/userContext"
import { fetchAPI } from "@/lib/fetch"
import { signInUser } from "@/lib/user.action"
import { router } from "expo-router"
import { memo, useCallback, useState, useTransition } from "react"
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"

type SignInFormInput={
    email:string,
    password:string,
  }

const SignInForm=memo(({setActiveTab}:{setActiveTab:(tab:'signin' | 'signup')=>void})=>{
    const {refetch} = useUser()
    const [form,setForm] = useState<SignInFormInput>({
      email:'',
      password:'',
    })
    const [isPending,startTransition] = useTransition()
  
    const handleSignIn = useCallback(async () => {
      console.log('form',form)
      if (!form.email || !form.password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
  
      startTransition(async()=>{
        try {
          // TODO: Implement actual sign-in logic
          const userData=await fetchAPI('/api/auth/sign_in',{
            method:'POST',
            body:JSON.stringify(form)
          })
          console.log('userData',userData)
          if(userData.loginSuccess){
            await refetch()
            router.replace('/(pages)/(others)/(tabs_screens)')
          }else{
            throw new Error('Failed to sign in. Please try again.');
          }
      } catch (error:any) {
        Alert.alert('Error', error.message);
      } 
    })
    },[])
  
    const handleSignUp = () => {
      // set active tab to sigup
      setActiveTab('signup')
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
              value={form.email}
              onChangeText={(text)=>setForm({...form,email:text})}
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
              value={form.password}
              onChangeText={(text)=>setForm({...form,password:text})}
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
              isPending ? 'bg-gray-400' : 'bg-primary'
            }`}
            onPress={handleSignIn}
            disabled={isPending}
          >
            <Text className="text-white text-base font-semibold">
              {isPending ? 'Signing In...' : 'Sign In'}
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
  })
  
  SignInForm.displayName='SignInForm'

  export default SignInForm