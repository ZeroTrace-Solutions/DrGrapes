import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignupFooter() {
  const router = useRouter();

  return (
    <View className="mt-xl items-center">
      <View className="flex-row items-center">
        <Text className="text-[14px] text-on-surface-variant">
          Don't have an account? 
        </Text>
        <TouchableOpacity onPress={() => router.navigate('/signup/step1')}>
          <Text className="text-primary font-bold ml-xs">Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
