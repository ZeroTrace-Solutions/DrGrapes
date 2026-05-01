import React from 'react';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';

const StyledPressable = styled(Pressable);

export default function HomeTopHeader() {
  return (
    <View className="px-container-margin pt-xl mb-md flex-row justify-between items-center">
      <StyledPressable className="w-12 h-12 bg-surface-container rounded-full items-center justify-center border border-outline-variant/30 active:opacity-70">
        <Ionicons name="notifications-outline" size={24} color="#e2e2e2" />
        {/* Notification Badge Dot */}
        <View className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary-container rounded-full border-2 border-background" />
      </StyledPressable>
      
      <StyledPressable className="w-12 h-12 bg-surface-container rounded-full items-center justify-center border border-outline-variant/30 active:opacity-70">
        <Ionicons name="cart-outline" size={24} color="#e2e2e2" />
      </StyledPressable>
    </View>
  );
}
