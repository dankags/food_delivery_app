import AuthLayout from '@/components/AuthLayout';
import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';
import { useState } from 'react';


export default function AuthIndex() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  return (
    <AuthLayout
    title="Create Account"
    subtitle="Sign up to get started with food delivery"
    activeTab={activeTab}
    setActiveTab={setActiveTab}
  >
    {activeTab === 'signin' ? <SignInForm setActiveTab={setActiveTab}/> : <SignUpForm setActiveTab={setActiveTab}/>}
  </AuthLayout>
  );
}
