import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, Alert } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';

// Components
import SignupAction from '@/components/signup/SignupAction';
import SignupHeader from '@/components/signup/SignupHeader';
import SignupPhotoUpload from '@/components/signup/SignupPhotoUpload';
import SignupUsernameInput from '@/components/signup/SignupUsernameInput';

export default function SignupStep5() {
  const router = useRouter();
  const { updateSignupData } = useAuth();
  const { method, gender } = useLocalSearchParams();
  const isGoogle = method === 'google';

  const [username, setUsername] = useState('iamjimmy');
  const [imageUri, setImageUri] = useState(null);

  const handlePickImage = async () => {
    Alert.alert(
      "Profile Photo",
      "Choose a photo from your gallery or take a new one",
      [
        {
          text: "Camera",
          onPress: takePhoto,
        },
        {
          text: "Gallery",
          onPress: pickImage,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "We need camera access to take a profile photo.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    updateSignupData({ username, profileImage: imageUri });
    
    const params = new URLSearchParams({
      method: isGoogle ? 'google' : 'email',
      gender: gender || ''
    }).toString();
    router.push(`/signup/step6?${params}`);
  };

  const handlePrevious = () => {
    router.back();
  };

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
                title="Choose your look"
                description="Set up your profile identity. Your photo and username will be visible to the community."
              />

              {/* Profile Photo */}
              <SignupPhotoUpload 
                gender={gender} 
                imageUri={imageUri}
                onPickImage={handlePickImage}
              />

              {/* Username Section */}
              <View className="w-full gap-lg">
                <SignupUsernameInput
                  value={username}
                  onChangeText={setUsername}
                  isAvailable={true}
                />

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
                onPrevious={handlePrevious}
                showArrow={true}
              />
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
