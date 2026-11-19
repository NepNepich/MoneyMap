import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

interface AppDateFieldProps {
  value?: string;
  placeholder?: string;
  onPress: () => void;
}

export const AppDateField: React.FC<AppDateFieldProps> = ({ value, placeholder = 'Выберите дату', onPress }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
      <Text style={value ? styles.valueText : styles.placeholderText}>
        {value || placeholder}
      </Text>
      
      {/* Иконка стрелочки вниз (имитация SVG кодом) */}
      <View style={styles.chevronContainer}>
        <View style={styles.chevron} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: '#E5F0ED',
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pressed: {
    opacity: 0.8,
  },
  placeholderText: {
    fontSize: 20,
    color: '#116F63', // Цвет текста из Figma
  },
  valueText: {
    fontSize: 20,
    color: '#000000',
  },
  chevronContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.3, // В Figma указано 30% прозрачности
  },
  chevron: {
    width: 10,
    height: 10,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#000000',
    transform: [{ rotate: '45deg' }],
    marginTop: -4, // Выравнивание галочки
  },
});