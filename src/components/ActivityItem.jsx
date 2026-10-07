import { useContext } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { ThemeContext } from '../context/ThemeContext';

export default function ActivityItem({ item, selected, onPress }) {
  const { colors } = useContext(ThemeContext);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.title}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.card, {
        backgroundColor: colors.surface,
        borderColor: selected ? colors.primary : colors.border,
        opacity: pressed ? 0.7 : 1,
      }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
      <Text style={{ color: colors.secondaryText }}>{item.description}</Text>
      <Text style={[styles.status, { color: colors.primary }]}>{selected ? 'Đã chọn' : 'Chưa chọn'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderWidth: 2, borderRadius: 8, marginBottom: 12 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  status: { marginTop: 8, fontWeight: 'bold' },
});
