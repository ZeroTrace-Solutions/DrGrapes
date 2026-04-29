import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

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

        // Stay on intro for 2.5 seconds then navigate
        setTimeout(() => {
          router.replace('/(tabs)');
        }, 2500);
      } catch (e) {
        console.warn(e);
      }
    };

    prepare();
  }, []);

  return (
    <View style={styles.container} className="bg-background">
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Main Logo */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/dr-grapes-logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Bottom Branding */}
        <View style={styles.footer}>
          <Text style={styles.fromText} className="text-on-surface-variant">from</Text>
          <View style={styles.brandingRow}>
            <Image 
              source={require('../assets/images/zt-solutions-icon.png')} 
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.ztText} className="text-on-surface">
              <Text style={styles.bold}>ZT</Text>Solutions
            </Text>
          </View>
        </View>
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
  footer: {
    marginBottom: 60,
    alignItems: 'center',
  },
  fromText: {
    fontSize: 14,
    marginBottom: 8,
    letterSpacing: 1,
    textTransform: 'lowercase',
  },
  brandingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  ztText: {
    fontSize: 20,
    letterSpacing: 0.5,
  },
  bold: {
    fontWeight: 'bold',
  },
});
