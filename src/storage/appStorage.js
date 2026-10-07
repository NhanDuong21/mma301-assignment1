import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  PROFILE: 'mma301.profile',
  THEME: 'mma301.theme',
};

export async function readStoredValue(key, fallback, isValid) {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return { value: fallback, error: null };
    const value = JSON.parse(raw);
    if (!isValid(value)) throw new Error('Dữ liệu đã lưu không đúng định dạng.');
    return { value, error: null };
  } catch (error) {
    if (__DEV__) console.warn(`[Lưu trữ] Không đọc được ${key}: ${error.message}`);
    return { value: fallback, error: 'Không đọc được dữ liệu đã lưu. Đang dùng giá trị mặc định.' };
  }
}

// Xếp các lần ghi cùng key theo thứ tự để thao tác nhanh không lưu đè dữ liệu mới bằng dữ liệu cũ.
const pendingWrites = {};

export function writeStoredValue(key, value) {
  pendingWrites[key] = (pendingWrites[key] || Promise.resolve()).then(async () => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return null;
    } catch (error) {
      if (__DEV__) console.warn(`[Lưu trữ] Không ghi được ${key}: ${error.message}`);
      return 'Chưa lưu được thay đổi trên máy. Dữ liệu mới hiện chỉ có trong phiên này.';
    }
  });
  return pendingWrites[key];
}
