import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useRef } from 'react';
import { useTabBarVisibility } from '../_layout';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MODULES = [
  {
    id: 'm1',
    title: 'Basic Sciences',
    description: 'Anatomy, Physiology, Biochemistry & more.',
    count: '12 Subjects',
    icon: 'flask',
    color: '#c13584',
    progress: 45,
    isHero: true
  },
  {
    id: 'm2',
    title: 'Clinical Rotations',
    description: 'Internal Med, Surgery, Peds, etc.',
    count: '8 Subjects',
    icon: 'medical',
    color: '#0d36c3',
    progress: 12
  },
  {
    id: 'm3',
    title: 'Internal Medicine',
    description: 'Diagnosis & long-term management.',
    count: '15 Subjects',
    icon: 'body',
    color: '#ad2274',
    progress: 0
  },
  {
    id: 'm4',
    title: 'Surgery',
    description: 'Operative procedures & surgical care.',
    count: '10 Subjects',
    icon: 'cut',
    color: '#3b82f6',
    progress: 0
  },
  {
    id: 'm5',
    title: 'Pediatrics',
    description: 'Child health & developmental medicine.',
    count: '6 Subjects',
    icon: 'happy',
    color: '#8b5cf6',
    progress: 0
  },
  {
    id: 'm6',
    title: 'OB/GYN',
    description: 'Women health & reproductive sciences.',
    count: '7 Subjects',
    icon: 'woman',
    color: '#ec4899',
    progress: 0
  }
];

export default function ModuleListScreen() {
  const router = useRouter();
  const { show, hide } = useTabBarVisibility();
  const lastScrollY = useRef(0);

  const onScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const diff = currentScrollY - lastScrollY.current;
    
    if (Math.abs(diff) < 20 || currentScrollY < 10) return;

    if (diff > 0 && currentScrollY > 80) {
      hide();
    } else if (diff < -15) {
      show();
    }
    lastScrollY.current = currentScrollY;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#121414' }}>
      <StatusBar style="light" />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Header */}
          <View style={{ paddingHorizontal: 24, paddingTop: 20, marginBottom: 40 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <View>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#c13584', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>
                  Question Bank
                </Text>
                <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#e2e2e2' }}>
                  Curriculum
                </Text>
              </View>
              <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
                <Ionicons name="search" size={24} color="#e2e2e2" />
              </View>
            </View>

            <View style={{
              backgroundColor: 'rgba(193, 53, 132, 0.1)',
              borderRadius: 24,
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'rgba(193, 53, 132, 0.2)'
            }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#c13584', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                <Ionicons name="stats-chart" size={20} color="white" />
              </View>
              <View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Overall Mastery</Text>
                <Text style={{ color: '#dcbfc9', fontSize: 14 }}>You have solved 1,240 questions</Text>
              </View>
              <Text style={{ marginLeft: 'auto', fontSize: 24, fontWeight: 'bold', color: '#c13584' }}>24%</Text>
            </View>
          </View>

          {/* Module Sections */}
          <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 20, letterSpacing: 0.5 }}>
              Active Learning
            </Text>

            {MODULES.map((module) => {
              if (module.isHero) {
                return (
                  <TouchableOpacity
                    key={module.id}
                    activeOpacity={0.9}
                    onPress={() => router.push(`/(tabs)/bank/${module.id}`)}
                    style={{
                      width: '100%',
                      backgroundColor: '#1e2020',
                      borderRadius: 32,
                      padding: 24,
                      marginBottom: 24,
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      overflow: 'hidden'
                    }}
                  >
                    <View style={{ position: 'absolute', top: -30, right: -30, opacity: 0.1 }}>
                      <Ionicons name={module.icon} size={200} color={module.color} />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                      <View style={{ width: 56, height: 56, borderRadius: 20, backgroundColor: module.color, alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                        <Ionicons name={module.icon} size={28} color="white" />
                      </View>
                      <View>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>{module.title}</Text>
                        <Text style={{ fontSize: 14, color: '#dcbfc9' }}>{module.count}</Text>
                      </View>
                    </View>

                    <Text style={{ fontSize: 15, color: '#dcbfc9', lineHeight: 22, marginBottom: 24, maxWidth: '80%' }}>
                      {module.description}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>Progress</Text>
                      <Text style={{ color: module.color, fontWeight: 'bold' }}>{module.progress}%</Text>
                    </View>
                    <View style={{ height: 8, width: '100%', backgroundColor: '#121414', borderRadius: 4, overflow: 'hidden' }}>
                      <View style={{ height: '100%', width: `${module.progress}%`, backgroundColor: module.color, borderRadius: 4 }} />
                    </View>
                  </TouchableOpacity>
                );
              }
              return null;
            })}

            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 20, marginTop: 12, letterSpacing: 0.5 }}>
              All Specialties
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {MODULES.filter(m => !m.isHero).map((module) => (
                <TouchableOpacity
                  key={module.id}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/(tabs)/bank/${module.id}`)}
                  style={{
                    width: (SCREEN_WIDTH - 60) / 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 24,
                    padding: 20,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                    minHeight: 160,
                    justifyContent: 'space-between'
                  }}
                >
                  <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                    <Ionicons name={module.icon} size={22} color={module.color} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', marginBottom: 2 }}>{module.title}</Text>
                    <Text style={{ fontSize: 12, color: '#dcbfc9' }}>{module.count}</Text>
                  </View>

                  {module.progress > 0 ? (
                    <View style={{ height: 4, width: '100%', backgroundColor: '#121414', borderRadius: 2, marginTop: 12 }}>
                      <View style={{ height: '100%', width: `${module.progress}%`, backgroundColor: module.color, borderRadius: 2 }} />
                    </View>
                  ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                      <Ionicons name="lock-closed" size={12} color="#52525b" />
                      <Text style={{ fontSize: 10, color: '#52525b', marginLeft: 4, fontWeight: 'bold', textTransform: 'uppercase' }}>Not Started</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
