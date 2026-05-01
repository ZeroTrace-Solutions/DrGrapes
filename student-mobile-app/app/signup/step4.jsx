import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import SignupAction from '@/components/signup/SignupAction';
import SignupHeader from '@/components/signup/SignupHeader';
import SignupInput from '@/components/signup/SignupInput';

export default function SignupStep4() {
  const router = useRouter();
  const { method } = useLocalSearchParams();
  const isGoogle = method === 'google';

  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState(null);

  const handleDobChange = (text) => {
    // Remove all non-numeric characters
    let clean = text.replace(/[^0-9]/g, '');
    
    // Day logic: if first digit > 3, prefix with 0
    if (clean.length === 1 && parseInt(clean[0]) > 3) {
      clean = '0' + clean;
    }
    
    // Month logic: 
    // 1. If first digit of month (3rd char) > 1, prefix with 0
    if (clean.length === 3 && parseInt(clean[2]) > 1) {
      clean = clean.substring(0, 2) + '0' + clean[2];
    }
    // 2. If month starts with 1 but next digit > 2, it must be month 01 and next is year
    if (clean.length === 4 && clean[2] === '1' && parseInt(clean[3]) > 2) {
      clean = clean.substring(0, 2) + '01' + clean[3];
    }

    let formatted = clean;
    if (clean.length > 2) {
      formatted = clean.substring(0, 2) + ' / ' + clean.substring(2);
    }
    if (clean.length > 4) {
      formatted = formatted.substring(0, 7) + ' / ' + clean.substring(4, 8);
    }
    
    setDob(formatted.substring(0, 14));
  };

  const handleContinue = () => {
    // Basic validation could go here
    const params = new URLSearchParams({
      method: isGoogle ? 'google' : 'email',
      gender: gender || ''
    }).toString();
    
    router.push(`/signup/step5?${params}`);
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
                  onChangeText={setFullName}
                />

                {/* Date of Birth */}
                <SignupInput
                  label="DATE OF BIRTH"
                  placeholder="DD / MM / YYYY"
                  icon="cake"
                  value={dob}
                  onChangeText={handleDobChange}
                  keyboardType="number-pad"
                  maxLength={14}
                />

                {/* Gender Selection */}
                <View className="gap-md">
                  <Text className="text-xs font-bold tracking-widest text-on-surface-variant uppercase ml-1">
                    GENDER
                  </Text>
                  <View className="flex-row gap-sm">
                    {genders.map((item) => {
                      const isSelected = gender === item.id;
                      return (
                        <TouchableOpacity
                          key={item.id}
                          onPress={() => setGender(item.id)}
                          style={{
                            backgroundColor: isSelected ? '#c13584' : '#1e2020',
                            borderColor: isSelected ? '#c13584' : '#262626',
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
              </View>

            </ScrollView>

            {/* Fixed Bottom Action Bar */}
            <View
              className="absolute bottom-0 left-0 right-0 p-container-margin pb-xl"
              style={{
                backgroundColor: 'rgba(18, 20, 20, 0.9)',
                borderTopWidth: 1,
                borderTopColor: 'rgba(255, 255, 255, 0.05)'
              }}
            >
              <SignupAction
                onPress={handleContinue}
                showArrow={true}
              />
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
