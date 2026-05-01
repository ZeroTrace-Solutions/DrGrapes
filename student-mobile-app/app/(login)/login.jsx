import BrandingHeader from '@/components/login/BrandingHeader';
import LoginForm from '@/components/login/LoginForm';
import SignupFooter from '@/components/login/SignupFooter';
import SocialLogin from '@/components/login/SocialLogin';
import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function LoginScreen() {
  return (
    <View style={styles.container} className="bg-transparent relative overflow-hidden">
      <StatusBar style="light" />

      <SafeAreaView style={styles.flex1}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex1}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View 
              entering={SlideInRight.duration(400)}
              exiting={SlideOutLeft.duration(300)}
              style={styles.contentWrapper}
            >
              {/* Branding Header */}
              <BrandingHeader />

              {/* Login Container (Glass Card Effect) */}
              <View className="w-full bg-surface-container/70 rounded-lg p-lg border border-white/5 shadow-2xl">
                <LoginForm />
                <SocialLogin />
              </View>

              {/* Signup Footer */}
              <SignupFooter />

            </Animated.View>
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
