import { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import ScreenContainer from '../components/ScreenContainer';
import { ThemeContext } from '../context/ThemeContext';

export default function ProfileScreen({ navigation }) {
  const { colors } = useContext(ThemeContext);

  return (
    <ScreenContainer>
      <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
      <Text style={{ color: colors.secondaryText }}>Thông tin hồ sơ sẽ được bổ sung ở giai đoạn sau.</Text>

      <View style={styles.button}>
        <Button
          title="Chỉnh sửa hồ sơ"
          onPress={() => navigation.navigate('EditProfile')}
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
