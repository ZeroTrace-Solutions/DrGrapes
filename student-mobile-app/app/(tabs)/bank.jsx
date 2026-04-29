import { View, Text } from 'react-native';
import React from 'react';

export default function BankScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text className="headline-md text-on-surface">Question Bank</Text>
      <Text className="body-md text-on-surface-variant">Access your study materials here.</Text>
    </View>
  );
}
