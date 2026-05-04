import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function ProfileHeader({ name, username, university, level, avatarUrl }) {
  return (
    <View style={{ 
      backgroundColor: '#1e2020', 
      borderRadius: 32, 
      padding: 24, 
      flexDirection: 'row', 
      alignItems: 'center',
      marginBottom: 32,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.03)'
    }}>
      <View style={{ position: 'relative' }}>
         <View style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#c13584', padding: 2, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
            {avatarUrl ? (
              <Image 
                source={{ uri: avatarUrl }} 
                style={{ width: '100%', height: '100%', borderRadius: 40 }}
              />
            ) : (
              <Ionicons name="person" size={40} color="#dcbfc9" />
            )}
         </View>
         <View style={{ 
           position: 'absolute', 
           bottom: -4, 
           alignSelf: 'center',
           backgroundColor: '#2563eb', 
           paddingHorizontal: 8, 
           paddingVertical: 2, 
           borderRadius: 10,
           borderWidth: 2,
           borderColor: '#1e2020'
         }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>LVL {level}</Text>
         </View>
      </View>

      <View style={{ marginLeft: 20, flex: 1 }}>
         <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>{name}</Text>
         {username && (
           <Text style={{ fontSize: 14, color: '#c13584', fontWeight: 'bold', marginBottom: 6 }}>
             @{username}
           </Text>
         )}
         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="school-outline" size={14} color="#dcbfc9" />
            <Text style={{ fontSize: 14, color: '#dcbfc9', marginLeft: 6 }}>{university}</Text>
         </View>
      </View>

      <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#c13584', alignItems: 'center', justifyContent: 'center' }}>
         <Ionicons name="pencil" size={18} color="white" />
      </TouchableOpacity>
    </View>
  );
}
