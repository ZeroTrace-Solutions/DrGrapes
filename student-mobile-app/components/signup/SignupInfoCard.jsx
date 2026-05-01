import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SignupInfoCard({ text, icon = "info" }) {
  return (
    <View className="bg-secondary-container/10 border border-secondary-container/20 p-lg rounded-lg flex-row gap-md items-start mt-md">
      <MaterialIcons name={icon} size={20} color="#405DE6" />
      <View className="flex-1">
        <Text className="text-sm text-secondary-fixed leading-5">
          {text}
        </Text>
      </View>
    </View>
  );
}
