import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AccountCard } from '../components/ui/AccountCard';
import { Pagination } from '../components/ui/Pagination';
import { IconButton } from '../components/ui/IconButton';
import { useMenu } from '../context/MenuContext';
import { colors } from '../theme/tokens';

const accountsData = [
  { title: 'Счет №1', subtitle: 'Основной счет', balanceText: '10000.00 ₽' },
  { title: 'Счет №2', subtitle: 'Основной счет', balanceText: '5000.00 ₽' },
  { title: 'Счет №3', subtitle: 'Основной счет', balanceText: '20500.00 ₽' },
];

export const AccountsScreen: React.FC = () => {
  const { openMenu } = useMenu();
  const [activeIndex, setActiveIndex] = useState(0); 
  
  const { width } = useWindowDimensions();
  const scrollRef = useRef<any>(null);

  // Программный скролл к выбранному счету
  const scrollToIndex = (index: number) => {
    setActiveIndex(index);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: width * index, animated: true });
    }
  };

  const handleScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setActiveIndex(index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Счета</Text>
        <IconButton onPress={openMenu} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.balanceBlock}>
          <Text style={styles.balanceLabel}>Общий баланс</Text>
          <Text style={styles.totalBalance}>35 500,00 ₽</Text>
        </View>

        {/* Карусель */}
        <View style={styles.carouselWrapper}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd}
            // Это важно для работы свайпа на веб-версии:
            decelerationRate="fast" 
          >
            {accountsData.map((account, index) => (
              <View key={index} style={{ width: width }}>
                <AccountCard 
                  title={account.title} 
                  subtitle={account.subtitle} 
                  balanceText={account.balanceText} 
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Кликабельная пагинация (добавил onPress) */}
        <View style={styles.paginationWrapper}>
          <Pagination 
            total={accountsData.length} 
            activeIndex={activeIndex} 
            onDotPress={scrollToIndex} // Прокидываем функцию
          />
        </View>

        <View style={styles.actions}>
          <Pressable 
            style={({ pressed }) => [styles.primaryButton, pressed && { opacity: 0.8 }]}
          >
            <Text style={styles.buttonText}>Добавить счет</Text>
          </Pressable>
          
          <Pressable 
            style={({ pressed }) => [styles.secondaryButton, pressed && { opacity: 0.8 }]}
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 34, paddingTop: 35 },
  screenTitle: { fontSize: 28, color: colors.text, fontWeight: '400' },
  scrollContent: { paddingBottom: 40 },
  balanceBlock: { paddingHorizontal: 34, marginTop: 20 },
  balanceLabel: { fontSize: 20, color: '#767070', fontWeight: '400' },
  totalBalance: { fontSize: 36, fontWeight: '600', color: '#000000', marginTop: 4 },
  
  carouselWrapper: {
    marginTop: 10,
    height: 250,
  },
  paginationWrapper: {
    marginTop: 20,
  },

  actions: { marginTop: 40, paddingHorizontal: 34, gap: 16 },
  primaryButton: { width: '100%', height: 56, backgroundColor: '#116F63', borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#000000' },
  buttonText: { color: '#F6F8FC', fontSize: 24, fontWeight: '400' },
  secondaryButton: { width: '100%', height: 56, backgroundColor: '#E5F0ED', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  secondaryButtonText: { color: '#116F63', fontSize: 24, fontWeight: '400' },
});