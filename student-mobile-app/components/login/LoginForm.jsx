import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleLogin = () => {
    router.replace('/(tabs)');
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

      {/* Forgot Password */}
      <TouchableOpacity className="items-end px-sm">
        <Text className="text-[12px] font-bold tracking-widest text-secondary uppercase">Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Action */}
      <View className="pt-sm">
        <TouchableOpacity 
          onPress={handleLogin}
          className="w-full bg-primary-container h-14 rounded-full items-center justify-center shadow-lg"
          style={{ shadowColor: '#c13584', shadowOpacity: 0.3, shadowRadius: 20, elevation: 5 }}
        >
          <Text className="text-[18px] font-semibold text-on-primary-container">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
