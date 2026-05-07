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
import { useAuth } from '@/context/AuthContext';
import CustomToast from '@/components/common/CustomToast';

const RESEND_TIMER_SECONDS = 120; // 2 minutes

export default function SignupStep6() {
  const router = useRouter();
  const { signupData, resendOtp, verifyEmail, isLoading } = useAuth();
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
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

  const handleResend = async () => {
    if (!canResend) return;

    const { error: apiError } = await resendOtp(signupData.email, 'SIGNUP');

    if (!apiError) {
      setToastType('success');
      setToastMessage("Verification email resent successfully");
      setToastVisible(true);
      setTimeLeft(RESEND_TIMER_SECONDS);
      setCanResend(false);
    } else {
      setToastType('error');
      setToastMessage(apiError);
      setToastVisible(true);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = async (code) => {
    setOtpStatus('default');

    const { data, error } = await verifyEmail(signupData.email, code);

    if (!error) {
      setOtpStatus('success');
      setTimeout(() => {
        router.push('/signup/success');
      }, 1000);
    } else {
      setOtpStatus('default');
      setToastType('error');
      setToastMessage(error);
      setToastVisible(true);
    }
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
                description="Enter the 6-digit OTP verification code sent to your email address."
              />

              {/* OTP Input */}
              <OtpInput length={6} onComplete={handleVerify} status={otpStatus} isLoading={isLoading} />

              {/* Action Section */}
              <View className="w-full gap-md">
                <View className="items-center gap-xs pt-sm">
                  <Text className="text-sm text-on-surface-variant">Didn't receive a code?</Text>
                  <TouchableOpacity
                    onPress={handleResend}
                    disabled={!canResend || isLoading}
                    className={(!canResend || isLoading) ? "opacity-50" : ""}
                  >
                    <Text className={`text-sm font-semibold ${canResend ? 'text-secondary-container' : 'text-on-surface-variant'}`}>
                      {canResend ? "Resend Code" : `Resend Code in ${formatTime(timeLeft)}`}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <CustomToast
        message={toastMessage}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
        type={toastType}
      />
    </View>
  );
}
