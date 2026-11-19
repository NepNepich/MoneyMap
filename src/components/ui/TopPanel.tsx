import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconButton } from './IconButton';
import { CalendarModal } from './CalendarModal';
import { ViewTypeModal } from './ViewTypeModal';

const iconCalendar = require('../../assets/icon-calendar.png');
const iconLayers = require('../../assets/icon-layers.png');
const iconChevron = require('../../assets/icon-chevron.png');

// Обновленный интерфейс с новыми пропсами
interface TopPanelProps {
  onMenuPress: () => void;
  onDateChange?: (date: Date) => void;
  onViewChange?: (viewType: 'Неделя' | 'Месяц' | 'Квартал' | 'Год') => void;
}

export const TopPanel: React.FC<TopPanelProps> = ({ 
  onMenuPress, 
  onDateChange, 
  onViewChange 
}) => {
  // Состояния для модалок
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isViewTypeVisible, setIsViewTypeVisible] = useState(false);
  
  // Состояние для переключения Факт/План
  const [isFact, setIsFact] = useState(true);

  // Обработчик выбора даты
  const handleSaveDate = (date: Date) => {
    console.log('Выбрана дата:', date.toLocaleDateString('ru-RU'));
    if (onDateChange) onDateChange(date); // Передаем наверх в TableScreen
  };

  // Обработчик выбора вида таблицы
  const handleSelectViewType = (viewType: string) => {
    console.log('Выбран вид таблицы:', viewType);
    if (onViewChange) onViewChange(viewType as any); // Передаем наверх в TableScreen
  };

  return (
    <>
      <LinearGradient
        colors={['#2BB673', '#116F63']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Таблица</Text>
          <IconButton onPress={onMenuPress} />
        </View>

        {/* ПЕРВЫЙ РЯД КНОПОК */}
        <View style={styles.filtersRow}>
          {/* Кнопка Ноябрь 2026 */}
          <Pressable style={styles.buttonWide} onPress={() => setIsCalendarVisible(true)}>
            <View style={styles.buttonContent}>
              <Image source={iconCalendar} style={styles.icon} resizeMode="contain" />
              <Text style={styles.filterText}>Ноябрь 2026</Text>
            </View>
            <Image source={iconChevron} style={styles.chevronIcon} resizeMode="contain" />
          </Pressable>

          {/* Кнопка Вид */}
          <Pressable style={styles.buttonNarrow} onPress={() => setIsViewTypeVisible(true)}>
            <Text style={styles.filterText}>Вид</Text>
            <Image source={iconChevron} style={styles.chevronIcon} resizeMode="contain" />
          </Pressable>
        </View>

        {/* ВТОРОЙ РЯД КНОПОК */}
        <View style={styles.filtersRow}>
          {/* Кнопка Основной план */}
          <Pressable style={styles.buttonWide}>
            <View style={styles.buttonContent}>
              <Image source={iconLayers} style={styles.icon} resizeMode="contain" />
              <Text style={styles.filterText}>Основной план</Text>
            </View>
            <Image source={iconChevron} style={styles.chevronIcon} resizeMode="contain" />
          </Pressable>

          {/* Кнопка Факт / План */}
          <Pressable style={styles.buttonNarrow} onPress={() => setIsFact(!isFact)}>
            <Text style={styles.filterText}>{isFact ? 'Факт' : 'План'}</Text>
          </Pressable>
        </View>

        {/* Карточки с показателями */}
        <View style={styles.cardsRow}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Баланс</Text>
            <Text style={styles.cardValue}>2 500 ₽</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Накопления</Text>
            <Text style={styles.cardValue}>10 000 ₽</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Задолженность</Text>
            <Text style={styles.cardValue}>0 ₽</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Модальные окна */}
      <CalendarModal 
        visible={isCalendarVisible} 
        onClose={() => setIsCalendarVisible(false)} 
        onSave={handleSaveDate} 
      />
      
      <ViewTypeModal
        visible={isViewTypeVisible}
        onClose={() => setIsViewTypeVisible(false)}
        onSelect={handleSelectViewType}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  buttonWide: {
    flex: 65,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    height: 71,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  buttonNarrow: {
    flex: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    height: 71,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  chevronIcon: {
    width: 24,
    height: 24,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 8,
  },
  card: {
    flex: 1,
    backgroundColor: '#E5F0ED',
    borderRadius: 16,
    padding: 12,
    borderWidth: 2,
    borderColor: '#D9D9D9',
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#116F63',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
});