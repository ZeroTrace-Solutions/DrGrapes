import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function SocialLogin() {
  return (
    <View style={{ width: '100%' }} className="mt-xl">
      {/* Social Divider */}
      <View className="flex-row items-center mb-xl">
        <View className="h-[1px] flex-1 bg-white/10" />
        <Text className="text-[12px] font-bold tracking-widest text-zinc-500 mx-md uppercase">OR CONTINUE WITH</Text>
        <View className="h-[1px] flex-1 bg-white/10" />
      </View>
      {/* ... */}
      <TouchableOpacity
        className="w-full border-2 border-secondary-container h-14 rounded-full flex-row items-center justify-center gap-md"
      >
        <Image
          source={require('@/assets/images/google-logo.png')}
          className="w-6 h-6"
        />
        <Text className="text-[18px] font-semibold text-on-surface ml-2">Google Login</Text>
      </TouchableOpacity>
    </View>
  );
}
