import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QuestionBankCard({ 
  category, 
  title, 
  questionsSolved, 
  totalQuestions, 
  percentage, 
  status, 
  icon,
  onPress,
  isLocked = false,
  index = 0
}) {
  const isStarted = questionsSolved > 0;
  const isFinished = percentage === 100;
  
  // Dynamic colors based on subject or status
  const progressColor = percentage > 50 ? '#c13584' : '#2563eb';

  // Map MaterialIcons to Ionicons
  const iconMap = {
    'spa': 'leaf',
    'timeline': 'pulse',
    'science': 'flask',
    'settings': 'cog'
  };
  const ioniconName = iconMap[icon] || icon;
  
  return (
    <View style={{ width: '100%', marginBottom: 24 }}>
      <View style={{ 
        backgroundColor: 'rgba(30, 32, 32, 0.5)', 
        borderRadius: 28, 
        padding: 24, 
        borderWidth: 1, 
        borderColor: 'rgba(255, 255, 255, 0.05)', 
        overflow: 'hidden' 
      }}>
        {/* Stylized background element */}
        <View style={{ position: 'absolute', top: -40, right: -40, opacity: 0.1 }}>
           <Ionicons name={ioniconName} size={150} color="white" />
        </View>

        {/* Card Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <View>
            <Text style={{ fontSize: 10, fontWeight: 'bold', letterSpacing: 2, color: '#dcbfc9', textTransform: 'uppercase', marginBottom: 4 }}>
              {category}
            </Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#e2e2e2' }}>
              {title}
            </Text>
          </View>
          <View style={{ width: 40, height: 40, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name={ioniconName} size={20} color={isStarted ? "#c13584" : "#a48a93"} />
          </View>
        </View>

        {/* Progress Section */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#dcbfc9' }}>
              {questionsSolved}/{totalQuestions} Questions
            </Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: isStarted ? progressColor : '#a48a93' }}>
              {isStarted ? `${percentage}%` : 'Not Started'}
            </Text>
          </View>
          
          {/* Custom Progress Bar */}
          <View style={{ height: 8, width: '100%', backgroundColor: '#121414', borderRadius: 4, overflow: 'hidden' }}>
             {isStarted && (
               <View
                 style={{ 
                   width: `${percentage}%`, 
                   height: '100%', 
                   backgroundColor: percentage > 50 ? '#c13584' : '#2563eb',
                   borderRadius: 4
                 }}
               />
             )}
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
          disabled={isLocked}
          style={{ 
            height: 56, 
            borderRadius: 28, 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 8,
            backgroundColor: isStarted ? '#c13584' : '#282a2b',
            borderWidth: isStarted ? 0 : 1,
            borderColor: 'rgba(255, 255, 255, 0.05)'
          }}
        >
          {isLocked && <Ionicons name="lock-closed" size={18} color="#71717a" />}
          <Text style={{ 
            fontSize: 14, 
            fontWeight: 'bold', 
            textTransform: 'uppercase', 
            letterSpacing: 1,
            color: isStarted ? '#ffedf2' : '#dcbfc9'
          }}>
            {isLocked ? 'Start' : (isStarted ? (isFinished ? 'Review Results' : 'Continue Learning') : 'Start Session')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
