import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft, FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import SignupAction from '@/components/signup/SignupAction';
import SignupHeader from '@/components/signup/SignupHeader';
import SignupInput from '@/components/signup/SignupInput';
import SignupError from '@/components/signup/SignupError';
import { useAuth } from '@/context/AuthContext';

export default function SignupStep3() {
  const router = useRouter();
  const { updateSignupData, isLoading, signupData } = useAuth();
  const { method } = useLocalSearchParams();
  const isGoogle = method === 'google';

  const [fullName, setFullName] = useState(signupData.fullName || '');
  const [dob, setDob] = useState(signupData.dob || '');
  const [gender, setGender] = useState(signupData.gender || null);
  const [errors, setErrors] = useState({});
  const [toastVisible, setToastVisible] = useState(false);

  const handleDobChange = (text) => {
    let clean = text.replace(/[^0-9]/g, '');
    if (clean.length === 1 && parseInt(clean[0]) > 3) clean = '0' + clean;
    if (clean.length === 3 && parseInt(clean[2]) > 1) clean = clean.substring(0, 2) + '0' + clean[2];
    if (clean.length === 4 && clean[2] === '1' && parseInt(clean[3]) > 2) clean = clean.substring(0, 2) + '01' + clean[3];
    let formatted = clean;
    if (clean.length > 2) formatted = clean.substring(0, 2) + ' / ' + clean.substring(2);
    if (clean.length > 4) formatted = formatted.substring(0, 7) + ' / ' + clean.substring(4, 8);
    setDob(formatted.substring(0, 14));
  };

  const handleContinue = async () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Please enter your full name";
    if (dob.length < 14) newErrors.dob = "Please enter a valid date of birth (DD / MM / YYYY)";
    if (!gender) newErrors.gender = "Please select your gender";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setToastVisible(true);
      return;
    }

    setErrors({});

    updateSignupData({ fullName, dob, gender });
    router.push('/signup/step4');
  };

  const handlePrevious = () => {
    router.back();
  };

  const genders = [
    { id: 'male', label: 'Male', icon: 'male' },
    { id: 'female', label: 'Female', icon: 'female' },
  ];

  return (
    <View className="flex-1 bg-transparent relative overflow-hidden">
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
              contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
            >

              {/* Header */}
              <SignupHeader
                title="Personal Details"
                description="Please provide your basic information to help us personalize your medical journey."
              />

              <View className="w-full gap-xl">
                {/* Full Name */}
                <SignupInput
                  label="FULL NAME"
                  placeholder="John Doe"
                  icon="person"
                  value={fullName}
                  onChangeText={(val) => {
                    setFullName(val);
                    if (errors.fullName) setErrors(prev => ({ ...prev, fullName: null }));
                  }}
                  error={!!errors.fullName}
                />

                {/* Date of Birth */}
                <SignupInput
                  label="DATE OF BIRTH"
                  placeholder="DD / MM / YYYY"
                  icon="cake"
                  value={dob}
                  onChangeText={(val) => {
                    handleDobChange(val);
                    if (errors.dob) setErrors(prev => ({ ...prev, dob: null }));
                  }}
                  keyboardType="number-pad"
                  maxLength={14}
                  error={!!errors.dob}
                />

                {/* Gender Selection */}
                <View className="gap-md">
                  <Text className="text-xs font-bold tracking-widest text-on-surface-variant uppercase ml-1">
                    GENDER
                  </Text>
                  <View className="flex-row gap-sm">
                    {genders.map((item) => {
                      const isSelected = gender === item.id;
                      const hasError = !!errors.gender;
                      return (
                        <TouchableOpacity
                          key={item.id}
                          onPress={() => {
                            setGender(item.id);
                            if (errors.gender) setErrors(prev => ({ ...prev, gender: null }));
                          }}
                          style={{
                            backgroundColor: isSelected ? '#c13584' : '#1e2020',
                            borderColor: isSelected ? '#c13584' : (hasError ? '#ffb4ab' : '#262626'),
                            borderWidth: 2,
                          }}
                          className="flex-1 h-14 rounded-full flex-row items-center justify-center gap-xs"
                        >
                          <MaterialIcons
                            name={item.icon}
                            size={20}
                            color={isSelected ? "white" : "#a48a93"}
                          />
                          <Text className={`font-bold ${isSelected ? 'text-white' : 'text-on-surface'}`}>
                            {item.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Error Message */}
                <SignupError message={Object.values(errors).find(e => e)} />
              </View>
            </ScrollView>

            {/* Fixed Action Bar at the bottom, outside ScrollView */}
            <View className="px-container-margin pb-xl pt-md bg-surface">
              <SignupAction
                onPress={handleContinue}
                onPrevious={handlePrevious}
                showArrow={true}
                isLoading={isLoading}
              />
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
