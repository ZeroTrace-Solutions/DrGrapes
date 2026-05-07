import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const LEVELS = [
  { id: 'FIRST_YEAR', title: '1st Year', description: 'Just starting', icon: 'school' },
  { id: 'SECOND_YEAR', title: '2nd Year', description: 'Fundamentals', icon: 'menu-book' },
  { id: 'THIRD_YEAR', title: '3rd Year', description: 'Clinical basic', icon: 'local-hospital' },
  { id: 'FOURTH_YEAR', title: '4th Year', description: 'Advanced clinical', icon: 'medical-services' },
  { id: 'FIFTH_YEAR', title: '5th Year', description: 'Final prep', icon: 'psychology' },
  { id: 'GRADUATED', title: 'Graduated', description: 'MD degree', icon: 'verified' },
  { id: 'POSTGRADUATED', title: 'Postgrad', description: 'Specializing', icon: 'workspace-premium' },
  { id: 'MEMBERSHIP', title: 'Membership', description: 'Professional', icon: 'badge' },
];

export default function LevelPicker({ currentLevel, onLevelSelect }) {
  return (
    <View className="w-full gap-md">
      <Text className="text-xs font-bold tracking-widest text-on-surface-variant uppercase ml-1">
        Academic Level
      </Text>
      <View className="flex-row flex-wrap justify-between gap-y-md">
        {LEVELS.map((level) => {
          const isSelected = level.id == currentLevel;
          return (
            <TouchableOpacity
              key={level.id}
              onPress={() => onLevelSelect && onLevelSelect(level.id)}
              activeOpacity={0.8}
              style={{
                width: '48.5%',
                height: 160,
                backgroundColor: isSelected ? '#1e2020' : '#1e2020',
                borderColor: isSelected ? '#c13584' : '#262626',
                borderWidth: 2,
                borderRadius: 40,
                padding: 16,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
              className=""
            >
              {/* Checkmark badge */}
              {isSelected && (
                <View
                  style={{ position: 'absolute', top: 12, right: 12, zIndex: 10 }}
                  className="bg-primary rounded-full p-0.5"
                >
                  <MaterialIcons name="check" size={14} color="white" />
                </View>
              )}

              {/* Icon Circle */}
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: isSelected ? '#c13584' : '#282a2b',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12
                }}
              >
                <MaterialIcons
                  name={level.icon}
                  size={24}
                  color={isSelected ? 'white' : '#a48a93'}
                />
              </View>

              <Text
                className={`text-base font-bold text-center ${isSelected ? 'text-white' : 'text-on-surface'}`}
                numberOfLines={1}
              >
                {level.title}
              </Text>

              <Text
                className={`text-[10px] text-center mt-1 uppercase tracking-tighter ${isSelected ? 'text-white/70' : 'text-on-surface-variant'}`}
                numberOfLines={1}
              >
                {level.description}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
