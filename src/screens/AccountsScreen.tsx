import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AccountCard } from '../components/ui/AccountCard';
import { Pagination } from '../components/ui/Pagination';
import { IconButton } from '../components/ui/IconButton';
import { useMenu } from '../context/MenuContext'; // Импорт контекста
import { colors } from '../theme/tokens';

export const AccountsScreen: React.FC = () => {
  const { openMenu } = useMenu(); // Берем функцию открытия

  const handleAddAccount = () => console.log('Добавить счет');
  const handleGoToMenu = () => console.log('Перейти в меню');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Счета</Text>
        <IconButton onPress={openMenu} /> {/* Привязка к контексту */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.balanceBlock}>
          <Text style={styles.balanceLabel}>Общий баланс</Text>
          <Text style={styles.totalBalance}>35 500,00 ₽</Text>
        </View>

        <AccountCard title="Счет №1" subtitle="Основной счет" balanceText="10000.00 ₽" />

        <Pagination total={3} activeIndex={0} />

        <View style={styles.actions}>
          <Pressable 
            style={({ pressed }) => [styles.primaryButton, pressed && { opacity: 0.8 }]}
            onPress={handleAddAccount}
          >
            <Text style={styles.buttonText}>Добавить счет</Text>
          </Pressable>
          
          <Pressable 
            style={({ pressed }) => [styles.secondaryButton, pressed && { opacity: 0.8 }]}
            onPress={handleGoToMenu}
          >
            <Text style={styles.secondaryButtonText}>Перейти в меню</Text>
          </Pressable>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 34,
    paddingTop: 35,
  },
  screenTitle: { fontSize: 28, color: colors.text, fontWeight: '400' },
  scrollContent: { paddingBottom: 40 },
  balanceBlock: { paddingHorizontal: 34, marginTop: 20 },
  balanceLabel: { fontSize: 20, color: '#767070', fontWeight: '400' },
  totalBalance: { fontSize: 36, fontWeight: '600', color: '#000000', marginTop: 4 },
  actions: {
    marginTop: 60, 
    paddingHorizontal: 34,
    gap: 16,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#116F63',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  buttonText: { color: '#F6F8FC', fontSize: 24, fontWeight: '400' },
  secondaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#E5F0ED',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: { color: '#116F63', fontSize: 24, fontWeight: '400' },
});