import React from 'react';
import { View, Text } from 'react-native';

export default function SignupProgressBar({ currentStep = 1, totalSteps = 5, title = "JOIN THE CIRCLE" }) {
  return (
    <View className="mb-xl pt-md">
      <View className="flex-row justify-between items-center mb-sm">
        <Text className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">
          STEP {currentStep} OF {totalSteps}
        </Text>
        <Text className="text-xs font-bold tracking-widest text-primary-container uppercase">
          {title}
        </Text>
      </View>
      <View className="flex-row gap-sm w-full">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <View 
            key={i}
            className={`flex-1 h-1.5 rounded-full ${i < currentStep ? 'bg-primary-container' : 'bg-surface-container-highest'}`}
            style={i < currentStep ? { shadowColor: '#c13584', shadowOpacity: 0.4, shadowRadius: 10, elevation: 5 } : {}}
          />
        ))}
      </View>
    </View>
  );
}
