import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function BrandingFooter({ type = 'from', style }) {
  const isSettingsStyle = type === 'settings' || type === 'built';
  const label = isSettingsStyle ? 'Built and supported by' : 'from';

  return (
    <View style={[styles.footer, style]}>
      <Text 
        style={isSettingsStyle ? styles.settingsLabel : styles.fromText} 
        className="text-on-surface-variant"
      >
        {label}
      </Text>
      <View style={styles.brandingRow}>
        <Image
          source={require('@/assets/images/zt-solutions-icon.png')}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.ztText} className="text-on-surface">
          <Text style={styles.bold}>ZT</Text>Solutions
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    width: '100%',
  },
  fromText: {
    fontSize: 14,
    marginBottom: 8,
    letterSpacing: 1,
    textTransform: 'lowercase',
  },
  settingsLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#52525b',
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  brandingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  ztText: {
    fontSize: 20,
    letterSpacing: 0.5,
  },
  bold: {
    fontWeight: 'bold',
  },
});
