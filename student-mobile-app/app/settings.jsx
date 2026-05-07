import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Image,
  Linking,
  Dimensions,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import BrandingFooter from '@/components/common/BrandingFooter';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function SettingsScreen() {
  const router = useRouter();
  const { section } = useLocalSearchParams();
  const scrollRef = useRef(null);

  const [personalizedAnalysis, setPersonalizedAnalysis] = useState(true);
  const [anonymousResearch, setAnonymousResearch] = useState(false);

  const [sectionPositions, setSectionPositions] = useState({});

  const handleLayout = (name) => (event) => {
    const { y } = event.nativeEvent.layout;
    setSectionPositions(prev => ({ ...prev, [name]: y }));
  };

  useEffect(() => {
    if (section && sectionPositions[section] !== undefined) {
      scrollRef.current?.scrollTo({
        y: sectionPositions[section],
        animated: true
      });
    }
  }, [section, sectionPositions]);

  return (
    <View style={{ flex: 1, backgroundColor: '#121414' }}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' }}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffafd2" />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#ffafd2', marginLeft: 16 }}>Settings</Text>
        </View>

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          {/* SUPPORT SECTION */}
          <View onLayout={handleLayout('support')} style={{ marginTop: 24, marginBottom: 32 }}>
            <Text style={{ fontSize: 12, fontWeight: '800', color: '#a48a93', letterSpacing: 1.5, marginBottom: 16, marginLeft: 4 }}>SUPPORT</Text>

            <TouchableOpacity style={styles.card}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(37, 99, 235, 0.1)' }]}>
                <Ionicons name="help-circle" size={24} color="#2563eb" />
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={styles.cardTitle}>Help Center</Text>
                <Text style={styles.cardSubtitle}>FAQs and troubleshooting</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#52525b" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.card, { marginTop: 12 }]}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(193, 53, 132, 0.1)' }]}>
                <Ionicons name="rocket" size={22} color="#c13584" />
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={styles.cardTitle}>About Dr. Grapes</Text>
                <Text style={styles.cardSubtitle}>Version 2.4.0 • Our Mission</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#52525b" />
            </TouchableOpacity>
          </View>

          {/* PRIVACY & DATA SECTION */}
          <View onLayout={handleLayout('privacy')} style={{ marginBottom: 32 }}>
            <Text style={{ fontSize: 12, fontWeight: '800', color: '#a48a93', letterSpacing: 1.5, marginBottom: 16, marginLeft: 4 }}>PRIVACY & DATA</Text>

            <View style={styles.privacyCard}>
              <View style={styles.privacyBannerContainer}>
                <Image
                  source={require('@/assets/images/privacy_banner.png')}
                  style={styles.privacyBanner}
                  resizeMode="cover"
                />
                <View style={styles.privacyBannerOverlay}>
                  <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Privacy Center</Text>
                </View>
              </View>

              <View style={{ padding: 20 }}>
                <View style={styles.toggleRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>Personalized Analysis</Text>
                    <Text style={styles.cardSubtitle}>Allow Dr. Grapes to show you in the global list of students.</Text>
                  </View>
                  <Switch
                    value={personalizedAnalysis}
                    onValueChange={setPersonalizedAnalysis}
                    trackColor={{ false: '#3f3f46', true: '#c13584' }}
                    thumbColor="white"
                  />
                </View>

                <View style={[styles.toggleRow, { marginTop: 24, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: 24 }]}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>Anonymous Research</Text>
                    <Text style={styles.cardSubtitle}>Share de-identified data to improve clinical models.</Text>
                  </View>
                  <Switch
                    value={anonymousResearch}
                    onValueChange={setAnonymousResearch}
                    trackColor={{ false: '#3f3f46', true: '#c13584' }}
                    thumbColor="white"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* LEGAL SECTION */}
          <View onLayout={handleLayout('legal')} style={{ marginBottom: 40 }}>
            <Text style={{ fontSize: 12, fontWeight: '800', color: '#a48a93', letterSpacing: 1.5, marginBottom: 16, marginLeft: 4 }}>LEGAL</Text>

            <TouchableOpacity style={styles.legalCard} onPress={() => Linking.openURL('https://dr-grapes.ztsolutions.tech/terms')}>
              <Ionicons name="document-text-outline" size={20} color="#a48a93" />
              <Text style={{ flex: 1, color: '#e2e2e2', fontSize: 16, fontWeight: '500', marginLeft: 12 }}>Terms of Service</Text>
              <MaterialIcons name="open-in-new" size={20} color="#52525b" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.legalCard, { marginTop: 12 }]} onPress={() => Linking.openURL('https://dr-grapes.ztsolutions.tech/privacy')}>
              <Ionicons name="shield-outline" size={20} color="#a48a93" />
              <Text style={{ flex: 1, color: '#e2e2e2', fontSize: 16, fontWeight: '500', marginLeft: 12 }}>Privacy Policy</Text>
              <MaterialIcons name="open-in-new" size={20} color="#52525b" />
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <BrandingFooter type="settings" style={{ marginTop: 20 }} />

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e2020',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(164, 138, 147, 0.05)',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#e2e2e2',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardSubtitle: {
    color: '#a48a93',
    fontSize: 13,
  },
  privacyCard: {
    backgroundColor: '#1e2020',
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(164, 138, 147, 0.05)',
  },
  privacyBannerContainer: {
    height: 160,
    position: 'relative',
  },
  privacyBanner: {
    width: '100%',
    height: '100%',
  },
  privacyBannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  legalCard: {
    backgroundColor: '#1e2020',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(164, 138, 147, 0.05)',
  }
});
