import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopPanel } from '../components/ui/TopPanel';
import { TableGrid } from '../components/ui/TableGrid';
import { useMenu } from '../context/MenuContext';

export const TableScreen: React.FC = () => {
  const { openMenu } = useMenu();
  
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 10, 8)); // 8 ноября 2026
  const [viewType, setViewType] = useState<'Неделя' | 'Месяц' | 'Квартал' | 'Год'>('Месяц');
  const [isFact, setIsFact] = useState(true); 

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <TopPanel 
          onMenuPress={openMenu} 
          onDateChange={setSelectedDate}
          onViewChange={setViewType}
          onIsFactChange={setIsFact}
        />
        
        <TableGrid 
          startDate={selectedDate} 
          viewType={viewType} 
          isFact={isFact} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1 },
});