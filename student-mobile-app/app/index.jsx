import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import BrandingFooter from '../components/common/BrandingFooter';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function IntroScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Hide splash screen and start intro animation
    const prepare = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Small buffer
        await SplashScreen.hideAsync();

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();

        // Stay on intro for 2.5 seconds then navigate to login
        setTimeout(() => {
          router.replace('/(login)/login');
        }, 2100);
      } catch (e) {
        console.warn(e);
      }
    };

    prepare();
  }, []);

  return (
    <View style={styles.container} className="bg-transparent">
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Main Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/dr-grapes-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Bottom Branding */}
        <BrandingFooter style={{ marginBottom: 60 }} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});
