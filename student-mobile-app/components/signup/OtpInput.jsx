import React, { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';

export default function OtpInput({ length = 5, onComplete, status = 'default' }) {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputs = useRef([]);

  const isSuccess = status === 'success';

  const handleChange = (text, index) => {
    if (isSuccess) return; // Prevent changes during success state
    
    // Only allow numeric input
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
  };

  const handleKeyPress = (e, index) => {
    if (isSuccess) return;
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={{ maxWidth: 320, gap: 8 }} className="flex-row justify-between w-full mb-xl self-center">
      {otp.map((digit, i) => (
        <TextInput
          key={i}
          ref={ref => inputs.current[i] = ref}
          style={{ 
            width: 56, 
            height: 56, 
            borderRadius: 28, 
            textAlign: 'center', 
            fontSize: 24,
            backgroundColor: '#1e2020',
            borderColor: isSuccess ? '#4ADE80' : (focusedIndex === i ? '#c13584' : '#262626'),
            borderWidth: 2,
            color: '#e2e2e2',
            fontWeight: 'bold'
          }}
          editable={!isSuccess}
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
      ))}
    </View>
  );
}
