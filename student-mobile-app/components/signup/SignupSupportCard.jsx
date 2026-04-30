import React from 'react';
import { View, Text, Image } from 'react-native';

export default function SignupSupportCard({ 
  title = "Need Help?", 
  description = "Our security team is here to assist you 24/7 with account verification.",
  imageUri = "https://lh3.googleusercontent.com/aida-public/AB6AXuABhqmj4ACPvUyeZASMmEqXRc5XSTT05jnfcFT6C9SUnfZD-eXIZ9qfqKYOcDzh6ojBuNYQm0qED0ZLtGiW-Fx5biDPXubPR7hU35ZJDHQ3YNt9r2KRz7ioikDQ6GuL_zRg4kk5T2LidIET6JE6BKCSIWNmCWQYn7zB9s34FKR8J0AweeNVWYoOyFxUOCc5jUnQugod39vAr8FzNcorvF5Si4WO5rrxcln_UpheC1f8ICgUiRYn2XCVD1V5zkFw-XzRsssF-ntxdFo"
}) {
  return (
    <View className="mt-auto w-full pt-xl">
      <View className="bg-surface-container-high/50 p-md rounded-lg border border-neutral-800/50 flex-row items-center gap-md">
        <View className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden border-2 border-primary-container/30">
          <Image 
            source={{ uri: imageUri }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <View className="flex-1">
          <Text className="text-xs font-bold tracking-widest text-primary-container mb-xs uppercase">
            {title}
          </Text>
          <Text className="text-sm text-on-surface/80 leading-5">
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
}
