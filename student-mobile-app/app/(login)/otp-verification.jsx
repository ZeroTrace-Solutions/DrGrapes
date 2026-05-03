import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import OtpInput from '@/components/signup/OtpInput';
import { useAuth } from '@/context/AuthContext';

export default function OtpVerificationScreen() {
  const router = useRouter();
  const { email, purpose } = useLocalSearchParams();
  const { resendOtp, isLoading } = useAuth();

  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [resendStatus, setResendStatus] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);

  React.useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = async (code) => {
    setOtp(code);
    if (code.length === 6) {
      // For forgot password, we don't verify here yet, we just go to reset password with the code
      // OR we can verify it if the API supports a separate verification step.
      // Looking at shared/api/auth.js, resetPassword takes the code.
      router.push({
        pathname: '/(login)/reset-password',
        params: { email, code }
      });
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setError(null);
    setResendStatus(null);
    const { error: apiError } = await resendOtp(email, purpose || 'FORGET_PASSWORD');

    if (!apiError) {
      setResendStatus("Code resent successfully!");
      setTimeLeft(180);
      setCanResend(false);
    } else {
      setError(apiError);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#121414' }}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, padding: 24 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <View style={{ marginBottom: 40 }}>
              <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white', marginBottom: 12 }}>
                Verify Email
              </Text>
              <Text style={{ fontSize: 16, color: '#a48a93', lineHeight: 24 }}>
                We've sent a 6-digit verification code to{"\n"}
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{email}</Text>
              </Text>
            </View>

            {/* OTP Input */}
            <View style={{ marginBottom: 32 }}>
              <OtpInput length={6} onComplete={handleVerify} isLoading={isLoading} />
            </View>

            {/* Error Message */}
            {error && (
              <Animated.View
                entering={FadeInUp.duration(400)}
                exiting={FadeOutDown.duration(300)}
                style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)', borderWidth: 1, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 }}
              >
                <MaterialIcons name="error-outline" size={20} color="#ffb4ab" />
                <Text style={{ color: '#ffb4ab', fontSize: 14, flex: 1 }}>{error}</Text>
              </Animated.View>
            )}

            {/* Success Message */}
            {resendStatus && (
              <Animated.View
                entering={FadeInUp.duration(400)}
                style={{ backgroundColor: 'rgba(74, 222, 128, 0.1)', borderColor: 'rgba(74, 222, 128, 0.2)', borderWidth: 1, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 }}
              >
                <MaterialIcons name="check-circle" size={20} color="#4ade80" />
                <Text style={{ color: '#4ade80', fontSize: 14, flex: 1 }}>{resendStatus}</Text>
              </Animated.View>
            )}

            <View style={{ alignItems: 'center', gap: 16 }}>
              <Text style={{ color: '#52525b', fontSize: 14 }}>Didn't receive the code?</Text>
              <TouchableOpacity onPress={handleResend} disabled={isLoading || !canResend}>
                {isLoading ? (
                  <ActivityIndicator color="#c13584" />
                ) : (
                  <Text style={{
                    color: canResend ? '#c13584' : '#52525b',
                    fontSize: 16,
                    fontWeight: 'bold'
                  }}>
                    {canResend ? "Resend Code" : `Resend Code in ${formatTime(timeLeft)}`}
                  </Text>
                )}
              </TouchableOpacity>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
