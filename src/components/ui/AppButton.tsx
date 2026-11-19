import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/tokens';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

// Обратите внимание на слово export перед const
export const AppButton: React.FC<AppButtonProps> = ({ title, onPress, disabled }) => {
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
      <Text style={styles.text} numberOfLines={1} adjustsFontSizeToFit>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    width: '100%',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: colors.textOnPrimary,
    fontSize: 22, 
    fontWeight: '400',
  },
});