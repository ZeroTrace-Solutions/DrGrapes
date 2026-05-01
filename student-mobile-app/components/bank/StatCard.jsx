import React from 'react';
import { View, Text } from 'react-native';

export default function StatCard({ value, label }) {
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: 'rgba(30, 32, 32, 0.4)', 
      borderRadius: 32, 
      padding: 32, 
      alignItems: 'center', 
      justifyContent: 'center', 
      borderWidth: 1, 
      borderColor: 'rgba(255, 255, 255, 0.05)' 
    }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#c13584', marginBottom: 4 }}>
        {value}
      </Text>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#dcbfc9', textTransform: 'uppercase', letterSpacing: 1.5, textAlign: 'center' }}>
        {label}
      </Text>
    </View>
  );
}
