import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import SignupProgressBar from '../../components/signup/SignupProgressBar';
import SignupHeader from '../../components/signup/SignupHeader';
import UniversityPicker from '../../components/signup/UniversityPicker';
import LevelPicker from '../../components/signup/LevelPicker';
import ProfessionalLevelGrid from '../../components/signup/ProfessionalLevelGrid';
import AmbientGlow from '../../components/auth/AmbientGlow';
import { MaterialIcons } from '@expo/vector-icons';

export default function SignupStep5() {
  const router = useRouter();
  const { method } = useLocalSearchParams();
  const isGoogle = method === 'google';

  const [university, setUniversity] = useState('Harvard');
  const [academicLevel, setAcademicLevel] = useState(3);
  const [professionalLevel, setProfessionalLevel] = useState('Fellow');

  const handleFinalize = () => {
    // Complete signup and go to success screen
    router.replace('/signup/success');
  };

  return (
    <View className="flex-1 bg-surface-dim relative overflow-hidden">
      <StatusBar style="light" />
      
      {/* Decorative Glows */}
      <AmbientGlow />

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Progress & Header */}
            <SignupProgressBar 
              currentStep={isGoogle ? 3 : 5} 
              totalSteps={isGoogle ? 3 : 5} 
              title={isGoogle ? "FINAL STEP" : "Academic Background"} 
            />

            <SignupHeader 
              title="Academic Background"
              description="Complete your profile to join the medical community."
            />

            {/* University Selection */}
            <UniversityPicker 
              value={university}
              onChangeText={setUniversity}
            />

            {/* Academic Level Picker */}
            <View className="mt-xl">
              <LevelPicker 
                currentLevel={academicLevel}
                onLevelSelect={setAcademicLevel}
              />
            </View>

            {/* Professional Level Grid */}
            <View className="mt-xl">
              <ProfessionalLevelGrid 
                selectedLevel={professionalLevel}
                onLevelSelect={setProfessionalLevel}
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
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
