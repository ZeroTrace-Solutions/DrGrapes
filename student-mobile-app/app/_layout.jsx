import AmbientGlow from "@/components/login/AmbientGlow";
import SignupProgressBar from "@/components/signup/SignupProgressBar";
import "@/global.css";
import { Stack, useGlobalSearchParams, usePathname } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  const pathname = usePathname();
  const { method } = useGlobalSearchParams();

  const isSignupFlow = pathname.startsWith('/signup/') && !pathname.includes('success');
  const stepMatch = pathname.match(/step(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1], 10) : 1;
  const isGoogle = method === 'google';

  // Total steps logic: 4 if Google, 6 if email
  const totalSteps = isGoogle ? 4 : 6;

  // Logic to map the actual file steps (1-6) to the displayed steps for Google
  const displayStep = isGoogle
    ? (currentStep === 1 ? 1 : (currentStep === 4 ? 2 : (currentStep === 5 ? 3 : 4)))
    : currentStep;

  // Title mapping
  const stepTitles = {
    1: "JOIN THE CIRCLE",
    2: "PASSWORD",
    3: "VERIFICATION",
    4: "PERSONAL INFO",
    5: "PROFILE SETUP",
    6: "ACADEMIC BACKGROUND"
  };

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-surface-dim">
        <AmbientGlow />

        {isSignupFlow && (
          <SafeAreaView edges={['top']} className="px-md bg-transparent">
            <SignupProgressBar
              currentStep={displayStep}
              totalSteps={totalSteps}
              title={stepTitles[currentStep] || "SIGNUP"}
            />
          </SafeAreaView>
        )}

        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: 'transparent' }
          }}
        />
      </View>
    </SafeAreaProvider>
  );
}
