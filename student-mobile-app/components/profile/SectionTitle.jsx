import React from 'react';
import { Text } from 'react-native';

export default function SectionTitle({ title }) {
  return (
    <Text style={{ 
      fontSize: 12, 
      fontWeight: 'bold', 
      color: '#c13584', 
      textTransform: 'uppercase', 
      letterSpacing: 1.5, 
      marginBottom: 16,
      marginLeft: 4
    }}>
      {title}
    </Text>
  );
}
