import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import {
  ScrollView,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTabBarVisibility } from './_layout';

// Components
import ActivityCard from '../../components/profile/ActivityCard';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileRow from '../../components/profile/ProfileRow';
import SectionTitle from '../../components/profile/SectionTitle';

export default function ProfileScreen() {
  const router = useRouter();
  const { show, hide } = useTabBarVisibility();
  const lastScrollY = useRef(0);

  const onScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const diff = currentScrollY - lastScrollY.current;

    if (Math.abs(diff) < 20 || currentScrollY < 10) return;

    if (diff > 0 && currentScrollY > 80) {
      hide();
    } else if (diff < -15) {
      show();
    }
    lastScrollY.current = currentScrollY;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#121414' }}>
      <StatusBar style="light" />

      <SafeAreaView style={{ flex: 1, backgroundColor: '#121414' }}>
        <ScrollView
          style={{ flex: 1 }}
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header Card */}
          <ProfileHeader
            name="Dr. Jimmy"
            university="Stanford University"
            level="42"
            avatarUrl="https://i.pravatar.cc/150?u=jimmy"
          />

          {/* Activity Section */}
          <SectionTitle title="Activity" />
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
            <ActivityCard icon="bookmark" label="Saved" value="124 Items" color="#c13584" />
            <ActivityCard icon="help-circle" label="Your Quizzes" value="18 Pending" color="#2563eb" />
          </View>
          <ProfileRow icon="stats-chart-outline" label="Your Activity" color="#c13584" isCard style={{ marginBottom: 32 }} />

          {/* Transactions Section */}
          <SectionTitle title="Transactions" />
          <View style={{ gap: 12, marginBottom: 32 }}>
            <ProfileRow icon="bag-handle-outline" label="Orders" sublabel="HISTORY AND SUBSCRIPTIONS" color="#2563eb" />
            <ProfileRow icon="card-outline" label="Payment Methods" sublabel="SAVED CARDS AND BILLING" color="#2563eb" isLast />
          </View>


          {/* Preferences Section */}
          <SectionTitle title="Preferences" />
          <View style={{ gap: 12, marginBottom: 32 }}>
            <ProfileRow icon="globe-outline" label="Language" value="English" color="#2563eb" />
            <ProfileRow icon="color-palette-outline" label="Theme" value="Dark" color="#2563eb" isLast />
          </View>

          {/* Account Section */}
          <SectionTitle title="Account" />
          <View style={{ gap: 12, marginBottom: 32 }}>
            <ProfileRow icon="lock-closed-outline" label="Change Password" color="#2563eb" />
            <ProfileRow icon="desktop-outline" label="Devices" color="#2563eb" />
            <ProfileRow icon="log-out-outline" label="Logout" color="#ef4444" isLast />
          </View>

          {/* Information Section */}
          <SectionTitle title="Information" />
          <View style={{ gap: 12, marginBottom: 32 }}>
            <ProfileRow icon="help-circle-outline" label="Help" color="#dcbfc9" />
            <ProfileRow icon="information-circle-outline" label="About" color="#dcbfc9" />
            <ProfileRow icon="shield-checkmark-outline" label="Privacy Center" color="#dcbfc9" isLast />
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
