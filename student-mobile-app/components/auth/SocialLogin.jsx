import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

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
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwX8Sl3ozOMc0MJj5-dGOw8Gm-RiXhoW36kxhy9BG1ibhg3_bku5Vaodw1oqGQDaUHrO4DhWx8NjVjcI5HLO_1odEgEBwAiFCtdAVG_-NGS072e_LAGhuSCygoe4oHdu4sQ7akfYsJ8TOFllASfciVMZyDdNQSUfuC0vVO9RvdCv4vQ2lc4CL-wLSLL71QpbFjaE-S0oqjSkCZC6rm9eXKk5p7W6k0KO5OPE47myW0geIX6G-DOADBxYvNA7wEgSmcu7wvs3FrgHg' }}
          className="w-6 h-6"
        />
        <Text className="text-[18px] font-semibold text-on-surface ml-2">Google Login</Text>
      </TouchableOpacity>
    </View>
  );
}
