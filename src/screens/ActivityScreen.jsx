import { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';

import ScreenContainer from '../components/ScreenContainer';
import { ThemeContext } from '../context/ThemeContext';

export default function ActivityScreen() {
  const { colors } = useContext(ThemeContext);

  return (
    <ScreenContainer>
      <Text style={[styles.title, { color: colors.text }]}>Activity</Text>
      <Text style={{ color: colors.secondaryText }}>Danh sách và tương tác với hoạt động sẽ được bổ sung ở giai đoạn sau.</Text>
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
