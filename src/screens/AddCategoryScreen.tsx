import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppTextField } from '../components/ui/AppTextField';
import { TabButton } from '../components/ui/TabButton';
import { AppButton } from '../components/ui/AppButton';
import { IconButton } from '../components/ui/IconButton';
import { useMenu } from '../context/MenuContext';
import { colors } from '../theme/tokens';
import iconCategory from '../assets/icon-category.png';
import iconDeposit from '../assets/icon-deposit.png';
import iconCredit from '../assets/icon-credit.png';

type TabType = 'category' | 'deposit' | 'credit';

export const AddCategoryScreen: React.FC = () => {
  const { openMenu } = useMenu();
  const [activeTab, setActiveTab] = useState<TabType>('category'); // По умолчанию выбрана Категория
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const handleSave = () => console.log('Сохранение:', { activeTab, name, type });
  const handleCancel = () => console.log('Отмена');

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

          {/* Поля ввода */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Название категории</Text>
            <AppTextField 
              placeholder="Введите название" 
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Тип</Text>
            <AppTextField 
              placeholder="Выберите тип" 
              value={type}
              onChangeText={setType}
            />
          </View>

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
    marginBottom: 24,
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