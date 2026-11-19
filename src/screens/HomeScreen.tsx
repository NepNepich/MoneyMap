import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton } from '../components/ui/AppButton';
import { IconButton } from '../components/ui/IconButton';
import { colors, spacing } from '../theme/tokens';

// Подключаем картинки
const cardImg = require('../assets/card.png');
const barsImg = require('../assets/bars.png');

const menuItems = [
  { id: 'add-article', label: 'Добавить статью' },
  { id: 'add-operation', label: 'Добавить операцию' },
  { id: 'menu', label: 'Меню' },
  { id: 'table', label: 'Таблица' },
];

export const HomeScreen: React.FC = () => {
  const handleMenuClick = () => console.log('Меню нажато');
  const handleButtonClick = (id: string) => console.log(`Нажата кнопка: ${id}`);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Шапка */}
        <View style={styles.header}>
          <Text style={styles.title}>ФинСервис</Text>
          <IconButton onPress={handleMenuClick} />
        </View>

        {/* Логотип */}
        <View style={styles.logoWrapper}>
          <View style={styles.logoContainer}>
            <Image source={cardImg} style={styles.logoCard} resizeMode="contain" />
            <Image source={barsImg} style={styles.logoBars} resizeMode="contain" />
          </View>
        </View>

        {/* Кнопки */}
        <View style={styles.buttonsGroup}>
          {menuItems.map((item) => (
            <AppButton
              key={item.id}
              title={item.label}
              onPress={() => handleButtonClick(item.id)}
            />
          ))}
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    color: colors.text,
    fontWeight: '400',
  },
  logoWrapper: {
    marginTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 161,
    height: 172,
    backgroundColor: colors.primary,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCard: {
    width: 111.25,
    height: 83.98,
    position: 'absolute',
    top: 45,
  },
  logoBars: {
    width: 54.69,
    height: 42.66,
    position: 'absolute',
    top: 86.34,
    left: 75.63,
  },
  buttonsGroup: {
    width: '100%', 
    marginTop: 44,
    gap: 24,
  },
});