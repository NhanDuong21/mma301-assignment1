import { Button, StyleSheet, Text, View } from 'react-native';

export default function EditProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <Text>Biểu mẫu chỉnh sửa hồ sơ chưa được triển khai ở M1.</Text>

      <View style={styles.button}>
        <Button title="Quay lại hồ sơ" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
});
