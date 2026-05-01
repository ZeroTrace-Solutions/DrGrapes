import React from 'react';
import { View } from 'react-native';

export default function AmbientGlow() {
  return (
    <>
      {/* Top Right Glow */}
      <View 
        className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary-container/20 rounded-full"
        style={{ 
          opacity: 0.4
        }}
      />
      {/* Bottom Left Glow */}
      <View 
        className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-secondary-container/10 rounded-full"
        style={{ 
          opacity: 0.3
        }}
      />
    </>
  );
}
