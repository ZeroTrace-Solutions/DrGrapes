import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function LevelPicker({ currentLevel = 3, onLevelSelect }) {
  const levels = [1, 2, 3, 4, 5];

  return (
    <View className="w-full gap-md">
      <Text className="text-xs font-bold tracking-widest text-tertiary-fixed-dim uppercase">
        Academic Level
      </Text>
      <View className="flex-row justify-between items-center gap-sm">
        {levels.map((level) => {
          const isSelected = level === currentLevel;
          return (
            <TouchableOpacity
              key={level}
              onPress={() => onLevelSelect && onLevelSelect(level)}
              style={{
                backgroundColor: isSelected ? '#c13584' : '#333535',
                borderColor: isSelected ? '#c13584' : '#564149',
                borderWidth: 1,
                shadowColor: isSelected ? '#c13584' : 'transparent',
                shadowOpacity: isSelected ? 0.3 : 0,
                shadowRadius: 15,
                elevation: isSelected ? 5 : 0
              }}
              className="flex-1 h-14 items-center justify-center rounded-full active:opacity-80"
            >
              <Text className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-on-surface'}`}>
                {level}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
