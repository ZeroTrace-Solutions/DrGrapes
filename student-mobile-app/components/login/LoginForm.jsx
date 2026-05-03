import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { useAuth } from '@/context/AuthContext';

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleLogin = async () => {
    setError(null);
    const { data, error: apiError } = await login(email, password);
    
    if (!apiError) {
      router.replace('/(tabs)');
    } else {
      setError(apiError);
    }
  };

  return (
    <View style={{ width: '100%' }} className="gap-md">
      {/* Username/Email Field */}
      <View className="gap-xs">
        <Text className="text-[12px] font-bold tracking-widest text-on-surface-variant px-sm uppercase">EMAIL OR USERNAME</Text>
        <View className={`relative flex-row items-center rounded-full bg-surface-container border ${isEmailFocused ? 'border-primary-container' : 'border-white/5'} px-md h-14`}>
          <MaterialIcons name="person" size={20} color={isEmailFocused ? "#c13584" : "#71717a"} />
          <TextInput
            className="flex-1 text-body-md text-white ml-sm"
            placeholder="Enter your credentials"
            placeholderTextColor="#52525b"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
          />
        </View>
      </View>

      {/* Password Field */}
      <View className="gap-xs">
        <Text className="text-[12px] font-bold tracking-widest text-on-surface-variant px-sm uppercase">PASSWORD</Text>
        <View className={`relative flex-row items-center rounded-full bg-surface-container border ${isPasswordFocused ? 'border-primary-container' : 'border-white/5'} px-md h-14`}>
          <MaterialIcons name="lock" size={20} color={isPasswordFocused ? "#c13584" : "#71717a"} />
          <TextInput
            className="flex-1 text-body-md text-white ml-sm"
            placeholder="••••••••"
            placeholderTextColor="#52525b"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons 
              name={showPassword ? "visibility" : "visibility-off"} 
              size={20} 
              color="#71717a" 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Error Message */}
      {error && (
        <Animated.View 
          entering={FadeInUp.duration(400)}
          exiting={FadeOutDown.duration(300)}
          className="bg-error/10 border border-error/20 rounded-xl p-md flex-row items-center gap-sm"
        >
          <MaterialIcons name="error-outline" size={18} color="#ffb4ab" />
          <Text className="text-error text-xs font-medium flex-1">
            {error}
          </Text>
        </Animated.View>
      )}

      {/* Forgot Password */}
      <TouchableOpacity 
        onPress={() => router.push('/(login)/forgot-password')}
        className="items-end px-sm"
      >
        <Text className="text-[12px] font-bold tracking-widest text-secondary uppercase">Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Action */}
      <View className="pt-sm">
        <TouchableOpacity 
          onPress={handleLogin}
          disabled={isLoading}
          className={`w-full ${isLoading ? 'bg-primary-container/50' : 'bg-primary-container'} h-14 rounded-full items-center justify-center shadow-lg`}
          style={{ shadowColor: '#c13584', shadowOpacity: 0.3, shadowRadius: 20, elevation: 5 }}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-[18px] font-semibold text-on-primary-container">Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
