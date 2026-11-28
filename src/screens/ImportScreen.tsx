import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { IconButton } from '../components/ui/IconButton';
import { useMenu } from '../context/MenuContext';

// Иконки (используем те же, что и раньше)
const iconUpload = require('../assets/icon-import.png');
const iconChevronDown = require('../assets/icon-chevron-down.png');
const iconArrowLeft = require('../assets/icon-arrow-left.png');

const BANKS = [
  'Сбербанк', 
  'Тинькофф', 
  'Альфа-Банк', 
  'ВТБ', 
  'Газпромбанк', 
  'Райффайзен', 
  'Открытие', 
  'Россельхозбанк', 
  'Промсвязьбанк',
  'Совкомбанк'
];

export const ImportScreen: React.FC = () => {
  const { openMenu } = useMenu();
  const [selectedBank, setSelectedBank] = useState('Сбербанк');
  const [isBankListVisible, setIsBankListVisible] = useState(false);

  return (
    <LinearGradient
      colors={['#CAEAE1', '#116F63']} 
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        
        {/* Шапка */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable style={styles.backButton}>
              <Image source={iconArrowLeft} style={styles.backIcon} resizeMode="contain" />
            </Pressable>
            <Text style={styles.title}>Импорт из банка</Text>
          </View>
          <IconButton onPress={openMenu} />
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Банковская выписка</Text>

        {/* Зона загрузки */}
        <Pressable style={styles.uploadArea}>
          <Image source={iconUpload} style={styles.uploadIcon} resizeMode="contain" />
          <Text style={styles.uploadText}>Выберите файл выписки</Text>
          <Text style={styles.uploadSubtext}>CSV или XLSX</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Банк</Text>

        {/* Выбор банка */}
        <Pressable style={styles.bankSelector} onPress={() => setIsBankListVisible(!isBankListVisible)}>
          <Text style={styles.bankText}>{selectedBank}</Text>
          <Image source={iconChevronDown} style={styles.chevronIcon} resizeMode="contain" />
        </Pressable>

        {/* ВСТРОЕННЫЙ СПИСОК БАНКОВ (С ПРОКРУТКОЙ) */}
        {isBankListVisible && (
          <View style={styles.inlineListContainer}>
            <ScrollView 
              style={styles.scrollView} 
              nestedScrollEnabled={true} 
              showsVerticalScrollIndicator={true}
            >
              {BANKS.map((bank) => (
                <Pressable 
                  key={bank} 
                  style={styles.inlineItem}
                  onPress={() => {
                    setSelectedBank(bank);
                    setIsBankListVisible(false);
                  }}
                >
                  <Text style={styles.inlineItemText}>{bank}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Кнопка Импортировать */}
        <Pressable style={styles.importButton}>
          <Text style={styles.importButtonText}>Импортировать</Text>
        </Pressable>

      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, paddingHorizontal: 24 },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, marginBottom: 16 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backButton: { width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
  backIcon: { width: 24, height: 24, tintColor: '#116F63' },
  title: { fontSize: 20, fontWeight: '600', color: '#116F63' },
  
  divider: { height: 1, backgroundColor: 'rgba(17, 111, 99, 0.2)', marginBottom: 24 },
  
  sectionTitle: { fontSize: 16, fontWeight: '500', color: '#116F63', marginBottom: 12 },

  uploadArea: {
    width: '100%',
    height: 153, 
    backgroundColor: 'rgba(17, 111, 99, 0.6)', 
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadIcon: { width: 30, height: 30, marginBottom: 12 },
  uploadText: { fontSize: 20, fontWeight: '500', color: '#FFFFFF', marginBottom: 4 },
  uploadSubtext: { fontSize: 14, fontWeight: '400', color: 'rgba(255, 255, 255, 0.8)' },

  bankSelector: {
    width: '100%',
    height: 68, 
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12, // Отступ для списка
  },
  bankText: { fontSize: 20, fontWeight: '500', color: '#116F63' },
  chevronIcon: { width: 24, height: 24 },

  // Стили для встроенного списка с прокруткой
  inlineListContainer: {
    width: '100%',
    height: 180, // Высота, чтобы было видно примерно 3 банка (60px на элемент)
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#116F63',
    marginBottom: 16,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  inlineItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  inlineItemText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#116F63',
  },

  importButton: {
    width: '100%',
    height: 96, 
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  importButtonText: { fontSize: 20, fontWeight: '600', color: '#116F63' },
});