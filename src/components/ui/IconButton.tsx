import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../theme/tokens';

interface IconButtonProps {
  onPress: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Меню"
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <View style={styles.line} />
      <View style={styles.line} />
      <View style={styles.line} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 62,
    height: 51,
    backgroundColor: colors.headerBtnBg,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  pressed: {
    opacity: 0.7,
  },
  line: {
    width: 24,
    height: 3,
    backgroundColor: colors.text,
    borderRadius: 1.5,
  },
});