import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfessionalLevelGrid({ selectedLevel = "Fellow", onLevelSelect }) {
  const levels = [
    { id: "Resident", label: "Resident", icon: "school" },
    { id: "Fellow", label: "Fellow", icon: "workspace_premium", filled: true },
    { id: "Intern", label: "Intern", icon: "medical-services" },
    { id: "Attending", label: "Attending", icon: "stethoscope" }
  ];

  return (
    <View className="w-full gap-md">
      <Text className="text-xs font-bold tracking-widest text-tertiary-fixed-dim uppercase">
        Current Level
      </Text>
      <View className="flex-row flex-wrap gap-md">
        {levels.map((level) => {
          const isSelected = level.id === selectedLevel;
          return (
            <TouchableOpacity
              key={level.id}
              onPress={() => onLevelSelect && onLevelSelect(level.id)}
              style={{
                width: '47%',
                backgroundColor: '#333535',
                borderColor: isSelected ? '#c13584' : '#564149',
                borderWidth: isSelected ? 2 : 1,
                shadowColor: isSelected ? '#c13584' : 'transparent',
                shadowOpacity: isSelected ? 0.2 : 0,
                shadowRadius: 15,
                elevation: isSelected ? 4 : 0
              }}
              className="p-xl rounded-lg items-center justify-center active:opacity-80"
            >
              <View 
                style={{
                  backgroundColor: isSelected ? '#c13584' : 'rgba(193, 53, 132, 0.1)',
                  shadowColor: isSelected ? '#c13584' : 'transparent',
                  shadowOpacity: isSelected ? 0.4 : 0,
                  shadowRadius: 20
                }}
                className="w-12 h-12 rounded-full items-center justify-center mb-md"
              >
                <MaterialIcons 
                  name={level.icon} 
                  size={24} 
                  color={isSelected ? "white" : "#ffafd2"} 
                />
              </View>
              <Text className="text-lg font-bold text-on-surface text-center">
                {level.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
