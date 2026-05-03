import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { validateEmail } from '@shared/utils/validation';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { forgetPassword, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(null);

  const handleRequestReset = async () => {
    setError(null);
    
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.message);
      return;
    }
    const { error: apiError } = await forgetPassword(email);

    if (!apiError) {
      router.push({
        pathname: '/(login)/otp-verification',
        params: { email, purpose: 'FORGET_PASSWORD' }
      });
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
                Reset Password
              </Text>
              <Text style={{ fontSize: 16, color: '#a48a93', lineHeight: 24 }}>
                Enter your email address and we'll send you a 6-digit code to reset your password.
              </Text>
            </View>

            {/* Email Field */}
            <View style={{ gap: 12, marginBottom: 32 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', tracking: 1.2, color: '#a48a93', marginLeft: 16 }}>EMAIL ADDRESS</Text>
              <View style={{
                flexDirection: 'row',
                items: 'center',
                borderRadius: 32,
                backgroundColor: '#1e2020',
                borderWidth: 2,
                borderColor: isFocused ? '#c13584' : 'transparent',
                paddingHorizontal: 20,
                height: 64
              }}>
                <MaterialIcons name="email" size={20} color={isFocused ? "#c13584" : "#52525b"} style={{ marginRight: 12, marginTop: 20 }} />
                <TextInput
                  style={{ flex: 1, color: 'white', fontSize: 16 }}
                  placeholder="Enter your email"
                  placeholderTextColor="#52525b"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </View>
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

            <TouchableOpacity
              onPress={handleRequestReset}
              disabled={isLoading}
              style={{
                height: 64,
                borderRadius: 32,
                backgroundColor: isLoading ? 'rgba(193, 53, 132, 0.5)' : '#c13584',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 12,
                shadowColor: '#c13584',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8
              }}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Send Reset Code</Text>
                  <MaterialIcons name="chevron-right" size={24} color="white" />
                </>
              )}
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
