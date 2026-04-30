import React from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function DecorativeBento() {
  return (
    <View style={{ width: '100%' }} className="mt-xl flex-row gap-md opacity-40">
      <View className="flex-1 h-24 bg-surface-container-high/70 rounded-lg items-center justify-center border border-white/5">
        <View className="w-8 h-8 rounded-full bg-primary/20 items-center justify-center">
          <MaterialIcons name="health-and-safety" size={16} color="#ffafd2" />
        </View>
      </View>
      <View className="flex-1 h-24 bg-surface-container-high/70 rounded-lg items-center justify-center border border-white/5 ml-4">
        <View className="w-8 h-8 rounded-full bg-secondary/20 items-center justify-center">
          <MaterialIcons name="verified-user" size={16} color="#bac3ff" />
        </View>
      </View>
    </View>
  );
}
