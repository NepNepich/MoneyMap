import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider, useMenu } from './src/context/MenuContext';
import { SidebarMenu } from './src/components/ui/SidebarMenu';
import { AccountsScreen } from './src/screens/AccountsScreen';

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
  return (
    <SafeAreaProvider>
      <MenuProvider>
        {/* Пока здесь отображается экран счетов. 
            В будущем интегратор заменит это на роутер */}
        <AccountsScreen />
        
        {/* Глобальное меню поверх всех экранов */}
        <GlobalMenu />
      </MenuProvider>
    </SafeAreaProvider>
  );
}