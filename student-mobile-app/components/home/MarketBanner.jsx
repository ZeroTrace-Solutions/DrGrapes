import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';

const StyledPressable = styled(Pressable);

export default function MarketBanner() {
  return (
    <View className="px-container-margin mb-xl">
      <StyledPressable className="accent-gradient rounded-xl p-lg flex-row items-center justify-between overflow-hidden shadow-lg shadow-primary/20">
        <View className="flex-1">
          <Text className="headline-md text-white font-bold mb-xs">The Market</Text>
          <Text className="body-sm text-white/80">Explore professional medical tools & resources</Text>
        </View>
        <View className="bg-white/20 rounded-full p-sm">
          <Ionicons name="arrow-forward" size={20} color="white" />
        </View>
        {/* Abstract Icon Decoration */}
        <View className="absolute -right-4 -bottom-4 opacity-10">
          <Ionicons name="cart" size={100} color="white" />
        </View>
      </StyledPressable>
    </View>
  );
}
