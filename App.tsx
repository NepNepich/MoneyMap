import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider, useMenu } from './src/context/MenuContext';
import { SidebarMenu } from './src/components/ui/SidebarMenu';
import { AccountsScreen } from './src/screens/AccountsScreen';
import { View } from 'react-native';
import { AddAccountScreen } from './src/screens/AddAccountScreen'; 

// Импорт шрифтов
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

const GlobalMenu = () => {
  const { isMenuVisible, closeMenu } = useMenu();
  
  const handleItemPress = (id: string) => {
    console.log(`Глобальный переход в: ${id}`);
    closeMenu();
  };

  return (
    <SidebarMenu 
      visible={isMenuVisible} 
      onClose={closeMenu} 
      onItemPress={handleItemPress}
    />
  );
};

export default function App() {
  // Загружаем шрифты
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Пока шрифты грузятся, показываем пустой экран (или лоадер)
  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#CAEAE1' }} />;
  }

  return (
    <SafeAreaProvider>
      <MenuProvider>
        <AddAccountScreen />
        <GlobalMenu />
      </MenuProvider>
    </SafeAreaProvider>
  );
}