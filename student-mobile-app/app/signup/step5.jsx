import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft, FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import LevelPicker from '@/components/signup/LevelPicker';
import SearchablePicker from '@/components/signup/SearchablePicker';
import SignupHeader from '@/components/signup/SignupHeader';
import { useAuth } from '@/context/AuthContext';
import SignupAction from '@/components/signup/SignupAction';
import SignupError from '@/components/signup/SignupError';

export default function SignupStep5() {
  const router = useRouter();
  const {
    updateSignupData,
    completeSignup,
    getUniversities,
    getFaculties,
    isLoading,
    signupData
  } = useAuth();
  const { method } = useLocalSearchParams();
  const isGoogle = method === 'google';

  const [universitiesList, setUniversitiesList] = useState([]);
  const [facultiesList, setFacultiesList] = useState([]);
  const [universityId, setUniversityId] = useState(signupData.universityId || '');
  const [facultyId, setFacultyId] = useState(signupData.facultyId || '');
  const [academicLevel, setAcademicLevel] = useState(signupData.academicLevel || 'FIRST_YEAR');
  const [errors, setErrors] = useState({});

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      const [uRes, fRes] = await Promise.all([
        getUniversities(),
        getFaculties()
      ]);

      if (uRes.data) setUniversitiesList(uRes.data.data);
      if (fRes.data) setFacultiesList(fRes.data.data);
    };
    fetchData();
  }, []);

  const handleFinalize = async () => {
    const newErrors = {};
    if (!universityId) newErrors.universityId = "Please select your university";
    if (!facultyId) newErrors.facultyId = "Please select your faculty";
    if (!academicLevel) newErrors.academicLevel = "Please select your academic level";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // We update local context and pass the final data directly to avoid stale state issues
    const finalSignupData = { ...signupData, universityId, facultyId, academicLevel };
    updateSignupData({ universityId, facultyId, academicLevel });
    setErrors({});

    const { data, error: apiError } = await completeSignup(finalSignupData);

    if (!apiError) {
      router.push('/signup/step6');
    } else {
      setErrors({ api: typeof apiError === 'string' ? apiError : (apiError.message || 'Signup failed') });
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
                  value={universityId}
                  items={universitiesList}
                  onSelect={(id) => {
                    setUniversityId(id);
                    if (errors.universityId) setErrors(prev => ({ ...prev, universityId: null }));
                  }}
                  zIndex={2}
                  error={!!errors.universityId}
                />

                {/* Faculty Searchable Picker */}
                <SearchablePicker
                  label="Select Faculty"
                  placeholder="Search faculty..."
                  value={facultyId}
                  items={facultiesList}
                  onSelect={(id) => {
                    setFacultyId(id);
                    if (errors.facultyId) setErrors(prev => ({ ...prev, facultyId: null }));
                  }}
                  zIndex={1}
                  error={!!errors.facultyId}
                />

                {/* Academic Level */}
                <LevelPicker
                  currentLevel={academicLevel}
                  onLevelSelect={setAcademicLevel}
                />

                {/* Error Message */}
                <SignupError message={Object.values(errors).find(e => e)} />
              </View>
            </ScrollView>

            {/* Fixed Action Bar at the bottom, outside ScrollView */}
            <View className="px-container-margin pb-xl pt-md bg-surface">
              <SignupAction
                onPress={handleFinalize}
                onPrevious={handlePrevious}
                label="Finalize Setup"
                showArrow={false}
                isLoading={isLoading}
              />
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>

    </View>
  );
}
