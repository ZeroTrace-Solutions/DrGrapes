import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
  ScrollView,
  Text, 
  TouchableOpacity, 
  View,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

const QUESTIONS = [
  {
    id: '1042',
    text: 'Injury to the long thoracic nerve would most likely result in which of the following clinical presentations?',
    options: [
      { id: 'A', text: 'Weakness in initiating abduction of the arm' },
      { id: 'B', text: 'Winging of the scapula', isCorrect: true },
      { id: 'C', text: 'Loss of sensation over the lateral forearm' },
      { id: 'D', text: 'Inability to flex the wrist' }
    ],
    personalNote: 'Long thoracic nerve innervates serratus anterior. Serratus anterior holds the scapula against the thoracic wall. Remember: "C5-C6-C7 raise your wings to heaven!"',
    correctRate: '84%',
    isBookmarked: false
  },
  {
    id: '1085',
    text: 'The radial nerve provides motor innervation to all of the following muscles EXCEPT:',
    options: [
      { id: 'A', text: 'Triceps brachii' },
      { id: 'B', text: 'Brachioradialis' },
      { id: 'C', text: 'Brachialis', isCorrect: true },
      { id: 'D', text: 'Extensor carpi radialis longus' }
    ],
    correctRate: '62%',
    isBookmarked: true
  }
];

export default function QuestionScreen() {
  const { moduleId, subId } = useLocalSearchParams();
  const router = useRouter();

  // Mapping subId to a display title
  const displayTitle = subId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Upper Limb & Plexus';

  return (
    <View style={{ flex: 1, backgroundColor: '#121414' }}>
      <StatusBar style="light" />
      
      <SafeAreaView style={{ flex: 1, backgroundColor: '#121414' }}>
        {/* Custom Header */}
        <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
          >
            <Ionicons name="arrow-back" size={24} color="#c13584" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#c13584', marginLeft: 12 }}>
            {moduleId === 'm1' ? 'Anatomy' : 'Subject'}
          </Text>
        </View>

        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Section Title */}
          <View style={{ paddingHorizontal: 24, marginVertical: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#c13584', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>
              Question Bank
            </Text>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>
              {displayTitle}
            </Text>
          </View>

          {/* Question List */}
          <View style={{ paddingHorizontal: 16 }}>
            {QUESTIONS.map((q, index) => (
              <QuestionCard key={q.id} question={q} />
            ))}
            
            {/* Add Mnemonic Placeholder */}
            <TouchableOpacity 
              activeOpacity={0.7}
              style={{ 
                borderWidth: 1, 
                borderStyle: 'dashed', 
                borderColor: '#2f3131', 
                borderRadius: 24, 
                padding: 24, 
                alignItems: 'center', 
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 8,
                marginTop: 8
              }}
            >
              <Ionicons name="add-circle-outline" size={20} color="#52525b" />
              <Text style={{ color: '#52525b', fontWeight: 'bold', fontSize: 16 }}>Add a study mnemonic</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function QuestionCard({ question }) {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <View style={{ 
      backgroundColor: '#1e2020', 
      borderRadius: 32, 
      padding: 24, 
      marginBottom: 20,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.03)'
    }}>
      {/* Card Top Bar */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <View style={{ 
          backgroundColor: 'rgba(37, 99, 235, 0.2)', 
          paddingHorizontal: 12, 
          paddingVertical: 4, 
          borderRadius: 12 
        }}>
          <Text style={{ color: '#3b82f6', fontSize: 12, fontWeight: 'bold' }}>Q #{question.id}</Text>
        </View>
        <Ionicons 
          name={question.isBookmarked ? "bookmark" : "bookmark-outline"} 
          size={22} 
          color={question.isBookmarked ? "#c13584" : "#a48a93"} 
        />
      </View>

      {/* Question Text */}
      <Text style={{ fontSize: 18, color: 'white', lineHeight: 26, fontWeight: '500', marginBottom: 24 }}>
        {question.text}
      </Text>

      {/* Options */}
      <View style={{ gap: 12, marginBottom: 24 }}>
        {question.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const showCorrect = (isSelected || selectedOption !== null) && option.isCorrect;
          
          return (
            <TouchableOpacity
              key={option.id}
              activeOpacity={0.8}
              onPress={() => setSelectedOption(option.id)}
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                padding: 16, 
                borderRadius: 24, 
                backgroundColor: showCorrect ? 'rgba(193, 53, 132, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                borderWidth: 1,
                borderColor: showCorrect ? '#c13584' : 'transparent'
              }}
            >
              <View style={{ 
                width: 32, 
                height: 32, 
                borderRadius: 16, 
                backgroundColor: showCorrect ? '#c13584' : 'rgba(255, 255, 255, 0.05)', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginRight: 16
              }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{option.id}</Text>
              </View>
              <Text style={{ flex: 1, color: showCorrect ? 'white' : '#a48a93', fontSize: 16, fontWeight: showCorrect ? 'bold' : '400' }}>
                {option.text}
              </Text>
              {showCorrect && (
                <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#22c55e', alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="checkmark" size={16} color="white" />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Personal Note Section */}
      {question.personalNote && (
        <View style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.02)', 
          borderLeftWidth: 4, 
          borderLeftColor: '#2563eb', 
          borderRadius: 16, 
          padding: 16, 
          marginBottom: 24 
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#52525b', textTransform: 'uppercase', letterSpacing: 1 }}>Personal Note</Text>
            <Ionicons name="trash-outline" size={14} color="#991b1b" />
          </View>
          <Text style={{ color: '#dcbfc9', fontSize: 14, lineHeight: 20 }}>
            {question.personalNote}
          </Text>
        </View>
      )}

      {/* Card Footer Actions */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity 
          style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            backgroundColor: '#ffafd2', 
            paddingHorizontal: 16, 
            paddingVertical: 10, 
            borderRadius: 20,
            gap: 6
          }}
        >
          <Ionicons name="create-outline" size={18} color="#63003f" />
          <Text style={{ color: '#63003f', fontWeight: 'bold', fontSize: 14, textTransform: 'uppercase' }}>Add Note</Text>
        </TouchableOpacity>
        <Text style={{ color: '#52525b', fontSize: 14, fontWeight: '500' }}>
          {question.correctRate} Correct Rate
        </Text>
      </View>
    </View>
  );
}
