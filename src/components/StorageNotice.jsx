import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ProfileContext } from '../context/ProfileContext';
import { ThemeContext } from '../context/ThemeContext';

export default function StorageNotice() {
  const { colors, storageError: themeError } = useContext(ThemeContext);
  const { storageError: profileError } = useContext(ProfileContext);
  if (!themeError && !profileError) return null;

  return (
    <View style={styles.notice}>
      {themeError ? <Text accessibilityRole="alert" style={{ color: colors.error }}>Giao diện: {themeError}</Text> : null}
      {profileError ? <Text accessibilityRole="alert" style={{ color: colors.error }}>Hồ sơ: {profileError}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({ notice: { marginBottom: 16 } });
