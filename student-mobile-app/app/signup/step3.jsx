import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import OtpInput from '@/components/signup/OtpInput';
import SignupAction from '@/components/signup/SignupAction';
import SignupHeader from '@/components/signup/SignupHeader';
import CustomToast from '@/components/common/CustomToast';

const RESEND_TIMER_SECONDS = 5; // 3 minutes

export default function SignupStep3() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [otpStatus, setOtpStatus] = useState('default');

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    if (!canResend) return;
    console.log("Resending code...");
    setToastVisible(true);
    setTimeLeft(RESEND_TIMER_SECONDS);
    setCanResend(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = () => {
    // Simulate API success
    setOtpStatus('success');
    
    // Wait 1 second before navigating
    setTimeout(() => {
      router.push('/signup/step4');
    }, 1000);
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
                description="Enter the 5-digit verification code sent to your email address."
              />

              {/* OTP Input */}
              <OtpInput length={5} onComplete={handleVerify} status={otpStatus} />

              {/* Action Section */}
              <View className="w-full gap-md">
                <View className="items-center gap-xs pt-sm">
                  <Text className="text-sm text-on-surface-variant">Didn't receive a code?</Text>
                  <TouchableOpacity
                    onPress={handleResend}
                    disabled={!canResend}
                    className={!canResend ? "opacity-50" : ""}
                  >
                    <Text className={`text-sm font-semibold ${canResend ? 'text-secondary-container' : 'text-on-surface-variant'}`}>
                      {canResend ? "Resend Code" : `Resend Code in ${formatTime(timeLeft)}`}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Support Visual */}
              {/* <SignupSupportCard /> */}
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <CustomToast 
        message="Verification email resent successfully"
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
        type="success"
      />
    </View>
  );
}
