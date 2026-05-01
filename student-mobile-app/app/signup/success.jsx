import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

export default function SignupSuccess() {
  const router = useRouter();

  // Animation values
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);
  const bounce = useSharedValue(0);
  const spin = useSharedValue(0);

  useEffect(() => {
    // Initial entry animation
    scale.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.back(1.5)) });
    opacity.value = withTiming(1, { duration: 800 });

    // Continuous bounce/pulse
    bounce.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 1500, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    );

    // Spinner for the redirect text
    spin.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    );

    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: bounce.value }
    ],
    opacity: opacity.value
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        translateY: interpolate(
          opacity.value,
          [0, 1],
          [20, 0]
        )
      }
    ]
  }));

  const animatedSpinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value}deg` }]
  }));

  return (
    <View className="flex-1 bg-transparent items-center justify-center relative overflow-hidden">
      <StatusBar style="light" />

      {/* Main Content Bubble */}
      <View className="items-center text-center px-container-margin">
        {/* Animated Checkmark Circle */}
        <Animated.View style={[styles.outerCircle, animatedCircleStyle]}>
          <View style={styles.innerCircle}>
            <MaterialIcons name="check" size={70} color="white" />
          </View>
        </Animated.View>

        {/* Text Cluster */}
        <Animated.View
          style={animatedTextStyle}
          className="mt-xl gap-md items-center"
        >
          <Text className="text-3xl font-bold text-on-surface tracking-tight">
            Welcome to the Circle
          </Text>
          <Text className="text-base text-on-surface-variant text-center max-w-[280px] leading-6">
            Your professional journey starts now. We've prepared everything for you.
          </Text>
        </Animated.View>
      </View>

      {/* Redirecting Indicator */}
      <View className="absolute bottom-12 items-center gap-sm opacity-60">
        <View className="flex-row items-center gap-xs">
          <Animated.View style={animatedSpinStyle}>
            <MaterialIcons name="refresh" size={16} color="#e2e2e2" />
          </Animated.View>
          <Text className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            Redirecting to your dashboard...
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(40, 42, 43, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#c13584',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
    elevation: 20,
  },
  innerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#c13584',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#c13584',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 15,
  }
});
