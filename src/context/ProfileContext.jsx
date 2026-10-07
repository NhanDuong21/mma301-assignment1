import { createContext, useState } from 'react';

import { validateProfile } from '../utils/profileValidation';

export const ProfileContext = createContext(null);
export const defaultProfile = { name: 'Student', bio: 'MMA301 learner' };

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(defaultProfile);

  function updateProfile(nextProfile) {
    if (Object.keys(validateProfile(nextProfile)).length > 0) return false;

    setProfile({ name: nextProfile.name.trim(), bio: nextProfile.bio.trim() });
    return true;
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
