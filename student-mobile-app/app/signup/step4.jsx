import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import SignupProgressBar from '../../components/signup/SignupProgressBar';
import SignupHeader from '../../components/signup/SignupHeader';
import SignupAction from '../../components/signup/SignupAction';
import SignupInfoCard from '../../components/signup/SignupInfoCard';
import SignupPhotoUpload from '../../components/signup/SignupPhotoUpload';
import SignupUsernameInput from '../../components/signup/SignupUsernameInput';
import AmbientGlow from '../../components/auth/AmbientGlow';

export default function SignupStep4() {
  const router = useRouter();
  const { method } = useLocalSearchParams();
  const isGoogle = method === 'google';
  
  const [username, setUsername] = useState('iamjimmy');

  const handleContinue = () => {
    router.push(`/signup/step5${isGoogle ? '?method=google' : ''}`);
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
            contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Progress Bar */}
            <SignupProgressBar 
              currentStep={isGoogle ? 2 : 4} 
              totalSteps={isGoogle ? 3 : 5} 
              title={isGoogle ? "PROFILE SETUP" : "80%"} 
            />

            {/* Header */}
            <SignupHeader 
              title="Choose your look"
              description="Set up your profile identity. Your photo and username will be visible to the community."
            />

            {/* Profile Photo */}
            <SignupPhotoUpload />

            {/* Username Section */}
            <View className="w-full gap-lg">
              <SignupUsernameInput 
                value={username}
                onChangeText={setUsername}
                isAvailable={true}
              />

              <SignupInfoCard 
                text="You can change your username once every 30 days. Make it memorable!"
                icon="info"
              />
            </View>

          </ScrollView>

          {/* Fixed Bottom Action Bar */}
          <View 
            className="absolute bottom-0 left-0 right-0 p-container-margin pb-xl"
            style={{ 
              backgroundColor: 'rgba(18, 20, 20, 0.9)',
              borderTopWidth: 1,
              borderTopColor: 'rgba(255, 255, 255, 0.05)'
            }}
          >
            <SignupAction 
              onPress={handleContinue}
              showArrow={true}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
