import { createContext, useContext, useEffect, useRef, useState } from 'react';

import LoadingScreen from '../components/LoadingScreen';
import { readStoredValue, STORAGE_KEYS, writeStoredValue } from '../storage/appStorage';
import { isValidProfile } from '../utils/profileValidation';
import { ThemeContext } from './ThemeContext';

export const ProfileContext = createContext(null);
export const defaultProfile = { name: 'Student', bio: 'MMA301 learner' };

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(defaultProfile);
  const [hydrated, setHydrated] = useState(false);
  const [storageError, setStorageError] = useState(null);
  const lastRequestedValue = useRef(defaultProfile);
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    let active = true;
    async function hydrate() {
      const result = await readStoredValue(STORAGE_KEYS.PROFILE, defaultProfile, isValidProfile);
      if (!active) return;
      const restoredProfile = { name: result.value.name.trim(), bio: result.value.bio.trim() };
      lastRequestedValue.current = restoredProfile;
      setProfile(restoredProfile);
      setStorageError(result.error);
      setHydrated(true);
    }
    hydrate();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!hydrated || lastRequestedValue.current === profile) return;
    lastRequestedValue.current = profile;
    let active = true;
    writeStoredValue(STORAGE_KEYS.PROFILE, profile).then((error) => {
      if (active) setStorageError(error);
    });
    return () => { active = false; };
  }, [profile, hydrated]);

  function updateProfile(nextProfile) {
    if (!isValidProfile(nextProfile)) return false;

    setProfile({ name: nextProfile.name.trim(), bio: nextProfile.bio.trim() });
    return true;
  }

  if (!hydrated) return <LoadingScreen colors={colors} message="Đang đọc hồ sơ đã lưu…" />;

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, storageError }}>
      {children}
    </ProfileContext.Provider>
  );
}
