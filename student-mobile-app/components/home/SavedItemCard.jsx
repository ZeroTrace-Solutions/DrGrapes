import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SavedItemCard({ icon, title, updated, className }) {
  return (
    <View className={`bg-surface-container rounded-xl p-md w-[48%] min-h-[160px] justify-between ${className}`}>
      <View className="w-10 h-10 rounded-lg bg-surface-container-highest items-center justify-center mb-md">
        <Ionicons name={icon} size={20} color="#dcbfc9" />
      </View>
      <View>
        <Text className="title-sm text-on-surface mb-xs" numberOfLines={2}>{title}</Text>
        <Text className="text-[10px] text-on-surface-variant">{updated}</Text>
      </View>
    </View>
  );
}
