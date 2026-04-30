import React from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import SignupProgressBar from '../../components/signup/SignupProgressBar';
import SignupHeader from '../../components/signup/SignupHeader';
import SignupInput from '../../components/signup/SignupInput';
import SignupAction from '../../components/signup/SignupAction';
import SignupInfoCard from '../../components/signup/SignupInfoCard';
import AmbientGlow from '../../components/auth/AmbientGlow';

export default function SignupStep2() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/signup/step3');
  };

  const handlePrevious = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-surface-dim relative overflow-hidden">
      <StatusBar style="light" />
      
      {/* Decorative Glows */}
      <AmbientGlow />

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1, padding: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Progress Bar */}
            <SignupProgressBar 
              currentStep={2} 
              totalSteps={5} 
              title="40% COMPLETE" 
            />

            {/* Header */}
            <SignupHeader 
              title="Secure Your Account"
              description="Create a strong password that’s unique to you. We recommend using a mix of letters, numbers, and symbols."
            />

            {/* Form Section */}
            <View className="flex-1 gap-lg">
              {/* Create Password */}
              <View className="gap-sm">
                <Text className="text-xs font-bold tracking-widest text-on-surface-variant ml-4 uppercase">
                  CREATE PASSWORD
                </Text>
                <SignupInput 
                  placeholder="••••••••••••" 
                  icon="key" 
                  isPassword={true}
                />
              </View>

              {/* Confirm Password */}
              <View className="gap-sm">
                <Text className="text-xs font-bold tracking-widest text-on-surface-variant ml-4 uppercase">
                  CONFIRM PASSWORD
                </Text>
                <SignupInput 
                  placeholder="••••••••••••" 
                  icon="verified-user" 
                  isPassword={true}
                />
              </View>

              {/* Security Tip Card */}
              <SignupInfoCard 
                text="Your password must be at least 12 characters long for maximum security."
                icon="info"
              />
            </View>

            {/* Action Buttons */}
            <SignupAction 
              onPress={handleContinue}
              onPrevious={handlePrevious}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
