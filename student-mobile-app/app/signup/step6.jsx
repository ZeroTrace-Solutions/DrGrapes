import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import LevelPicker from '@/components/signup/LevelPicker';
import SearchablePicker from '@/components/signup/SearchablePicker';
import SignupHeader from '@/components/signup/SignupHeader';
import { useAuth } from '@/context/AuthContext';

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
  const { updateSignupData, completeSignup, isLoading } = useAuth();
  const { method } = useLocalSearchParams();
  const isGoogle = method === 'google';

  const [university, setUniversity] = useState('');
  const [faculty, setFaculty] = useState('');
  const [academicLevel, setAcademicLevel] = useState(1);

  const handleFinalize = async () => {
    updateSignupData({ university, faculty, academicLevel });
    const success = await completeSignup();
    if (success) {
      router.push('/signup/success');
    }
  };

  const handlePrevious = () => {
    router.back();
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
              className="absolute bottom-0 left-0 right-0 p-container-margin pb-xl gap-md"
              style={{
                backgroundColor: 'rgba(18, 20, 20, 0.9)',
                borderTopWidth: 1,
                borderTopColor: 'rgba(255, 255, 255, 0.05)'
              }}
            >
              <TouchableOpacity
                onPress={handleFinalize}
                disabled={isLoading}
                style={{ height: 64, borderRadius: 32 }}
                className={`w-full ${isLoading ? 'bg-primary-container/50' : 'bg-primary-container'} flex-row items-center justify-center gap-sm shadow-lg active:opacity-90`}
              >
                <Text className="text-lg font-bold text-white">
                  {isLoading ? "Finalizing..." : "Finalize Setup"}
                </Text>
                {!isLoading && <MaterialIcons name="celebration" size={24} color="white" />}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handlePrevious}
                disabled={isLoading}
                style={{ height: 56, borderRadius: 28 }}
                className="w-full bg-transparent border-2 border-outline-variant flex-row items-center justify-center"
              >
                <Text className="text-lg font-semibold text-on-surface">
                  Previous Step
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
