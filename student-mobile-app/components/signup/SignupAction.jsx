import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SignupAction({ 
  onPress, 
  onPrevious, 
  label = "Continue", 
  showArrow = true, 
  footerText, 
  isLoading = false 
}) {
  return (
    <View className="w-full">
      <View className="flex-row items-center justify-between w-full">
        {/* Previous Button Bubble */}
        <View style={{ width: 64 }}>
          {onPrevious && (
            <TouchableOpacity
              onPress={onPrevious}
              disabled={isLoading}
              className="w-14 h-14 rounded-full bg-surface-container border-2 border-outline-variant items-center justify-center"
              style={{ 
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 4
              }}
            >
              <MaterialIcons name="arrow-back" size={24} color="#a48a93" />
            </TouchableOpacity>
          )}
        </View>

        {/* Continue Button Bubble */}
        <TouchableOpacity
          onPress={onPress}
          disabled={isLoading}
          className={`${isLoading ? 'bg-primary-container/70' : 'bg-primary-container'} h-14 px-8 rounded-full flex-row items-center justify-center gap-sm`}
          style={{ 
            shadowColor: '#c13584',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 8,
            minWidth: 140
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffedf2" size="small" />
          ) : (
            <>
              <Text className="text-lg font-bold text-on-primary-container tracking-wide">
                {label}
              </Text>
              {showArrow && (
                <MaterialIcons name="chevron-right" size={24} color="#ffedf2" />
              )}
            </>
          )}
        </TouchableOpacity>
      </View>

      {footerText && (
        <Text className="mt-md text-center text-xs text-on-surface-variant px-md leading-4 opacity-60">
          {footerText}
        </Text>
      )}
    </View>
  );
}
