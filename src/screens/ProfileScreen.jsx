import { useContext } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

import ScreenContainer from '../components/ScreenContainer';
import { ProfileContext } from '../context/ProfileContext';
import { ThemeContext } from '../context/ThemeContext';

export default function ProfileScreen({ navigation }) {
  const { profile } = useContext(ProfileContext);
  const { colors } = useContext(ThemeContext);
  const words = profile.name.trim().split(/\s+/);
  const initials = (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : '')).toUpperCase();

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.avatar, { backgroundColor: colors.surface }]}>
          <Text accessibilityLabel={`Ảnh đại diện của ${profile.name}`} style={[styles.initials, { color: colors.primary }]}>
            {initials}
          </Text>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>{profile.name}</Text>
        <Text style={[styles.bio, { color: colors.secondaryText }]}>{profile.bio || 'Chưa có giới thiệu.'}</Text>
        <Button title="Chỉnh sửa hồ sơ" onPress={() => navigation.navigate('EditProfile')} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  initials: { fontSize: 28, fontWeight: 'bold' },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  bio: { fontSize: 16, marginBottom: 24 },
});
