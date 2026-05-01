import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { 
  Layout, 
  SlideInDown, 
  SlideOutDown 
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomToast({ message, visible, onHide, type = 'success' }) {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const config = {
    success: {
      bg: '#1E2B24',
      border: '#2A4D3B',
      icon: 'check-circle',
      iconColor: '#4ADE80'
    },
    error: {
      bg: '#2B1E1E',
      border: '#4D2A2A',
      icon: 'error',
      iconColor: '#F87171'
    },
    info: {
      bg: '#1E242B',
      border: '#2A3D4D',
      icon: 'info',
      iconColor: '#60A5FA'
    }
  };

  const theme = config[type] || config.success;

  return (
    <Animated.View 
      entering={SlideInDown.duration(400)}
      exiting={SlideOutDown.duration(300)}
      layout={Layout.springify()}
      style={[
        styles.container, 
        { 
          bottom: insets.bottom + 40,
          backgroundColor: theme.bg,
          borderColor: theme.border
        }
      ]}
      className="flex-row items-center px-lg py-md rounded-2xl border shadow-2xl z-[100]"
    >
      <MaterialIcons name={theme.icon} size={20} color={theme.iconColor} />
      <Text className="text-white text-sm font-medium ml-md">
        {message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  }
});
