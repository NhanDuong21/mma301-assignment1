import { useContext } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { ThemeContext } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, colors, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[
      styles.container,
      { backgroundColor: colors.surface, borderColor: colors.border },
    ]}>
      <View>
        <Text style={[styles.label, { color: colors.text }]}>Chế độ tối</Text>
        <Text style={{ color: colors.secondaryText }}>
          {isDark ? 'Đang bật' : 'Đang tắt'}
        </Text>
      </View>
      <Switch
        accessibilityLabel="Chế độ tối"
        value={isDark}
        onValueChange={toggleTheme}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={colors.surface}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
