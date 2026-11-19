import React from 'react';
import { View, StyleSheet } from 'react-native';

interface PaginationProps {
  total: number;
  activeIndex: number;
}

export const Pagination: React.FC<PaginationProps> = ({ total, activeIndex }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
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
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activeDot: {
    backgroundColor: '#12A58B', // Accent из Figma
  },
  inactiveDot: {
    backgroundColor: '#F6F8FC', // Светлый цвет из Figma
  },
});