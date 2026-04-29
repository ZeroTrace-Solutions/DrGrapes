import { Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-background p-container-margin items-center justify-center">
      <View className="w-24 h-24 rounded-full bg-primary-container mb-md items-center justify-center">
        <Text className="text-white text-3xl font-bold">JD</Text>
      </View>
      <Text className="display-lg text-on-surface">John Doe</Text>
      <Text className="body-md text-on-surface-variant mb-xl">Medical Student • Year 4</Text>

      <TouchableOpacity className="btn-primary w-full">
        <Text className="text-on-primary-container">Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
