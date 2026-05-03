import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getPasswordStrength } from '@shared/utils/validation';

export default function PasswordChecklist({ password }) {
  const strength = getPasswordStrength(password);

  const checks = [
    { key: 'length', label: '8+ characters', met: strength.length },
    { key: 'casing', label: 'Upper & Lowercase', met: strength.casing },
    { key: 'number', label: 'At least one number', met: strength.number },
    { key: 'special', label: 'Special character', met: strength.special },
  ];

  return (
    <View className="gap-xs px-sm mt-sm">
      <View className="flex-row flex-wrap gap-x-md gap-y-xs">
        {checks.map((item) => (
          <View key={item.key} className="flex-row items-center gap-xs">
            <MaterialIcons 
              name={item.met ? "check-circle" : "radio-button-unchecked"} 
              size={12} 
              color={item.met ? "#4ADE80" : "#52525b"} 
            />
            <Text className={`text-[10px] font-bold uppercase tracking-wider ${item.met ? 'text-green-400' : 'text-on-surface-variant/50'}`}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
