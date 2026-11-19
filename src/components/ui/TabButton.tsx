import React from 'react';
import { Pressable, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface TabButtonProps {
  iconSource: ImageSourcePropType; // Теперь передаем сюда картинку
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({ iconSource, label, isSelected, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isSelected && styles.selected,
        pressed && { opacity: 0.7 },
      ]}
    >
      <Image source={iconSource} style={styles.icon} resizeMode="contain" />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 70,
    borderRadius: 16,
    backgroundColor: '#E5F0ED',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 6, // Чуть увеличили отступ между иконкой и текстом
  },
  selected: {
    borderColor: '#116F63',
  },
  icon: {
    width: 24, // Размер иконки подберите по макету (обычно 24x24 или 32x32)
    height: 24,
  },
  label: {
    fontSize: 12,
    color: '#000000',
  },
});