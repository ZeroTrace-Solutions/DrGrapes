import React from 'react';
import { View, Text, Image } from 'react-native';

export default function ContestCard({ title, time, prize, prizeType }) {
  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-1 flex-row items-center">
        <View className="w-12 h-12 rounded-full bg-surface-container-highest mr-md overflow-hidden">
          <Image source={{ uri: 'https://i.pravatar.cc/100' }} className="w-full h-full" />
        </View>
        <View className="flex-1">
          <Text className="title-sm text-on-surface" numberOfLines={1}>{title}</Text>
          <Text className="body-sm text-on-surface-variant">{time}</Text>
        </View>
      </View>
      <View className="items-end ml-md">
        <Text className="title-sm text-primary">{prize}</Text>
        <Text className="text-[8px] text-outline-variant font-bold tracking-widest">{prizeType}</Text>
      </View>
    </View>
  );
}
