import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SignupUsernameInput({ value, onChangeText, isAvailable = true }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full gap-sm">
      <Text className="font-bold text-xs text-on-surface-variant ml-4 uppercase tracking-widest">
        Unique Username
      </Text>
      <View className="relative">
        <View className="absolute left-5 top-0 bottom-0 justify-center z-10">
          <MaterialIcons name="alternate-email" size={20} color="#c13584" />
        </View>
        <TextInput
          style={{
            backgroundColor: '#282a2b',
            borderColor: isFocused ? '#405DE6' : 'transparent',
            borderWidth: 2,
            color: '#e2e2e2',
            paddingLeft: 56,
            paddingRight: 100,
            height: 64,
            borderRadius: 32,
            fontSize: 16
          }}
          placeholder="yourname"
          placeholderTextColor="#dcbfc9"
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
        />
        {value.length > 0 && (
          <View className="absolute right-6 top-0 bottom-0 flex-row items-center gap-xs">
            <MaterialIcons 
              name={isAvailable ? "check-circle" : "cancel"} 
              size={14} 
              color={isAvailable ? "#22c55e" : "#ef4444"} 
            />
            <Text 
              style={{ fontSize: 10 }}
              className={`font-bold uppercase ${isAvailable ? 'text-green-500' : 'text-red-500'}`}
            >
              {isAvailable ? 'AVAILABLE' : 'TAKEN'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
