import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';

const StyledPressable = styled(Pressable);

export default function QuizCard({ icon, module, title, progress, stats, color }) {
  const progressBarColor = color === 'primary' ? 'bg-primary-container' : 'bg-secondary-container';
  const iconBg = color === 'primary' ? 'bg-primary-container/10' : 'bg-secondary-container/10';
  const iconColor = color === 'primary' ? '#c13584' : '#0d36c3';

  return (
    <View className="bg-surface-container rounded-xl p-lg mb-md">
      <View className="flex-row justify-between items-start mb-md">
        <View className={`w-12 h-12 rounded-lg ${iconBg} items-center justify-center`}>
          <Ionicons name={icon} size={24} color={iconColor} />
        </View>
        <View className={`${progressBarColor} rounded-full px-sm py-xs`}>
          <Text className="text-[10px] text-white font-bold uppercase">{module}</Text>
        </View>
      </View>
      
      <Text className="title-sm text-on-surface mb-xs">{title}</Text>
      <Text className="body-sm text-on-surface-variant mb-md">{stats}</Text>
      
      {/* Progress Bar */}
      <View className="h-1.5 w-full bg-surface-container-highest rounded-full mb-lg overflow-hidden">
        <View className={`h-full ${progressBarColor}`} style={{ width: `${progress * 100}%` }} />
      </View>

      <StyledPressable className="bg-surface-container-highest rounded-full py-md items-center active:bg-surface-container-high transition-colors">
        <Text className="body-sm text-on-surface font-bold">Resume Quiz</Text>
      </StyledPressable>
    </View>
  );
}
