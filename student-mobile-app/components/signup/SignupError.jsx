import React from 'react';
import { Text } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

export default function SignupError({ message, visible = true }) {
  if (!visible || !message) return null;

  return (
    <Animated.View 
      entering={FadeInUp.duration(400)}
      exiting={FadeOutDown.duration(300)}
      className="bg-error/10 border border-error/20 rounded-xl p-md flex-row items-center gap-sm mt-4"
    >
      <MaterialIcons name="error-outline" size={18} color="#ffb4ab" />
      <Text className="text-error text-xs font-medium flex-1">
        {message}
      </Text>
    </Animated.View>
  );
}
