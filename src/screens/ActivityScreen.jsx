import { StyleSheet, Text, View } from 'react-native';

export default function ActivityScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity</Text>
      <Text>Danh sách và tương tác với hoạt động sẽ được bổ sung ở giai đoạn sau.</Text>
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
});
