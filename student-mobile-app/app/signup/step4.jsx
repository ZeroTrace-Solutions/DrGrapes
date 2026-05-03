import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, Alert, TouchableOpacity, Text } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft, FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';

// Components
import SignupAction from '@/components/signup/SignupAction';
import SignupHeader from '@/components/signup/SignupHeader';
import SignupPhotoUpload from '@/components/signup/SignupPhotoUpload';
import SignupUsernameInput from '@/components/signup/SignupUsernameInput';
import SignupError from '@/components/signup/SignupError';

export default function SignupStep4() {
  const router = useRouter();
  const { updateSignupData, signupData, suggestUsernames, checkUsername, isLoading } = useAuth();
  const { method, gender } = useLocalSearchParams();
  const isGoogle = method === 'google';

  const [username, setUsername] = useState(signupData.username || '');
  const [isAvailable, setIsAvailable] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [isInitiallyLoading, setIsInitiallyLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [imageUri, setImageUri] = useState(signupData.profileImage || null);
  const [errors, setErrors] = useState({});

  // Fetch suggestions on mount
  React.useEffect(() => {
    const fetchSuggestions = async () => {
      const { data, error } = await suggestUsernames(signupData.fullName, signupData.email);
      const usernames = data?.data?.usernames || [];
      if (usernames && !error) {
        setSuggestions(usernames);
        if (usernames.length > 0) {
          setUsername(usernames[0]);
        }
      }
      setIsInitiallyLoading(false);
    };
    fetchSuggestions();
  }, []);

  // Check availability when username changes
  React.useEffect(() => {
    if (!username || username.length < 3) return;

    const timeout = setTimeout(async () => {
      setIsChecking(true);
      setErrors({});
      const { data, error: apiError } = await checkUsername(username);
      const isAvailable = data?.data?.isAvailable || false;
      if (!apiError) {
        setIsAvailable(isAvailable);
      } else {
        setErrors({ username: apiError.message });
      }
      setIsChecking(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [username]);

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
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Please choose a username";
    if (!isAvailable) newErrors.username = "This username is already taken. Please try another one.";
    if (username.length < 3) newErrors.username = "Username must be at least 3 characters long";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    updateSignupData({ username, profileImage: imageUri });

    const params = new URLSearchParams({
      method: isGoogle ? 'google' : 'email',
      gender: gender || ''
    }).toString();
    router.push(`/signup/step5?${params}`);
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
                  onChangeText={(val) => {
                    setUsername(val);
                    if (errors.username) setErrors(prev => ({ ...prev, username: null }));
                  }}
                  isAvailable={isAvailable}
                  isLoading={isChecking}
                  error={!!errors.username}
                />

                {suggestions.length > 0 && (
                  <View className="flex-row flex-wrap gap-sm mt-2">
                    {suggestions.map((s) => (
                      <TouchableOpacity
                        key={s}
                        onPress={() => setUsername(s)}
                        className="px-3 py-1.5 rounded-full border border-outline-variant bg-surface-container"
                      >
                        <Text className="text-xs font-medium text-primary">@{s}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

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
                isLoading={isInitiallyLoading || isLoading}
              />
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>

    </View>
  );
}
