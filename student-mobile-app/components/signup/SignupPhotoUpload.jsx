import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SignupPhotoUpload({ imageUri, onPickImage }) {
  const placeholder = "https://lh3.googleusercontent.com/aida-public/AB6AXuARoutaOVIKisNOVOAY7baQrq2WbZPvUE9l7kGIjTtHwn73twWy3fUdi2N2bbEVBvxEPcm50ZbvBzswBUV7aGJasNI6ikZixGTToQgd8PJPWclz155GMdUGC8Nu_cwm3VEFBgCzQWpEOK2Rit9iAzkyQX2lGsr53wLLdlLjfxNi8Tj1yXDuC6G-V4erFXcK0811gKrMrGCzI2_rVPYx06Aobm-iw8kZ5HpQL1FEDwsHh9c51fuj4P61D-nHRxwntfv3rJc4zAPZZ7A";

  return (
    <View className="items-center mb-xl">
      <View 
        style={{ width: 160, height: 160, borderRadius: 80, overflow: 'hidden' }}
        className="bg-surface-container-highest border-4 border-surface-container-high items-center justify-center relative"
      >
        <Image 
          source={{ uri: imageUri || placeholder }}
          className={`w-full h-full ${!imageUri ? 'opacity-50 grayscale' : ''}`}
          resizeMode="cover"
        />
        <View className="absolute inset-0 items-center justify-center">
          <TouchableOpacity 
            onPress={onPickImage}
            style={{ width: 56, height: 56, borderRadius: 28, transform: [{ translateX: 48 }, { translateY: 48 }] }}
            className="bg-primary-container items-center justify-center shadow-lg active:opacity-80"
          >
            <MaterialIcons name="camera-alt" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
