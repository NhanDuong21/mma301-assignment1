import { Button, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Thông tin hồ sơ sẽ được bổ sung ở giai đoạn sau.</Text>

      <View style={styles.button}>
        <Button
          title="Chỉnh sửa hồ sơ"
          onPress={() => navigation.navigate('EditProfile')}
        />
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
