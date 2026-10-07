import { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import ScreenContainer from '../components/ScreenContainer';
import { ThemeContext } from '../context/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { colors } = useContext(ThemeContext);

  return (
    <ScreenContainer>
      <Text style={[styles.title, { color: colors.text }]}>MMA301 Assignment 1</Text>
      <Text style={{ color: colors.secondaryText }}>Chọn một màn hình để khám phá ứng dụng.</Text>

      <View style={styles.button}>
        <Button
          title="Xem hồ sơ"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Xem hoạt động"
          onPress={() => navigation.navigate('Activity')}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Mở cài đặt"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
});
