import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Circle, Defs, Stop, Svg, LinearGradient as SvgGradient } from 'react-native-svg';

export default function SignupPhotoUpload({ imageUri, onPickImage, gender }) {
  // Select a stylized avatar based on gender (Felix for male, Aneka for female, Bubba for default)
  const getPlaceholder = () => {
    if (gender === 'male') {
      return "https://api.dicebear.com/7.x/avataaars/png?seed=Felix&backgroundColor=b6e3f4";
    } else if (gender === 'female') {
      return "https://api.dicebear.com/7.x/avataaars/png?seed=Aneka&backgroundColor=ffdfbf";
    }
    return "https://api.dicebear.com/7.x/avataaars/png?seed=Bubba&backgroundColor=c0aede";
  };

  const placeholder = getPlaceholder();

  return (
    <View className="items-center mb-xl">
      <View className="relative">
        {/* Gradient Ring using SVG */}
        <View style={styles.svgWrapper}>
          <Svg height="168" width="168" viewBox="0 0 168 168">
            <Defs>
              <SvgGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#c13584" stopOpacity="1" />
                <Stop offset="100%" stopColor="#0d36c3" stopOpacity="1" />
              </SvgGradient>
            </Defs>
            <Circle
              cx="84"
              cy="84"
              r="82"
              stroke="url(#grad)"
              strokeWidth="3"
              fill="none"
            />
          </Svg>
        </View>

        {/* Profile Image Container */}
        <View
          style={styles.imageContainer}
          className="bg-surface-container-highest items-center justify-center overflow-hidden"
        >
          {imageUri && <Image
            source={{ uri: imageUri }}
            style={styles.image}
            contentFit="cover"
            transition={300}
          />}
          {!imageUri && (
            <View className="absolute inset-0 bg-surface-dim/30 items-center justify-center">
              <MaterialIcons name="person" size={72} color="rgba(255,255,255,0.15)" />
            </View>
          )}
        </View>

        {/* Floating Camera Button */}
        <TouchableOpacity
          onPress={onPickImage}
          activeOpacity={0.8}
          style={styles.cameraButton}
          className="bg-primary-container items-center justify-center shadow-2xl"
        >
          <MaterialIcons name="add-a-photo" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  svgWrapper: {
    position: 'absolute',
    top: -4,
    left: -4,
    width: 168,
    height: 168,
    zIndex: 1,
  },
  imageContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    zIndex: 2,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cameraButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 10,
    borderWidth: 3,
    borderColor: '#121414',
  }
});
