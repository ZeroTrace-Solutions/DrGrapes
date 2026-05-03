import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, Text } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft, FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { validatePassword, validateConfirmPassword } from '@shared/utils/validation';

// Components
import SignupAction from '@/components/signup/SignupAction';
import SignupHeader from '@/components/signup/SignupHeader';
import SignupInput from '@/components/signup/SignupInput';
import SignupError from '@/components/signup/SignupError';
import PasswordChecklist from '@/components/common/PasswordChecklist';
import { useAuth } from '@/context/AuthContext';

export default function SignupStep2() {
  const router = useRouter();
  const { updateSignupData, signupData } = useAuth();
  const [password, setPassword] = useState(signupData.password || '');
  const [confirmPassword, setConfirmPassword] = useState(signupData.password || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleContinue = async () => {
    setError(null);

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      return;
    }

    const confirmValidation = validateConfirmPassword(password, confirmPassword);
    if (!confirmValidation.isValid) {
      setError(confirmValidation.message);
      return;
    }

    updateSignupData({ password });
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
                <SignupInput
                  label="CREATE PASSWORD"
                  placeholder="••••••••••••"
                  icon="key"
                  isPassword={true}
                  value={password}
                  onChangeText={setPassword}
                />

                <PasswordChecklist password={password} />

                {/* Confirm Password */}
                <SignupInput
                  label="CONFIRM PASSWORD"
                  placeholder="••••••••••••"
                  icon="verified-user"
                  isPassword={true}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />

                {/* Error Message */}
                <SignupError message={error} />
              </View>

              {/* Action Buttons */}
              <SignupAction
                onPress={handleContinue}
                onPrevious={handlePrevious}
                isLoading={isLoading}
              />
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
