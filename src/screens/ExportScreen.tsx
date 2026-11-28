import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { IconButton } from '../components/ui/IconButton';
import { useMenu } from '../context/MenuContext';
import { CalendarModal } from '../components/ui/CalendarModal';

const iconArrowLeft = require('../assets/icon-arrow-left.png');
const iconCalendar= require('../assets/icon-calendar.png');
const iconChevronDown = require('../assets/icon-chevron-down.png');

const PLANS = ['Основной план', 'Накопления', 'План на отпуск'];
const FORMATS = ['XLSX', 'CSV', 'PDF'];

export const ExportScreen: React.FC = () => {
  const { openMenu } = useMenu();
  const [selectedPlan, setSelectedPlan] = useState('Основной план');
  const [selectedFormat, setSelectedFormat] = useState('XLSX');
  const [period, setPeriod] = useState('2026');
  
  const [isPlanListVisible, setIsPlanListVisible] = useState(false);
  const [isFormatListVisible, setIsFormatListVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  return (
    <LinearGradient
      colors={['#CAEAE1', '#116F63']} 
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable style={styles.backButton}>
              <Image source={iconArrowLeft} style={styles.backIcon} resizeMode="contain" />
            </Pressable>
            <Text style={styles.title}>Экспорт данных</Text>
          </View>
          <IconButton onPress={openMenu} />
        </View>

        <View style={styles.divider} />

        {/* Период */}
        <Text style={styles.sectionTitle}>Период</Text>
        <Pressable style={styles.periodSelector} onPress={() => setIsCalendarVisible(true)}>
          <Text style={styles.periodText}>{period}</Text>
          <Image source={iconCalendar} style={styles.iconSmall} resizeMode="contain" />
        </Pressable>

        {/* Таблица для экспорта */}
        <Text style={styles.sectionTitle}>Таблица для экспорта</Text>
        <Pressable style={styles.dropdownSelector} onPress={() => setIsPlanListVisible(!isPlanListVisible)}>
          <Text style={styles.dropdownText}>{selectedPlan}</Text>
          <Image source={iconChevronDown} style={styles.chevronIcon} resizeMode="contain" />
        </Pressable>
        
        {/* ВСТРОЕННЫЙ СПИСОК ПЛАНОВ (раздвигает контент) */}
        {isPlanListVisible && (
          <View style={styles.inlineList}>
            {PLANS.map((plan) => (
              <Pressable 
                key={plan} 
                style={styles.inlineItem}
                onPress={() => {
                  setSelectedPlan(plan);
                  setIsPlanListVisible(false);
                }}
              >
                <Text style={styles.inlineItemText}>{plan}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Формат файла */}
        <Text style={styles.sectionTitle}>Формат файла</Text>
        <Pressable style={styles.dropdownSelector} onPress={() => setIsFormatListVisible(!isFormatListVisible)}>
          <Text style={styles.dropdownText}>{selectedFormat}</Text>
          <Image source={iconChevronDown} style={styles.chevronIcon} resizeMode="contain" />
        </Pressable>

        {/* ВСТРОЕННЫЙ СПИСОК ФОРМАТОВ */}
        {isFormatListVisible && (
          <View style={styles.inlineList}>
            {FORMATS.map((format) => (
              <Pressable 
                key={format} 
                style={styles.inlineItem}
                onPress={() => {
                  setSelectedFormat(format);
                  setIsFormatListVisible(false);
                }}
              >
                <Text style={styles.inlineItemText}>{format}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Кнопка Экспортировать */}
        <Pressable style={styles.exportButton}>
          <Text style={styles.exportButtonText}>Экспортировать</Text>
        </Pressable>

      </SafeAreaView>

      <CalendarModal 
        visible={isCalendarVisible} 
        onClose={() => setIsCalendarVisible(false)} 
        onSave={(d) => setPeriod(d.getFullYear().toString())} 
      />
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

  periodSelector: {
    width: '100%',
    height: 68,
    backgroundColor: 'rgba(17, 111, 99, 0.6)',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  periodText: { fontSize: 20, fontWeight: '500', color: '#FFFFFF' },
  iconSmall: { width: 24, height: 24 },

  dropdownSelector: {
    width: '100%',
    height: 68,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16, // Уменьшили, так как список будет добавлять отступ
  },
  dropdownText: { fontSize: 20, fontWeight: '500', color: '#116F63' },
  chevronIcon: { width: 24, height: 24 },

  // Стили для встроенного списка
  inlineList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#116F63',
    marginBottom: 16,
    overflow: 'hidden',
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

  exportButton: {
    width: '100%',
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  exportButtonText: { fontSize: 20, fontWeight: '600', color: '#116F63' },
});