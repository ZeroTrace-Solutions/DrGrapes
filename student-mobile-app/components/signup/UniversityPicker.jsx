import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function UniversityPicker({ value, onChangeText }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full gap-md">
      <Text className="text-xs font-bold tracking-widest text-tertiary-fixed-dim uppercase">
        Select University
      </Text>
      <View className="relative">
        <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
          <MaterialIcons name="search" size={20} color={isFocused ? "#c13584" : "#a48a93"} />
        </View>
        <TextInput
          style={{
            backgroundColor: '#282a2b',
            borderColor: isFocused ? '#c13584' : 'transparent',
            borderWidth: 2,
            color: '#e2e2e2',
            paddingLeft: 48,
            paddingRight: 48,
            height: 60,
            borderRadius: 30,
            fontSize: 16
          }}
          placeholder="Search university..."
          placeholderTextColor="#564149"
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <View className="absolute right-4 top-0 bottom-0 justify-center z-10">
          <MaterialIcons name="expand-more" size={24} color="#a48a93" />
        </View>
      </View>
    </View>
  );
}
