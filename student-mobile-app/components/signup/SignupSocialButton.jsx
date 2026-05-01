import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

export default function SignupSocialButton({ onPress, label = "Continue with Google", iconUri }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full h-14 bg-white rounded-full flex-row items-center justify-center gap-md mb-md"
    >
      <Image
        source={require('@/assets/images/google-logo.png')}
        className="w-6 h-6"
      />
      <Text className="text-lg font-semibold text-neutral-900 ml-2">{label}</Text>
    </TouchableOpacity>
  );
}
