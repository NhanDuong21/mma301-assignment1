import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/context/ThemeContext';
import { ProfileProvider } from './src/context/ProfileContext';

export default function App() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <AppNavigator />
      </ProfileProvider>
    </ThemeProvider>
  );
}
