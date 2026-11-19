import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface AppTextFieldProps extends TextInputProps {
  // Наследуем все стандартные пропсы TextInput (value, onChangeText, placeholder и т.д.)
}

export const AppTextField: React.FC<AppTextFieldProps> = ({ style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#116F63" // Цвет текста "Введите название" из Figma
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 60, // Из Figma (300x60.17)
    backgroundColor: '#E5F0ED', // Grey_Cancel
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 20, // Размер текста из Figma
    color: '#000000',
    // Для шрифта Inter нужно будет добавить fontFamily, если вы его подключили
  },
});