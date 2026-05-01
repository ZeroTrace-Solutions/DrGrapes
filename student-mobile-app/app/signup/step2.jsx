import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import SignupAction from '@/components/signup/SignupAction';
import SignupHeader from '@/components/signup/SignupHeader';
import SignupInput from '@/components/signup/SignupInput';

export default function SignupStep2() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/signup/step3');
  };

  const handlePrevious = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-transparent relative overflow-hidden">
      <StatusBar style="light" />

      <SafeAreaView style={{ flex: 1 }} className="flex-1">
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <Animated.View
            entering={SlideInRight.duration(400)}
            exiting={SlideOutLeft.duration(300)}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, padding: 20 }}
              showsVerticalScrollIndicator={false}
            >

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
              </View>

              {/* Action Buttons */}
              <SignupAction
                onPress={handleContinue}
                onPrevious={handlePrevious}
              />
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
