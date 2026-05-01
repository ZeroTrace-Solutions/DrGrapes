import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SignupAction({ onPress, onPrevious, label = "Continue", showArrow = true, footerText }) {
  return (
    <View className="mt-xl w-full gap-md">
      <TouchableOpacity 
        onPress={onPress}
        className="w-full h-16 bg-primary-container rounded-full flex-row items-center justify-center gap-sm shadow-lg"
        style={{ shadowColor: '#c13584', shadowOpacity: 0.3, shadowRadius: 30, elevation: 8 }}
      >
        <Text className="text-2xl font-semibold text-on-primary-container">
          {label}
        </Text>
        {showArrow && (
          <MaterialIcons name="arrow-forward" size={24} color="#ffedf2" />
        )}
      </TouchableOpacity>

      {onPrevious && (
        <TouchableOpacity 
          onPress={onPrevious}
          className="w-full h-14 bg-transparent border-2 border-outline-variant rounded-full flex-row items-center justify-center"
        >
          <Text className="text-lg font-semibold text-on-surface">
            Previous Step
          </Text>
        </TouchableOpacity>
      )}
      
      {footerText && (
        <Text className="mt-lg text-center text-sm text-on-surface-variant px-md leading-5">
          {footerText}
        </Text>
      )}
    </View>
  );
}
