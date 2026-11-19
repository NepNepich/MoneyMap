import React from 'react';
import { Pressable, Text, StyleSheet, TextStyle } from 'react-native';
import { colors } from '../../theme/tokens';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  textStyle?: TextStyle; // <--- ДОБАВЛЕНО
}

export const AppButton: React.FC<AppButtonProps> = ({ title, onPress, disabled, textStyle }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.text, textStyle]} numberOfLines={1} adjustsFontSizeToFit>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    height: 80, // Сделал выше, так как в макете кнопка 100x300
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    width: '100%',
  },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.5 },
  text: {
    color: colors.textOnPrimary,
    fontSize: 22, 
    fontWeight: '400',
  },
});