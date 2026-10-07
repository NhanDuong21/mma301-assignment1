import { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import ScreenContainer from '../components/ScreenContainer';
import { ThemeContext } from '../context/ThemeContext';

export default function EditProfileScreen({ navigation }) {
  const { colors } = useContext(ThemeContext);

  return (
    <ScreenContainer>
      <Text style={[styles.title, { color: colors.text }]}>Edit Profile</Text>
      <Text style={{ color: colors.secondaryText }}>Biểu mẫu chỉnh sửa hồ sơ chưa được triển khai ở M2.</Text>

      <View style={styles.button}>
        <Button title="Quay lại hồ sơ" onPress={() => navigation.goBack()} />
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
