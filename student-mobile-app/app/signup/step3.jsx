import React from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import SignupProgressBar from '../../components/signup/SignupProgressBar';
import SignupHeader from '../../components/signup/SignupHeader';
import SignupAction from '../../components/signup/SignupAction';
import SignupSupportCard from '../../components/signup/SignupSupportCard';
import OtpInput from '../../components/signup/OtpInput';
import AmbientGlow from '../../components/auth/AmbientGlow';

export default function SignupStep3() {
  const router = useRouter();

  const handleVerify = () => {
    router.push('/signup/step4');
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
              currentStep={3} 
              totalSteps={5} 
              title="60% COMPLETE" 
            />

            {/* Header */}
            <SignupHeader 
              title="Secure Your Account"
              description="Enter the 5-digit verification code sent to your email address."
            />

            {/* OTP Input */}
            <OtpInput length={5} onComplete={(code) => console.log("Code entered:", code)} />

            {/* Action Section */}
            <View className="w-full gap-md">
              <SignupAction 
                label="Verify Code"
                onPress={handleVerify}
                showArrow={false}
              />

              <View className="items-center gap-xs pt-sm">
                <Text className="text-sm text-on-surface-variant">Didn't receive a code?</Text>
                <TouchableOpacity onPress={() => console.log("Resend code")}>
                  <Text className="text-sm font-semibold text-secondary-container">
                    Resend Code
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Support Visual */}
            <SignupSupportCard />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
