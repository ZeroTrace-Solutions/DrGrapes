import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ActivityCard({ icon, label, value, color, onPress }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.8}
      style={{ 
        flex: 1, 
        backgroundColor: '#1e2020', 
        borderRadius: 24, 
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.02)'
      }}
    >
       <Ionicons name={icon} size={24} color={color} style={{ marginBottom: 16 }} />
       <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>{label}</Text>
       <Text style={{ fontSize: 12, color: '#dcbfc9' }}>{value}</Text>
    </TouchableOpacity>
  );
}
