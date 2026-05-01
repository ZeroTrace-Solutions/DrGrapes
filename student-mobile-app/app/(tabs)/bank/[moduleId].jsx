import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import QuestionBankCard from '@/components/bank/QuestionBankCard';

const MODULES_DATA = {
  'm1': {
    title: 'Basic Sciences',
    subjects: [
      {
        id: 'anatomy',
        category: 'CORE SUBJECT',
        title: 'Anatomy',
        questionsSolved: 420,
        totalQuestions: 500,
        percentage: 84,
        icon: 'leaf',
        status: 'continue'
      },
      {
        id: 'physiology',
        category: 'SYSTEMS',
        title: 'Physiology',
        questionsSolved: 150,
        totalQuestions: 500,
        percentage: 30,
        icon: 'pulse',
        status: 'resume'
      }
    ]
  },
  'm2': {
    title: 'Clinical Rotations',
    subjects: [
      {
        id: 'pathology',
        category: 'CLINICAL',
        title: 'Pathology',
        questionsSolved: 290,
        totalQuestions: 600,
        percentage: 48,
        icon: 'cog',
        status: 'continue'
      },
      {
        id: 'biochemistry',
        category: 'MOLECULAR',
        title: 'Biochemistry',
        questionsSolved: 0,
        totalQuestions: 450,
        percentage: 0,
        icon: 'flask',
        status: 'locked'
      }
    ]
  }
};

export default function SubjectListScreen() {
  const { moduleId } = useLocalSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const currentModule = MODULES_DATA[moduleId] || { title: 'Module', subjects: [] };
  const subjects = currentModule.subjects;

  return (
    <View style={{ flex: 1, backgroundColor: '#121414' }}>
      <StatusBar style="light" />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={{ paddingHorizontal: 20, paddingTop: 20, marginBottom: 32 }}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}
            >
              <Ionicons name="chevron-back" size={24} color="#c13584" />
              <Text style={{ color: '#c13584', fontSize: 16, fontWeight: 'bold', marginLeft: 4 }}>Back to Bank</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#e2e2e2', marginBottom: 4 }}>
              {currentModule.title}
            </Text>
            <Text style={{ fontSize: 18, color: '#dcbfc9', lineHeight: 24 }}>
              Select a subject to view practice sets.
            </Text>
          </View>

          {/* Search Section */}
          <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
            <View style={{
              height: 56,
              backgroundColor: '#1e2020',
              borderRadius: 28,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.05)'
            }}>
              <Ionicons name="search" size={20} color="#71717a" />
              <TextInput
                placeholder="Search subjects..."
                placeholderTextColor="#52525b"
                style={{ flex: 1, marginLeft: 8, color: '#e2e2e2' }}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Subjects List */}
          <View style={{ paddingHorizontal: 20 }}>
            {subjects
              .filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((subject, index) => (
                <QuestionBankCard
                  key={subject.id}
                  {...subject}
                  index={index}
                  isLocked={subject.status === 'locked'}
                  onPress={() => router.push(`/(tabs)/bank/${moduleId}/${subject.id}`)}
                />
              ))}

            {subjects.length === 0 && (
              <View style={{ paddingVertical: 48, alignItems: 'center' }}>
                <Ionicons name="construct-outline" size={64} color="#2f3131" />
                <Text style={{ color: '#dcbfc9', marginTop: 16, fontSize: 16 }}>Coming soon for this module</Text>
              </View>
            )}
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
