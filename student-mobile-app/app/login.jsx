import React from 'react';
import { 
  View, 
  SafeAreaView, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  StyleSheet
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AmbientGlow from '../components/auth/AmbientGlow';
import BrandingHeader from '../components/auth/BrandingHeader';
import LoginForm from '../components/auth/LoginForm';
import SocialLogin from '../components/auth/SocialLogin';
import SignupFooter from '../components/auth/SignupFooter';
import DecorativeBento from '../components/auth/DecorativeBento';

export default function LoginScreen() {
  return (
    <View style={styles.container} className="bg-background relative overflow-hidden">
      <StatusBar style="light" />
      
      {/* Background Decorations */}
      <AmbientGlow />

      <SafeAreaView style={styles.flex1}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex1}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Wrapper to center content horizontally while allowing children to stretch */}
            <View style={styles.contentWrapper}>
              {/* Branding Header */}
              <BrandingHeader />

              {/* Login Container (Glass Card Effect) */}
              <View className="w-full bg-surface-container/70 rounded-lg p-lg border border-white/5 shadow-2xl">
                <LoginForm />
                <SocialLogin />
              </View>

              {/* Signup Footer */}
              <SignupFooter />

              {/* Bottom Graphic (Decorative Element) */}
              <DecorativeBento />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  contentWrapper: {
    width: '100%',
    alignItems: 'center',
    gap: 20, // Add gap between main sections
  }
});
