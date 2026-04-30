import React from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SignupProgressBar from '../../components/signup/SignupProgressBar';
import SignupHeader from '../../components/signup/SignupHeader';
import SignupSocialButton from '../../components/signup/SignupSocialButton';
import SignupInput from '../../components/signup/SignupInput';
import SignupAction from '../../components/signup/SignupAction';

import { useRouter, useLocalSearchParams } from 'expo-router';

export default function SignupStep1() {
  const router = useRouter();
  const { method } = useLocalSearchParams();
  const isGoogle = method === 'google';

  const handleContinue = () => {
    router.push('/signup/step2');
  };

  const handleGoogleSignup = () => {
    router.push('/signup/step4?method=google');
  };

  return (
    <View className="flex-1 bg-surface-dim relative overflow-hidden">
      <StatusBar style="light" />
      
      {/* Decorative Glows */}
      <View 
        className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container/10 rounded-full"
        style={{ opacity: 0.5 }}
      />
      <View 
        className="absolute bottom-24 -left-24 w-64 h-64 bg-secondary-container/10 rounded-full"
        style={{ opacity: 0.3 }}
      />

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
              currentStep={1} 
              totalSteps={isGoogle ? 3 : 5} 
              title="JOIN THE CIRCLE" 
            />

            {/* Header */}
            <SignupHeader 
              title={"Welcome to\nthe circle."}
              description="Join Dr. Jimmy and start your personalized health journey today."
            />

            {/* Social Login */}
            <SignupSocialButton onPress={handleGoogleSignup} />

            {/* Separator */}
            <View className="flex-row items-center gap-md mb-md">
              <View className="flex-1 h-[1px] bg-outline-variant" />
              <Text className="text-xs font-bold tracking-widest text-on-surface-variant uppercase mx-md">OR EMAIL</Text>
              <View className="flex-1 h-[1px] bg-outline-variant" />
            </View>

            {/* Email Input */}
            <SignupInput 
              placeholder="Enter your email" 
              icon="mail" 
              type="email" 
            />

            {/* Primary Action */}
            <SignupAction 
              onPress={handleContinue}
              footerText={
                <Text>
                  By continuing, you agree to our{" "}
                  <Text className="text-primary-container font-medium">Terms of Service</Text> and{" "}
                  <Text className="text-primary-container font-medium">Privacy Policy</Text>.
                </Text>
              }
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
