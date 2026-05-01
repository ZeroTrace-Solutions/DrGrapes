import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View, Linking } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import SignupAction from '@/components/signup/SignupAction';
import SignupHeader from '@/components/signup/SignupHeader';
import SignupInput from '@/components/signup/SignupInput';
import SignupSocialButton from '@/components/signup/SignupSocialButton';
const TERMS_URL = "https://dr-grapes.ztsolutions.tech/terms";
const PRIVACY_URL = "https://dr-grapes.ztsolutions.tech/privacy";

export default function SignupStep1() {
  const router = useRouter();
  const { method } = useLocalSearchParams();
  const isGoogle = method === 'google';

  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  const handleContinue = () => {
    router.push('/signup/step2');
  };

  const handleGoogleSignup = () => {
    router.push('/signup/step4?method=google');
  };

  return (
    <View style={{ flex: 1 }} className="flex-1 bg-transparent relative overflow-hidden">
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
                title={"Welcome to the circle."}
                description="Join Dr. Grapes and start your personalized medical education journey today."
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
                    <Text 
                      onPress={() => openLink(TERMS_URL)}
                      className="text-primary-container font-medium"
                    >
                      Terms of Service
                    </Text> and{" "}
                    <Text 
                      onPress={() => openLink(PRIVACY_URL)}
                      className="text-primary-container font-medium"
                    >
                      Privacy Policy
                    </Text>.
                  </Text>
                }
              />
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
