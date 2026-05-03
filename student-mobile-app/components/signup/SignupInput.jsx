import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';

export default function SignupInput({ 
  label, 
  placeholder, 
  icon, 
  type = "default", 
  value, 
  onChangeText, 
  isPassword = false,
  keyboardType = "default",
  maxLength,
  error = false
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-full gap-sm mb-md">
      {label && (
        <Text className="text-xs font-bold tracking-widest text-on-surface-variant uppercase ml-1">
          {label}
        </Text>
      )}
      
      <View className="relative h-14 justify-center">
        <View 
          style={{ 
            position: 'absolute', 
            left: 20, 
            zIndex: 10,
            top: '50%',
            transform: [{ translateY: -10 }] 
          }}
          pointerEvents="none"
        >
          <MaterialIcons name={icon} size={20} color={isFocused ? "#c13584" : "#a48a93"} />
        </View>
        
        <TextInput
          style={{
            backgroundColor: '#1e2020',
            borderColor: error ? '#ffb4ab' : (isFocused ? '#c13584' : '#564149'),
            borderWidth: 2,
            color: '#e2e2e2',
            paddingLeft: 56,
            paddingRight: isPassword ? 56 : 20,
            height: 56,
            borderRadius: 28,
            fontSize: 16,
            textAlignVertical: 'center',
            paddingTop: 0,
            paddingBottom: 0
          }}
          placeholder={placeholder}
          placeholderTextColor="#a48a93"
          keyboardType={keyboardType}
          secureTextEntry={isPassword && !showPassword}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxLength}
        />

        {isPassword && (
          <TouchableOpacity 
            style={{ 
              position: 'absolute', 
              right: 20, 
              zIndex: 10,
              top: '50%',
              transform: [{ translateY: -12 }] 
            }}
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.7}
          >
            <MaterialIcons 
              name={showPassword ? "visibility" : "visibility-off"} 
              size={24} 
              color="#a48a93" 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
