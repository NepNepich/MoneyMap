import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppTextField } from '../components/ui/AppTextField';
import { AppButton } from '../components/ui/AppButton';
import { IconButton } from '../components/ui/IconButton';
import { useMenu } from '../context/MenuContext';
import { colors } from '../theme/tokens';

export const AddAccountScreen: React.FC = () => {
  const { openMenu } = useMenu();
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSave = () => {
    console.log('Сохранение:', { accountName, amount });
  };

  const handleCancel = () => {
    console.log('Отмена');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* KeyboardAvoidingView нужен, чтобы клавиатура не перекрывала поля */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        {/* Шапка */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Добавить счет</Text>
          <IconButton onPress={openMenu} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Поле Название */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Название счета</Text>
            <AppTextField 
              placeholder="Введите название" 
              value={accountName}
              onChangeText={setAccountName}
            />
          </View>

          {/* Поле Сумма */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Сумма</Text>
            <AppTextField 
              placeholder="Введите сумму" 
              keyboardType="numeric" // Открывает цифровую клавиатуру
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          {/* Кнопки внизу */}
          <View style={styles.actions}>
            <AppButton 
              title="СОХРАНИТЬ" 
              onPress={handleSave} 
              // Переопределяем стили текста для AppButton, чтобы он был жирным и большим
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
    paddingHorizontal: 24, // Отступы из Figma
    paddingTop: 35,
    marginBottom: 20,
  },
  screenTitle: { 
    fontSize: 28, 
    color: colors.text, 
    fontWeight: '400' 
  },
  scrollContent: {
    paddingHorizontal: 24, // Отступы контента
    paddingBottom: 40,
    flexGrow: 1, // Чтобы прижать кнопки к низу
    justifyContent: 'space-between',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 32, // Размер из Figma (для "Название счета" и "Сумма")
    color: '#000000',
    fontWeight: '300', // Light
    marginBottom: 8,
  },
  actions: {
    marginTop: 'auto', // Прижимает кнопки к низу
    gap: 16,
    paddingTop: 40,
  },
  cancelButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#E5F0ED', // Grey_Cancel
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