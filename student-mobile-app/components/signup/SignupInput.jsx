import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SignupInput({ placeholder, icon, type = "default", value, onChangeText, isPassword = false }) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="relative mb-md w-full">
      <View className="absolute inset-y-0 left-5 flex-row items-center z-10 h-14">
        <MaterialIcons name={icon} size={20} color={isFocused ? "#c13584" : "#a48a93"} />
      </View>
      <TextInput
        style={{ 
          backgroundColor: '#1e2020',
          borderColor: isFocused ? '#c13584' : '#564149',
          borderWidth: 2,
          color: '#e2e2e2',
          paddingLeft: 56,
          paddingRight: 56,
          height: 56,
          borderRadius: 28,
          fontSize: 16
        }}
        placeholder={placeholder}
        placeholderTextColor="#a48a93"
        keyboardType={type === "email" ? "email-address" : "default"}
        secureTextEntry={isPassword && !showPassword}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isPassword && (
        <TouchableOpacity 
          className="absolute inset-y-0 right-5 flex-row items-center z-10 h-14"
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={20} color="#a48a93" />
        </TouchableOpacity>
      )}
    </View>
  );
}
