import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppTextField } from '../components/ui/AppTextField';
import { AppDateField } from '../components/ui/AppDateField';
import { TabButton } from '../components/ui/TabButton';
import { AppButton } from '../components/ui/AppButton';
import { IconButton } from '../components/ui/IconButton';
import { CalendarModal } from '../components/ui/CalendarModal'; // Импорт календаря
import { useMenu } from '../context/MenuContext';
import { colors } from '../theme/tokens';
import { useRouter } from 'expo-router';

const iconCategory = require('../assets/icon-category.png');
const iconDeposit = require('../assets/icon-deposit.png');
const iconCredit = require('../assets/icon-credit.png');

type TabType = 'category' | 'deposit' | 'credit';

export const AddCategoryScreen: React.FC = () => {
  const { openMenu } = useMenu();
  const [activeTab, setActiveTab] = useState<TabType>('category');

  const router = useRouter();
  
  // Поля формы
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [percent, setPercent] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');

  // Состояние для календаря
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleSave = () => console.log('Сохранение:', { activeTab, name, amount, percent, type, date });
  const handleCancel = () => {
    router.back();
    console.log('Отмена');
  };

  // Открытие календаря
  const handleDatePress = () => {
    setIsCalendarVisible(true);
  };

  // Сохранение выбранной даты из календаря
  const handleSaveDate = (selectedDate: Date) => {
    const formattedDate = `${selectedDate.getDate().toString().padStart(2, '0')}.${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}.${selectedDate.getFullYear()}`;
    setDate(formattedDate);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        
        {/* Шапка */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Добавить статью</Text>
          <IconButton onPress={openMenu} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Блок вкладок */}
          <View style={styles.tabsRow}>
            <TabButton 
              iconSource={iconCategory} 
              label="Категория" 
              isSelected={activeTab === 'category'} 
              onPress={() => setActiveTab('category')} 
            />
            <TabButton 
              iconSource={iconDeposit} 
              label="Депозит" 
              isSelected={activeTab === 'deposit'} 
              onPress={() => setActiveTab('deposit')} 
            />
            <TabButton 
              iconSource={iconCredit} 
              label="Кредит" 
              isSelected={activeTab === 'credit'} 
              onPress={() => setActiveTab('credit')} 
            />
          </View>

          {/* УСЛОВНЫЙ РЕНДЕРИНГ ПОЛЕЙ */}
          
          {activeTab === 'category' && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Название категории</Text>
                <AppTextField placeholder="Введите название" value={name} onChangeText={setName} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Тип</Text>
                <AppTextField placeholder="Выберите тип" value={type} onChangeText={setType} />
              </View>
            </>
          )}

          {activeTab === 'deposit' && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Название депозита</Text>
                <AppTextField placeholder="Введите название" value={name} onChangeText={setName} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Сумма</Text>
                <AppTextField placeholder="Введите сумму" keyboardType="numeric" value={amount} onChangeText={setAmount} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Процент</Text>
                <AppTextField placeholder="Введите процент дохода" keyboardType="numeric" value={percent} onChangeText={setPercent} />
              </View>
            </>
          )}

          {activeTab === 'credit' && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Название кредита</Text>
                <AppTextField placeholder="Введите название" value={name} onChangeText={setName} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Сумма</Text>
                <AppTextField placeholder="Выберите сумму долга" keyboardType="numeric" value={amount} onChangeText={setAmount} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Процент</Text>
                <AppTextField placeholder="Введите процент кредита" keyboardType="numeric" value={percent} onChangeText={setPercent} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Дата</Text>
                <AppDateField 
                  value={date} 
                  placeholder="Выберите дату" 
                  onPress={handleDatePress} 
                />
              </View>
            </>
          )}

          {/* Кнопки */}
          <View style={styles.actions}>
            <AppButton 
              title="СОХРАНИТЬ" 
              onPress={handleSave} 
              textStyle={{ fontSize: 36, fontWeight: '700', textTransform: 'uppercase' }}
            />
            <Pressable 
              style={({ pressed }) => [styles.cancelButton, pressed && { opacity: 0.8 }]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Отмена</Text>
            </Pressable>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Модальное окно календаря */}
      <CalendarModal 
        visible={isCalendarVisible} 
        onClose={() => setIsCalendarVisible(false)} 
        onSave={handleSaveDate} 
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 35,
    marginBottom: 20,
  },
  screenTitle: { fontSize: 28, color: colors.text, fontWeight: '400' },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16, 
  },
  label: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '300',
    marginBottom: 8,
  },
  actions: {
    marginTop: 'auto',
    gap: 16,
    paddingTop: 40,
  },
  cancelButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#E5F0ED',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#116F63',
    fontSize: 28,
    fontWeight: '400',
  },
});