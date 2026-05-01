import { Stack } from 'expo-router';

export default function BankLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false, 
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#121414' }
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[moduleId]" />
      <Stack.Screen name="[moduleId]/[subId]" />
    </Stack>
  );
}
