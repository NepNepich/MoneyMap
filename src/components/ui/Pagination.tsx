import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

interface PaginationProps {
  total: number;
  activeIndex: number;
  onDotPress?: (index: number) => void; // Новый пропс
}

export const Pagination: React.FC<PaginationProps> = ({ total, activeIndex, onDotPress }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <Pressable
          key={index}
          onPress={() => onDotPress?.(index)}
          style={[
            styles.dot,
            index === activeIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  activeDot: { backgroundColor: '#12A58B' },
  inactiveDot: { backgroundColor: '#F6F8FC' },
});