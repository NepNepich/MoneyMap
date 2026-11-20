import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface TableGridProps {
  startDate: Date;
  viewType?: 'Неделя' | 'Месяц' | 'Квартал' | 'Год';
  isFact?: boolean;
}

// Мок-данные
// isFact: true - факт (зеленый/синий), false - план (серый)
const rawTableData = [
  { id: '1', name: 'Доходы', type: 'header', values: Array(12).fill({ v: '', isFact: true }) },
  { id: '2', name: 'Подработка', values: Array(12).fill({ v: '—', isFact: true }) },
  { id: '3', name: 'Взятие займа', values: [{ v: '1 000', isFact: false }, { v: '1 000', isFact: true }, ...Array(10).fill({ v: '—', isFact: true })] },
  { id: '4', name: 'Баланс', type: 'balance', values: [{ v: '0', isFact: true }, { v: '1 000', isFact: true }, ...Array(10).fill({ v: '—', isFact: true })] },
  { id: '5', name: 'Расходы', type: 'header_expense', values: Array(12).fill({ v: '', isFact: true }) },
  { id: '6', name: 'Еда', values: [{ v: '—', isFact: true }, { v: '5056', isFact: false }, ...Array(10).fill({ v: '—', isFact: true })] },
  { id: '7', name: 'Транспорт', values: Array(12).fill({ v: '—', isFact: true }) },
  { id: '8', name: 'Аренда', values: Array(12).fill({ v: '—', isFact: true }) },
  { id: '9', name: 'Интернет', values: Array(12).fill({ v: '—', isFact: true }) },
  { id: '10', name: 'Мобильная связь', values: Array(12).fill({ v: '—', isFact: true }) },
  { id: '11', name: 'Развлечения', values: Array(12).fill({ v: '—', isFact: true }) },
];

export const TableGrid: React.FC<TableGridProps> = ({ startDate, viewType = 'Месяц', isFact = true }) => {
  const fixedColWidth = 120;
  const dataColWidth = 100;

  const columns = [];
  
  if (viewType === 'Неделя') {
    const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    for (let i = 0; i < 12; i++) {
      const start = new Date(startDate);
      start.setDate(startDate.getDate() + i * 7);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      columns.push({ label: `${start.getDate()} ${months[start.getMonth()]}\n${end.getDate()} ${months[end.getMonth()]}` });
    }
  } else if (viewType === 'Месяц') {
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    for (let i = 0; i < 12; i++) {
      const monthIndex = (startDate.getMonth() + i) % 12;
      const year = startDate.getFullYear() + Math.floor((startDate.getMonth() + i) / 12);
      columns.push({ label: `${months[monthIndex]}\n${year}` });
    }
  } else if (viewType === 'Квартал') {
    const quarters = ['I кв', 'II кв', 'III кв', 'IV кв'];
    const currentQuarter = Math.floor(startDate.getMonth() / 3);
    for (let i = 0; i < 12; i++) {
      const qIndex = (currentQuarter + i) % 4;
      const year = startDate.getFullYear() + Math.floor((currentQuarter + i) / 4);
      columns.push({ label: `${quarters[qIndex]}\n${year}` });
    }
  } else {
    for (let i = 0; i < 12; i++) {
      columns.push({ label: `${startDate.getFullYear() + i}` });
    }
  }

  // Функция для определения цвета текста
  const getValueColor = (val: string, isPlan: boolean, isBalanceRow: boolean) => {
    if (val === '—') return '#000000';
    if (isBalanceRow) return '#4E60BD'; // Баланс всегда синий
    if (isPlan) return '#848080'; // Плановые значения серые
    return '#2D871F'; // Фактические значения зеленые
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.verticalScroll}>
      <View style={styles.tableRow}>
        
        {/* ЛЕВАЯ ФИКСИРОВАННАЯ КОЛОНКА */}
        <View style={[styles.fixedColumn, { width: fixedColWidth }]}>
          <View style={styles.headerCellName}>
            <Text style={styles.headerText}>Статья</Text>
          </View>
          
          {rawTableData.map((row, index) => {
            let textColor = '#000000';
            if (row.type === 'header') textColor = '#2D871F';
            if (row.type === 'header_expense') textColor = '#BD4E4E';
            if (row.type === 'balance') textColor = '#4E60BD';

            const isEven = index % 2 === 0;
            const rowBg = isEven ? '#FFFFFF' : '#F3F9F3';

            return (
              <View key={row.id} style={[styles.cellName, { backgroundColor: rowBg }]}>
                <Text style={[styles.cellNameText, { color: textColor }]} numberOfLines={2}>
                  {row.name}
                </Text>
              </View>
            );
          })}
        </View>

        {/* ПРАВАЯ СКРОЛЛИРУЕМАЯ ЧАСТЬ */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true} 
          nestedScrollEnabled={true} 
          style={styles.horizontalScroll}
        >
          <View>
            <View style={styles.headerRow}>
              {columns.map((col, index) => (
                <View key={index} style={[styles.headerCellDate, { width: dataColWidth }]}>
                  <Text style={styles.headerDateText}>{col.label}</Text>
                </View>
              ))}
            </View>

            {rawTableData.map((row, index) => {
              const isEven = index % 2 === 0;
              const rowBg = isEven ? '#FFFFFF' : '#F3F9F3';
              const isBalanceRow = row.type === 'balance';

              return (
                <View key={row.id} style={styles.dataRow}>
                  {row.values.map((cell, colIndex) => {
                    // Если выбран "План", показываем только те ячейки, которые помечены как план (isFact: false)
                    // Если выбран "Факт", показываем только те, что помечены как факт (isFact: true)
                    const showValue = cell.isFact === isFact;
                    const val = showValue ? cell.v : '—';
                    
                    // Определяем цвет для конкретной ячейки
                    const color = showValue 
                      ? getValueColor(cell.v, !cell.isFact, isBalanceRow)
                      : '#000000'; // Если ячейка скрыта, цвет черный (для прочерка)

                    return (
                      <View key={colIndex} style={[styles.cellValue, { width: dataColWidth, backgroundColor: rowBg }]}>
                        <Text style={[styles.cellValueText, { color }]}>
                          {val}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </ScrollView>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  verticalScroll: { flex: 1, backgroundColor: '#FFFFFF' },
  tableRow: { flexDirection: 'row' },
  
  fixedColumn: { borderRightWidth: 1, borderColor: '#B0B0B0' },
  headerCellName: { height: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: '#B0B0B0' },
  cellName: { height: 40, justifyContent: 'center', paddingLeft: 8, borderBottomWidth: 1, borderColor: '#B0B0B0' },
  cellNameText: { fontSize: 16, fontWeight: '600' },

  horizontalScroll: { flex: 1 },
  headerRow: { flexDirection: 'row', height: 50, borderBottomWidth: 1, borderColor: '#B0B0B0' },
  headerCellDate: { justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderColor: '#B0B0B0' },
  headerText: { fontSize: 20, fontWeight: '600', color: '#000000' },
  headerDateText: { fontSize: 14, fontWeight: '600', textAlign: 'center', color: '#000000', lineHeight: 18 },
  
  dataRow: { flexDirection: 'row' },
  cellValue: { height: 40, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#B0B0B0' },
  cellValueText: { fontSize: 16, fontWeight: '600' },
});