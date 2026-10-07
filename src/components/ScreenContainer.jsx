import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemeContext } from '../context/ThemeContext';
import StorageNotice from './StorageNotice';

export default function ScreenContainer({ children }) {
  const { colors } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StorageNotice />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
