import { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';

import ScreenContainer from '../components/ScreenContainer';
import ThemeToggle from '../components/ThemeToggle';
import { ThemeContext } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { colors } = useContext(ThemeContext);

  return (
    <ScreenContainer>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      <Text style={{ color: colors.secondaryText }}>Đổi chế độ hiển thị bằng công tắc bên dưới.</Text>
      <ThemeToggle />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
