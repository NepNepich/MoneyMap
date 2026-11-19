import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface TableGridProps {
  startDate: Date;
  viewType?: 'Неделя' | 'Месяц' | 'Квартал' | 'Год';
}

// Форматирование дат для заголовков
const formatDateRange = (start: Date, end: Date) => {
  const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()} - ${end.getDate()} ${months[start.getMonth()]}`;
  }
  return `${start.getDate()} ${months[start.getMonth()]}\n${end.getDate()} ${months[end.getMonth()]}`;
};

export const TableGrid: React.FC<TableGridProps> = ({ startDate, viewType = 'Месяц' }) => {
  // 1. Формируем заголовки колонок
  const columns = [];
  
  if (viewType === 'Неделя') {
    for (let i = 0; i < 4; i++) {
      const start = new Date(startDate);
      start.setDate(startDate.getDate() + i * 7);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      columns.push({ label: formatDateRange(start, end) });
    }
  } else if (viewType === 'Месяц') {
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    for (let i = 0; i < 3; i++) {
      const monthIndex = (startDate.getMonth() + i) % 12;
      const year = startDate.getFullYear() + Math.floor((startDate.getMonth() + i) / 12);
      columns.push({ label: `${months[monthIndex]}\n${year}` });
    }
  } else if (viewType === 'Квартал') {
    const quarters = ['I кв', 'II кв', 'III кв', 'IV кв'];
    const currentQuarter = Math.floor(startDate.getMonth() / 3);
    for (let i = 0; i < 4; i++) {
      const qIndex = (currentQuarter + i) % 4;
      const year = startDate.getFullYear() + Math.floor((currentQuarter + i) / 4);
      columns.push({ label: `${quarters[qIndex]}\n${year}` });
    }
  } else {
    for (let i = 0; i < 3; i++) {
      columns.push({ label: `${startDate.getFullYear() + i}` });
    }
  }

  // 2. Мок-данные
  const tableData = [
    { id: '1', name: 'Доходы', type: 'header', values: Array(columns.length).fill('') },
    { id: '2', name: 'Подработка', values: Array(columns.length).fill('—') },
    { id: '3', name: 'Взятие займа', values: Array(columns.length).fill('—') },
    { id: '4', name: 'Баланс', type: 'balance', values: Array(columns.length).fill('0') },
    { id: '5', name: 'Расходы', type: 'header_expense', values: Array(columns.length).fill('') },
    { id: '6', name: 'Еда', values: Array(columns.length).fill('—') },
    { id: '7', name: 'Транспорт', values: Array(columns.length).fill('—') },
    { id: '8', name: 'Аренда', values: Array(columns.length).fill('—') },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.verticalScroll}>
      <View style={styles.tableRow}>
        
        {/* ЛЕВАЯ ФИКСИРОВАННАЯ КОЛОНКА */}
        <View style={styles.fixedColumn}>
          {/* Шапка первой колонки */}
          <View style={styles.headerCellName}>
            <Text style={styles.headerText}>Статья</Text>
          </View>
          
          {/* Данные первой колонки */}
          {tableData.map((row, index) => {
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            {/* Шапка дат */}
            <View style={styles.headerRow}>
              {columns.map((col, index) => (
                <View key={index} style={styles.headerCellDate}>
                  <Text style={styles.headerDateText}>{col.label}</Text>
                </View>
              ))}
            </View>

            {/* Данные по датам */}
            {tableData.map((row, index) => {
              const getValueColor = (val: string) => {
                if (val === '—' || val === '') return '#000000';
                if (val === '0') return '#4E60BD';
                return '#2D871F';
              };

              const isEven = index % 2 === 0;
              const rowBg = isEven ? '#FFFFFF' : '#F3F9F3';

              return (
                <View key={row.id} style={styles.dataRow}>
                  {row.values.map((val, colIndex) => (
                    <View key={colIndex} style={[styles.cellValue, { backgroundColor: rowBg }]}>
                      <Text style={[styles.cellValueText, { color: getValueColor(val) }]}>
                        {val}
                      </Text>
                    </View>
                  ))}
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
  
  // Фиксированная колонка
  fixedColumn: {
    width: 103.33,
    borderRightWidth: 1,
    borderColor: '#B0B0B0',
  },
  headerCellName: {
    height: 50, // Высота шапки
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#B0B0B0',
  },
  cellName: {
    height: 40, // Высота строки
    justifyContent: 'center',
    paddingLeft: 8,
    borderBottomWidth: 1,
    borderColor: '#B0B0B0',
  },
  cellNameText: { fontSize: 16, fontWeight: '600' },

  // Скроллируемая часть
  headerRow: {
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#B0B0B0',
  },
  headerCellDate: {
    width: 103.33,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#B0B0B0',
  },
  headerText: { fontSize: 20, fontWeight: '600', color: '#000000' },
  headerDateText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
    lineHeight: 18,
  },
  dataRow: { flexDirection: 'row' },
  cellValue: {
    width: 103.33,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#B0B0B0',
  },
  cellValueText: { fontSize: 16, fontWeight: '600' },
});