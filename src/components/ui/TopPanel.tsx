import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconButton } from './IconButton';
import { CalendarModal } from './CalendarModal';
import { ViewTypeModal } from './ViewTypeModal';
import { AddPlanModal } from './AddPlanModal';

const iconCalendar = require('../../assets/icon-calendar.png');
const iconLayers = require('../../assets/icon-layers.png');
const iconChevron = require('../../assets/icon-chevron.png');

interface TopPanelProps {
  onMenuPress: () => void;
  onDateChange?: (date: Date) => void;
  onViewChange?: (viewType: 'Неделя' | 'Месяц' | 'Квартал' | 'Год') => void;
  onIsFactChange?: (isFact: boolean) => void;
}

const PLANS = ['План на отпуск', 'Накопления', 'На машину'];

export const TopPanel: React.FC<TopPanelProps> = ({ 
  onMenuPress, onDateChange, onViewChange, onIsFactChange 
}) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isViewTypeVisible, setIsViewTypeVisible] = useState(false);
  const [isFact, setIsFact] = useState(true);
  
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Основной план');
  
  const [isAddPlanVisible, setIsAddPlanVisible] = useState(false);

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    setIsPlanOpen(false);
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

        {/* 1 РЯД */}
        <View style={styles.filtersRow}>
          <Pressable style={styles.buttonWideLeft} onPress={() => setIsCalendarVisible(true)}>
            <View style={styles.buttonContent}>
              <Image source={iconCalendar} style={styles.icon} resizeMode="contain" />
              <Text style={styles.filterText}>Ноябрь 2026</Text>
            </View>
            <Image source={iconChevron} style={styles.chevronIcon} resizeMode="contain" />
          </Pressable>

          <Pressable style={styles.buttonNarrowRight} onPress={() => setIsViewTypeVisible(true)}>
            <Text style={styles.filterText}>Вид</Text>
            <Image source={iconChevron} style={styles.chevronIcon} resizeMode="contain" />
          </Pressable>
        </View>

        {/* 2 РЯД */}
        <View style={[styles.filtersRow, { zIndex: 10 }]}>
          
          <View style={styles.planWrapper}>
            <Pressable 
              style={[
                styles.buttonWideLeft, 
                { width: '100%' }, // <--- ДОБАВИТЬ ЭТО
                isPlanOpen && styles.buttonWideActive
              ]} 
              onPress={() => setIsPlanOpen(!isPlanOpen)}
            >
              <View style={styles.buttonContent}>
                <Image source={iconLayers} style={styles.icon} resizeMode="contain" />
                <Text style={styles.filterText} numberOfLines={1}>{selectedPlan}</Text>
              </View>
              <Image 
                source={iconChevron} 
                style={[styles.chevronIcon, isPlanOpen && { transform: [{ rotate: '180deg' }] }]} 
                resizeMode="contain" 
              />
            </Pressable>

            {isPlanOpen && (
              <View style={styles.dropdownContainer}>
                {PLANS.map((plan) => (
                  <Pressable key={plan} style={styles.planItem} onPress={() => handleSelectPlan(plan)}>
                    <Text style={styles.planItemText}>{plan}</Text>
                  </Pressable>
                ))}
                
                <View style={styles.divider} />
                
                <Pressable 
                  style={styles.createPlanButton} 
                  onPress={() => {
                    setIsPlanOpen(false);
                    setIsAddPlanVisible(true);
                  }}
                >
                  <Text style={styles.createPlanText}>Создать план</Text>
                </Pressable>
              </View>
            )}
          </View>

          <Pressable style={styles.buttonNarrowRight} onPress={() => setIsFact(!isFact)}>
            <Text style={styles.filterText}>{isFact ? 'Факт' : 'План'}</Text>
          </Pressable>
        </View>

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

      <CalendarModal visible={isCalendarVisible} onClose={() => setIsCalendarVisible(false)} onSave={(d) => onDateChange?.(d)} />
      <ViewTypeModal visible={isViewTypeVisible} onClose={() => setIsViewTypeVisible(false)} onSelect={(v) => onViewChange?.(v as any)} />
      
      <AddPlanModal 
        visible={isAddPlanVisible} 
        onClose={() => setIsAddPlanVisible(false)} 
        onSave={(newPlanName) => {
          console.log('Новый план:', newPlanName);
          setSelectedPlan(newPlanName);
        }} 
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { 
    paddingHorizontal: 20, 
    paddingTop: 40, 
    paddingBottom: 20,
    zIndex: 10,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 40, fontWeight: '600', color: '#FFFFFF' },
  
  filtersRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10, 
    gap: 10,
  },
  
   buttonWideLeft: { 
    width: '65%', // Жесткая ширина в процентах
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: 16, 
    height: 71, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16 
  },
  
  buttonWideActive: {
    backgroundColor: '#4A9A7E',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  
   buttonNarrowRight: { 
    width: '35%', 
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: 16, 
    height: 71, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 16 
  },
  
  buttonContent: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  icon: { width: 24, height: 24 },
  filterText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
  chevronIcon: { width: 24, height: 24 },

  planWrapper: {
    width: '65%', // Теперь обертка тоже ровно 65%
    position: 'relative', 
    zIndex: 100,
  },

  dropdownContainer: {
    position: 'absolute',
    top: 71, 
    left: 0,
    right: 0,
    backgroundColor: '#4A9A7E',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 12,
    paddingTop: 8,
    zIndex: 999,
    elevation: 10,
  },
  planItem: {
    width: '100%',
    height: 60,
    backgroundColor: '#E5F0ED',
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  planItemText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#116F63',
  },
  
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    width: '100%',
    marginVertical: 8,
  },

  createPlanButton: {
    width: '100%',
    height: 54,
    backgroundColor: '#E5F0ED',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createPlanText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#116F63',
  },

  cardsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, gap: 8 },
  card: { flex: 1, backgroundColor: '#E5F0ED', borderRadius: 16, padding: 12, borderWidth: 2, borderColor: '#D9D9D9' },
  cardLabel: { fontSize: 13, fontWeight: '600', color: '#116F63', marginBottom: 4 },
  cardValue: { fontSize: 20, fontWeight: '700', color: '#000000' },
});