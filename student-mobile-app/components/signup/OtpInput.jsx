import React, { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';

export default function OtpInput({ length = 5, onComplete }) {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length !== 0 && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    if (newOtp.every(val => val !== '') && onComplete) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyPress = (e, index) => {
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
            borderColor: '#262626',
            borderWidth: 2,
            color: '#e2e2e2',
            fontWeight: 'bold'
          }}
          maxLength={1}
          placeholder="•"
          placeholderTextColor="#565656"
          keyboardType="number-pad"
          value={digit}
          onChangeText={text => handleChange(text, i)}
          onKeyPress={e => handleKeyPress(e, i)}
        />
      ))}
    </View>
  );
}
