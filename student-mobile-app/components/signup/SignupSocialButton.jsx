import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';

export default function SignupSocialButton({ onPress, label = "Continue with Google", iconUri }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="w-full h-14 bg-white rounded-full flex-row items-center justify-center gap-md mb-md"
    >
      <Image 
        source={{ uri: iconUri || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcc0CAUVqguahEojqlAg-_3fb3gGSLYRHcHD2-ecyu8PLLxCL6mttvTg1hFpT0N0RIQyybSNjp9GS1SbfcOSTnD07ylmWwY5LD1xATDAXKMywO3nTmhOk8kcSeoSmI0BHV8JKUUMb9vYcHANoODk2dK9OVRvELmx8ZYCuH-QeK-oK8ULZOuptjQgPFo160Tv8PmbXzdP0WwDLg6TZ7SUCenfvP5BHz0IFmXnog7ui1n-e_szg2XsfvmSdm6cGe9Czw4nZQCUqhkww' }}
        className="w-6 h-6"
      />
      <Text className="text-lg font-semibold text-neutral-900 ml-2">{label}</Text>
    </TouchableOpacity>
  );
}
