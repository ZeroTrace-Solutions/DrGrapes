import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, withSequence, interpolateColor } from 'react-native-reanimated';

export default function OtpInput({ length = 5, onComplete, onChange, status = 'default', isLoading = false }) {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputs = useRef([]);
  const pulse = useSharedValue(0);

  const isSuccess = status === 'success';

  useEffect(() => {
    if (isLoading) {
      pulse.value = withRepeat(withTiming(1, { duration: 800 }), -1, true);
    } else {
      pulse.value = withTiming(0);
    }
  }, [isLoading]);

  const animatedBoxStyle = useAnimatedStyle(() => {
    return {
      borderColor: isLoading 
        ? interpolateColor(pulse.value, [0, 1], ['#262626', '#c13584'])
        : undefined
    };
  });

  const handleChange = (text, index) => {
    if (isSuccess || isLoading) return;
    
    const cleanText = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = cleanText;
    setOtp(newOtp);

    if (cleanText.length !== 0 && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    if (newOtp.every(val => val !== '') && onComplete) {
      onComplete(newOtp.join(''));
    }
    
    if (onChange) {
      onChange(newOtp.join(''));
    }
  };

  const handleKeyPress = (e, index) => {
    if (isSuccess || isLoading) return;
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const size = length > 5 ? 48 : 56;
  const gap = length > 5 ? 6 : 8;
  const fontSize = length > 5 ? 20 : 24;
  const borderRadius = length > 5 ? 20 : 28;

  return (
    <View style={{ gap }} className="flex-row justify-center w-full mb-xl self-center">
      {otp.map((digit, i) => (
        <Animated.View key={i} style={[
          { 
            width: size, 
            height: size, 
            borderRadius: borderRadius, 
            backgroundColor: '#1e2020',
            borderColor: isSuccess ? '#4ADE80' : (focusedIndex === i ? '#c13584' : '#262626'),
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center'
          },
          isLoading && animatedBoxStyle
        ]}>
          <TextInput
            ref={ref => inputs.current[i] = ref}
            style={{ 
              width: '100%',
              height: '100%',
              textAlign: 'center', 
              fontSize: fontSize,
              color: '#e2e2e2',
              fontWeight: 'bold'
            }}
            editable={!isSuccess && !isLoading}
            maxLength={1}
            placeholder="•"
            placeholderTextColor="#565656"
            keyboardType="number-pad"
            selectionColor="transparent"
            value={digit}
            onFocus={() => setFocusedIndex(i)}
            onBlur={() => setFocusedIndex(-1)}
            onChangeText={text => handleChange(text, i)}
            onKeyPress={e => handleKeyPress(e, i)}
          />
        </Animated.View>
      ))}
    </View>
  );
}
