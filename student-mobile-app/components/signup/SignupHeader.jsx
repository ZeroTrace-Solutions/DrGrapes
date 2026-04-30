import React from 'react';
import { View, Text } from 'react-native';

export default function SignupHeader({ title, description }) {
  return (
    <View className="mb-xl py-lg">
      <Text className="text-3xl font-bold text-white mb-md leading-10">
        {title}
      </Text>
      <Text className="text-base text-on-surface-variant">
        {description}
      </Text>
    </View>
  );
}
