import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

// Components
import SignupHeader from '@/components/signup/SignupHeader';
import SearchablePicker from '@/components/signup/SearchablePicker';
import LevelPicker from '@/components/signup/LevelPicker';
import SignupAction from '@/components/signup/SignupAction';

const UNIVERSITIES = [
  "Cairo University",
  "Ain Shams University",
  "Alexandria University",
  "Mansoura University",
  "Helwan University",
  "Assiut University",
  "Tanta University"
];

const FACULTIES = [
  "Medicine",
  "Pharmacy",
  "Dentistry",
  "Nursing",
  "Engineering",
  "Science",
  "Commerce",
  "Law"
];

export default function SignupStep6() {
  const router = useRouter();
  const { method } = useLocalSearchParams();
  const isGoogle = method === 'google';

  const [university, setUniversity] = useState('');
  const [faculty, setFaculty] = useState('');
  const [academicLevel, setAcademicLevel] = useState(1);

  const handleFinalize = () => {
    console.log("Finalizing signup:", { university, faculty, academicLevel });
    router.push('/signup/success');
  };

  return (
    <View style={{ flex: 1 }} className="flex-1 bg-transparent relative overflow-hidden">
      <StatusBar style="light" />

      <SafeAreaView style={{ flex: 1 }} className="flex-1">
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <Animated.View
            entering={SlideInRight.duration(400)}
            exiting={SlideOutLeft.duration(300)}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: 120 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Header */}
              <SignupHeader
                title="Academic Background"
                description="Help us personalize your experience by providing your academic details."
              />

              <View className="w-full gap-xl">
                {/* University Searchable Picker */}
                <SearchablePicker 
                  label="Select University"
                  placeholder="Search university..."
                  value={university}
                  items={UNIVERSITIES}
                  onSelect={setUniversity}
                  zIndex={2}
                />

                {/* Faculty Searchable Picker */}
                <SearchablePicker 
                  label="Select Faculty"
                  placeholder="Search faculty..."
                  value={faculty}
                  items={FACULTIES}
                  onSelect={setFaculty}
                  zIndex={1}
                />

                {/* Academic Level */}
                <LevelPicker 
                  currentLevel={academicLevel}
                  onLevelSelect={setAcademicLevel}
                />
              </View>


            </ScrollView>

            {/* CTA Fixed Footer */}
            <View 
              className="absolute bottom-0 left-0 right-0 p-container-margin pb-xl"
              style={{ 
                backgroundColor: 'rgba(18, 20, 20, 0.8)',
                borderTopWidth: 1,
                borderTopColor: 'rgba(255, 255, 255, 0.05)'
              }}
            >
              <TouchableOpacity 
                onPress={handleFinalize}
                style={{ height: 64, borderRadius: 32 }}
                className="w-full bg-primary-container flex-row items-center justify-center gap-sm shadow-lg active:opacity-90"
              >
                <Text className="text-lg font-bold text-white">
                  Finalize Setup
                </Text>
                <MaterialIcons name="celebration" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
