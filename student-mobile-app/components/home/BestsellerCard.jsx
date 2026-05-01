import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';

const StyledPressable = styled(Pressable);

export default function BestsellerCard({ image, title, desc, price }) {
  return (
    <View className="bg-surface-container-low rounded-xl w-48 mr-md overflow-hidden border border-outline-variant/30">
      <View className="h-40 w-full bg-surface-container-highest">
        <Image source={image} className="w-full h-full" resizeMode="cover" />
      </View>
      <View className="p-md">
        <Text className="title-sm text-on-surface mb-xs" numberOfLines={1}>{title}</Text>
        <Text className="body-sm text-on-surface-variant mb-md" numberOfLines={1}>{desc}</Text>
        <View className="flex-row justify-between items-center">
          <Text className="body-md font-bold text-on-surface">{price}</Text>
          <StyledPressable className="bg-primary-container p-xs rounded-full">
            <Ionicons name="cart" size={16} color="white" />
          </StyledPressable>
        </View>
      </View>
    </View>
  );
}
