import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from '../components/ui/IconButton';
import { useMenu } from '../context/MenuContext';

// Иконки
const iconCard = require('../assets/icon-card.png'); // Иконка карты
const iconCheck = require('../assets/icon-check.png'); // Иконка галочки

const ACCOUNTS = [
  { id: '1', name: 'Счёт №1', appBalance: '10 000,00 ₽', factBalance: '9 800,00 ₽' },
  { id: '2', name: 'Счёт №2', appBalance: '5 000,00 ₽', factBalance: '5 000,00 ₽' },
  { id: '3', name: 'Счёт №3', appBalance: '20 500,00 ₽', factBalance: '20 800,00 ₽' },
];

export const ReconciliationScreen: React.FC = () => {
  const { openMenu } = useMenu();

  return (
    // Убрали LinearGradient, теперь просто View с фоном #F6F8FC
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Шапка */}
        <View style={styles.header}>
          <Text style={styles.title}>Сверка баланса</Text>
          <IconButton onPress={openMenu} />
        </View>

        {/* Карточка с общей разницей */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Общее расхождение</Text>
          <Text style={styles.totalValue}>+100,00 ₽</Text>
        </View>

        {/* Список счетов */}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.accountsList}>
          {ACCOUNTS.map((account) => (
            <View key={account.id} style={styles.accountCard}>
              
              {/* Заголовок счёта */}
              <View style={styles.accountHeader}>
                <View style={styles.accountTitleRow}>
                  <Image source={iconCard} style={styles.cardIcon} resizeMode="contain" />
                  <Text style={styles.accountName}>{account.name}</Text>
                </View>
              </View>

              {/* Данные приложения */}
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>По данным приложения</Text>
                <Text style={styles.dataValue}>{account.appBalance}</Text>
              </View>

              {/* Фактические данные (в зеленой плашке) */}
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Фактически</Text>
                <View style={styles.factBadge}>
                  <Image source={iconCheck} style={styles.checkIcon} resizeMode="contain" />
                  <Text style={styles.factValue}>{account.factBalance}</Text>
                </View>
              </View>

            </View>
          ))}
        </ScrollView>

        {/* Кнопки */}
         <View style={styles.actions}>
          {/* Верхняя группа кнопок */}
          <View style={styles.topButtons}>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Учесть разницу</Text>
            </Pressable>
            
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Перейти в таблицу</Text>
            </Pressable>
          </View>

          {/* Нижняя кнопка (Отмена) */}
          <Pressable style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Отмена</Text>
          </Pressable>
        </View>

      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F6F8FC' // <--- ЦВЕТ ФОНА КАК НА СКРИНШОТЕ
  },
  safeArea: { flex: 1, paddingHorizontal: 24 },
  
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingTop: 20, 
    marginBottom: 16 
  },
  title: { 
    fontSize: 32, 
    fontWeight: '500', 
    color: '#000000' 
  },

  totalCard: {
    width: '100%',
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    padding: 16,
    marginBottom: 16,
    justifyContent: 'center',
  },
  totalLabel: { 
    fontSize: 12, 
    fontWeight: '400', 
    color: '#000000', 
    marginBottom: 8 
  },
  totalValue: { 
    fontSize: 32, 
    fontWeight: '500', 
    color: '#16805B' 
  },

  accountsList: { 
    flex: 1, 
    marginBottom: 16 
  },

  accountCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    padding: 16,
    marginBottom: 12,
  },
  accountHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    paddingBottom: 12,
    marginBottom: 12,
  },
  accountTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardIcon: {
    width: 20,
    height: 20,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },

  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dataLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  dataValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
  },

  // Стили для зеленой плашки с фактическим балансом
  factBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(22, 128, 91, 0.1)', // Светло-зеленый фон (10% прозрачности)
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  checkIcon: {
    width: 16,
    height: 16,
  },
  factValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000', // Или #16805B, если нужен зеленый текст
  },

   actions: {
    paddingBottom: 24,
    gap: 95, // <--- ОТСТУП МЕЖДУ ГРУППОЙ И КНОПКОЙ ОТМЕНЫ
  },
  topButtons: {
    gap: 12, // <--- ОТСТУП МЕЖДУ ВЕРХНИМИ КНОПКАМИ
  },
  primaryButton: {
    width: '100%',
    height: 51.26,
    backgroundColor: '#116F63',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D871F',
  },
  primaryButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    width: '100%',
    height: 51.26,
    backgroundColor: '#E5F0ED',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#116F63',
  },
  secondaryButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#116F63',
  },
  cancelButton: {
    width: '100%',
    height: 51.26,
    backgroundColor: '#E5F0ED',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#16805B',
  },
});