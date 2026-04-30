import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function BrandingHeader() {
  return (
    <View style={{ width: '100%' }} className="mb-xl items-center">
      <View className="w-16 h-16 bg-primary-container rounded-xl items-center justify-center mb-md">
        <MaterialIcons name="medical-services" size={30} color="white" />
      </View>
      <Text className="text-3xl font-bold text-primary mb-xs">Dr. Jimmy</Text>
      <Text className="text-base text-on-surface-variant text-center max-w-[240px]">
        Your clinical journey starts here.
      </Text>
    </View>
  );
}
