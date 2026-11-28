import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { IconButton } from '../components/ui/IconButton';
import { useMenu } from '../context/MenuContext';

// Иконки для кнопок (скачайте из Figma)
const iconImport = require('../assets/icon-import.png'); // Стрелка вверх из коробки
const iconExport = require('../assets/icon-export.png'); // Стрелка вниз в коробку

export const ImportExportScreen: React.FC = () => {
  const { openMenu } = useMenu();

  return (
    <LinearGradient
      // Градиент как на скриншоте (сверху светлый, снизу темный)
      colors={['#CAEAE1', '#116F63']} 
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        
        {/* Шапка */}
        <View style={styles.header}>
          <Text style={styles.title}>Импорт / Экспорт</Text>
          <IconButton onPress={openMenu} />
        </View>

        {/* Разделитель */}
        <View style={styles.divider} />

        <Text style={styles.subtitle}>Выберите действие</Text>

        {/* Кнопка "Импорт из банка" */}
        <Pressable style={styles.actionButton}>
          <View style={styles.iconContainer}>
            <Image source={iconImport} style={styles.icon} resizeMode="contain" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.buttonTitle}>Импорт из банка</Text>
            <Text style={styles.buttonSubtitle}>Загрузить банковскую выписку</Text>
          </View>
        </Pressable>

        {/* Кнопка "Экспорт данных" */}
        <Pressable style={styles.actionButton}>
          <View style={styles.iconContainer}>
            <Image source={iconExport} style={styles.icon} resizeMode="contain" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.buttonTitle}>Экспорт данных</Text>
            <Text style={styles.buttonSubtitle}>Сохранить операции в файл</Text>
          </View>
        </Pressable>

      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#116F63', // Темно-зеленый цвет текста (из Figma)
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(17, 111, 99, 0.2)', // Полупрозрачная линия
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#116F63',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(17, 111, 99, 0.6)', // Полупрозрачный зеленый фон (60%)
    borderRadius: 16,
    height: 120, // Из Figma
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    width: 24, // Размер иконки (24x24)
    height: 24,
  },
  textContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  buttonSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
  },
});