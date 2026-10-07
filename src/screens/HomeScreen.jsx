import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MMA301 Assignment 1</Text>
      <Text>Chọn một màn hình để khám phá ứng dụng.</Text>

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
