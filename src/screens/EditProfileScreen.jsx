import { useContext, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import ScreenContainer from '../components/ScreenContainer';
import { ProfileContext } from '../context/ProfileContext';
import { ThemeContext } from '../context/ThemeContext';
import { validateProfile } from '../utils/profileValidation';

export default function EditProfileScreen({ navigation }) {
  const { profile, updateProfile } = useContext(ProfileContext);
  const { colors } = useContext(ThemeContext);
  // Bản nháp chỉ thuộc màn hình này; gõ chữ chưa thay đổi hồ sơ dùng chung.
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [errors, setErrors] = useState({});
  const inputColors = { color: colors.text, backgroundColor: colors.surface, borderColor: colors.border };

  function handleSave() {
    const nextProfile = { name, bio };
    const nextErrors = validateProfile(nextProfile);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (updateProfile(nextProfile)) navigation.goBack();
  }

  return (
    <ScreenContainer>
      <ScrollView keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Chỉnh sửa hồ sơ</Text>
        <Text style={[styles.label, { color: colors.text }]}>Tên (2–50 ký tự)</Text>
        <TextInput
          accessibilityLabel="Tên"
          value={name}
          onChangeText={setName}
          placeholder="Nhập tên của bạn"
          placeholderTextColor={colors.secondaryText}
          style={[styles.input, inputColors]}
        />
        {errors.name ? <Text accessibilityRole="alert" style={{ color: colors.error }}>{errors.name}</Text> : null}
        <Text style={[styles.label, { color: colors.text }]}>Giới thiệu (tối đa 160 ký tự)</Text>
        <TextInput
          accessibilityLabel="Giới thiệu"
          value={bio}
          onChangeText={setBio}
          placeholder="Viết một chút về bạn"
          placeholderTextColor={colors.secondaryText}
          multiline
          textAlignVertical="top"
          style={[styles.input, styles.bio, inputColors]}
        />
        {errors.bio ? <Text accessibilityRole="alert" style={{ color: colors.error }}>{errors.bio}</Text> : null}
        <View style={styles.button}><Button title="Lưu" onPress={handleSave} /></View>
        <View style={styles.button}><Button title="Hủy" onPress={() => navigation.goBack()} /></View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  label: { fontSize: 16, marginTop: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16 },
  bio: { minHeight: 100 },
  button: { marginTop: 16 },
});
