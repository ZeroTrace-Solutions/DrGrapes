import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ProfileRow({ icon, label, sublabel, value, color, isLast, isCard, style, onPress }) {
  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={onPress}
      style={[{ 
        backgroundColor: '#1e2020', 
        borderRadius: 24, 
        padding: 16, 
        flexDirection: 'row', 
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.02)'
      }, style]}
    >
      <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.03)', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
         <Ionicons name={icon} size={22} color={color} />
      </View>
      <View style={{ flex: 1 }}>
         <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>{label}</Text>
         {sublabel && <Text style={{ fontSize: 10, color: '#52525b', textTransform: 'uppercase', marginTop: 2 }}>{sublabel}</Text>}
      </View>
      {value && <Text style={{ fontSize: 14, color: '#dcbfc9', marginRight: 8 }}>{value}</Text>}
      <Ionicons name="chevron-forward" size={18} color="#52525b" />
    </TouchableOpacity>
  );
}
