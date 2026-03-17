import { useState } from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Login } from './components/Login';

function MainContent() {
    const insets = useSafeAreaInsets();
    const [isNightPeriod, setIsNightPeriod] = useState(false);
    const [search, setSearch] = useState('');



  return (
   <Login />
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <MainContent />
    </SafeAreaProvider>
  );
}
