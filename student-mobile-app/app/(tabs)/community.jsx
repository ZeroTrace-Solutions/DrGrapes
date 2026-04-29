import { View, Text } from 'react-native';
import React from 'react';

export default function CommunityScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text className="headline-md text-on-surface">Community</Text>
      <Text className="body-md text-on-surface-variant">Connect with other medical students.</Text>
    </View>
  );
}
