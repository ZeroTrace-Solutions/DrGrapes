import { Image, Text, View } from 'react-native';

export default function BrandingHeader() {
  return (
    <View style={{ width: '100%' }} className="items-center">
      <View className="w-25 h-25 rounded-xl items-center justify-center mb-md">
        <Image
          source={require('@/assets/images/dr-grapes-logo.png')}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      {/* <Text className="text-3xl font-bold text-primary mb-xs">Dr. Jimmy</Text> */}
      <Text className="text-base text-on-surface-variant text-center max-w-[240px]">
        Welcome back Dr.
      </Text>
    </View>
  );
}
