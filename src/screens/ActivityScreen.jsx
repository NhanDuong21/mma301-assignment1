import { useContext, useState } from 'react';
import { FlatList, StyleSheet, Switch, Text, View } from 'react-native';

import ActivityItem from '../components/ActivityItem';
import ScreenContainer from '../components/ScreenContainer';
import { ThemeContext } from '../context/ThemeContext';
import { activities } from '../data/activities';

export default function ActivityScreen() {
  const { colors } = useContext(ThemeContext);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const visibleActivities = showSelectedOnly
    ? activities.filter((item) => selectedIds.includes(item.id))
    : activities;

  function toggleActivity(id) {
    setSelectedIds((previous) => previous.includes(id)
      ? previous.filter((selectedId) => selectedId !== id)
      : [...previous, id]);
  }

  return (
    <ScreenContainer>
      <Text style={[styles.title, { color: colors.text }]}>Hoạt động</Text>
      <Text style={{ color: colors.secondaryText }}>Đã chọn: {selectedIds.length}</Text>
      <View style={styles.filter}>
        <Text style={[styles.filterLabel, { color: colors.text }]}>Chỉ hiển thị đã chọn</Text>
        <Switch
          accessibilityLabel="Chỉ hiển thị đã chọn"
          value={showSelectedOnly}
          onValueChange={setShowSelectedOnly}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.surface}
        />
      </View>
      <FlatList
        data={visibleActivities}
        keyExtractor={(item) => item.id}
        extraData={selectedIds}
        renderItem={({ item }) => (
          <ActivityItem item={item} selected={selectedIds.includes(item.id)} onPress={() => toggleActivity(item.id)} />
        )}
        ListEmptyComponent={<Text style={{ color: colors.secondaryText }}>Chưa chọn hoạt động nào. Tắt bộ lọc để xem tất cả.</Text>}
        contentContainerStyle={styles.listContent}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  filter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 16 },
  filterLabel: { flex: 1, marginRight: 12 },
  listContent: { paddingBottom: 24 },
});
