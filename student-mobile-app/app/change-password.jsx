import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  ActivityIndicator,
  Alert
} from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { validatePassword, validateConfirmPassword } from '@shared/utils/validation';
import PasswordChecklist from '@/components/common/PasswordChecklist';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const { changePassword, isLoading } = useAuth();
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [isOldFocused, setIsOldFocused] = useState(false);
  const [isNewFocused, setIsNewFocused] = useState(false);
  const [isConfirmFocused, setIsConfirmFocused] = useState(false);
  
  const [error, setError] = useState(null);

  const handleChangePassword = async () => {
    setError(null);

    if (!oldPassword) {
      setError("Please enter your current password");
      return;
    }

    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      return;
    }

    const confirmValidation = validateConfirmPassword(newPassword, confirmPassword);
    if (!confirmValidation.isValid) {
      setError(confirmValidation.message);
      return;
    }

    const { error: apiError } = await changePassword(oldPassword, newPassword);

    if (!apiError) {
      Alert.alert(
        "Success", 
        "Your password has been changed successfully.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    } else {
      setError(apiError);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#121414' }}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, padding: 24 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
              <TouchableOpacity 
                onPress={() => router.back()}
                style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' }}
              >
                <MaterialIcons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 16 }}>Security</Text>
            </View>

            <View style={{ marginBottom: 40 }}>
              <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white', marginBottom: 12 }}>
                Update Password
              </Text>
              <Text style={{ fontSize: 16, color: '#a48a93', lineHeight: 24 }}>
                Enter your current password and choose a new strong one.
              </Text>
            </View>

            {/* Current Password Field */}
            <View style={{ gap: 12, marginBottom: 24 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', tracking: 1.2, color: '#a48a93', marginLeft: 16 }}>CURRENT PASSWORD</Text>
              <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                borderRadius: 32, 
                backgroundColor: '#1e2020', 
                borderWidth: 2, 
                borderColor: isOldFocused ? '#2563eb' : 'transparent',
                paddingHorizontal: 20,
                height: 64
              }}>
                <MaterialIcons name="lock-outline" size={20} color={isOldFocused ? "#2563eb" : "#52525b"} style={{ marginRight: 12 }} />
                <TextInput
                  style={{ flex: 1, color: 'white', fontSize: 16 }}
                  placeholder="••••••••"
                  placeholderTextColor="#52525b"
                  secureTextEntry={!showOldPassword}
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  onFocus={() => setIsOldFocused(true)}
                  onBlur={() => setIsOldFocused(false)}
                />
                <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)}>
                  <MaterialIcons name={showOldPassword ? "visibility" : "visibility-off"} size={20} color="#52525b" />
                </TouchableOpacity>
              </View>
            </View>

            {/* New Password Field */}
            <View style={{ gap: 12, marginBottom: 20 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', tracking: 1.2, color: '#a48a93', marginLeft: 16 }}>NEW PASSWORD</Text>
              <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                borderRadius: 32, 
                backgroundColor: '#1e2020', 
                borderWidth: 2, 
                borderColor: isNewFocused ? '#2563eb' : 'transparent',
                paddingHorizontal: 20,
                height: 64
              }}>
                <MaterialIcons name="lock-reset" size={20} color={isNewFocused ? "#2563eb" : "#52525b"} style={{ marginRight: 12 }} />
                <TextInput
                  style={{ flex: 1, color: 'white', fontSize: 16 }}
                  placeholder="••••••••"
                  placeholderTextColor="#52525b"
                  secureTextEntry={!showNewPassword}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  onFocus={() => setIsNewFocused(true)}
                  onBlur={() => setIsNewFocused(false)}
                />
                <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                  <MaterialIcons name={showNewPassword ? "visibility" : "visibility-off"} size={20} color="#52525b" />
                </TouchableOpacity>
              </View>
              <PasswordChecklist password={newPassword} />
            </View>

            {/* Confirm Password Field */}
            <View style={{ gap: 12, marginBottom: 32 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', tracking: 1.2, color: '#a48a93', marginLeft: 16 }}>CONFIRM NEW PASSWORD</Text>
              <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                borderRadius: 32, 
                backgroundColor: '#1e2020', 
                borderWidth: 2, 
                borderColor: isConfirmFocused ? '#2563eb' : 'transparent',
                paddingHorizontal: 20,
                height: 64
              }}>
                <MaterialIcons name="check-circle-outline" size={20} color={isConfirmFocused ? "#2563eb" : "#52525b"} style={{ marginRight: 12 }} />
                <TextInput
                  style={{ flex: 1, color: 'white', fontSize: 16 }}
                  placeholder="••••••••"
                  placeholderTextColor="#52525b"
                  secureTextEntry={!showNewPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setIsConfirmFocused(true)}
                  onBlur={() => setIsConfirmFocused(false)}
                />
              </View>
            </View>

            {/* Error Message */}
            {error && (
              <Animated.View 
                entering={FadeInUp.duration(400)}
                exiting={FadeOutDown.duration(300)}
                style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)', borderWidth: 1, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 }}
              >
                <MaterialIcons name="error-outline" size={20} color="#ffb4ab" />
                <Text style={{ color: '#ffb4ab', fontSize: 14, flex: 1 }}>{error}</Text>
              </Animated.View>
            )}

            <TouchableOpacity 
              onPress={handleChangePassword}
              disabled={isLoading}
              style={{ 
                height: 64, 
                borderRadius: 32, 
                backgroundColor: isLoading ? 'rgba(37, 99, 235, 0.5)' : '#2563eb',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 12,
                shadowColor: '#2563eb',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8,
                marginTop: 20
              }}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Update Password</Text>
                  <MaterialIcons name="check" size={24} color="white" />
                </>
              )}
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
