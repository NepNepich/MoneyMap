import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (date: Date) => void;
}

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

export const CalendarModal: React.FC<CalendarModalProps> = ({ visible, onClose, onSave }) => {
  // Состояние текущего отображаемого месяца (начинаем с Ноября 2026)
  const [viewDate, setViewDate] = useState(new Date(2026, 10, 1)); 
  // Состояние выбранной даты
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 10, 8));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // Логика перелистывания
  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  // Генерация сетки
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Пн = 0
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days = [];

  // Дни прошлого месяца
  for (let i = startOffset - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
  }

  // Дни текущего месяца
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrentMonth: true });
  }

  // Дни следующего месяца
  const totalCells = days.length > 35 ? 42 : 35;
  const nextMonthDaysNeeded = totalCells - days.length;
  for (let i = 1; i <= nextMonthDaysNeeded; i++) {
    days.push({ day: i, isCurrentMonth: false });
  }

  const handleDayPress = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;
    setSelectedDate(new Date(year, month, day));
  };

  const handleSave = () => {
    if (selectedDate) onSave(selectedDate);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              
              {/* Шапка с перелистыванием */}
              <View style={styles.header}>
                <Pressable onPress={handlePrevMonth} hitSlop={10} style={styles.arrowButton}>
                  <Text style={styles.arrowText}>{'<'}</Text>
                </Pressable>
                
                <Text style={styles.title}>
                  {MONTHS[month]} {year}
                </Text>
                
                <Pressable onPress={handleNextMonth} hitSlop={10} style={styles.arrowButton}>
                  <Text style={styles.arrowText}>{'>'}</Text>
                </Pressable>
              </View>

              {/* Сетка */}
              <View style={styles.grid}>
                {days.map((item, index) => {
                  const isSelected = item.isCurrentMonth && 
                                     selectedDate?.getDate() === item.day && 
                                     selectedDate?.getMonth() === month && 
                                     selectedDate?.getFullYear() === year;
                  
                  // Проверка на "сегодня" (временно привязано к 8 числу, как в макете)
                  const isToday = item.isCurrentMonth && item.day === 8 && month === 10 && year === 2026;

                  return (
                    <Pressable
                      key={index}
                      onPress={() => handleDayPress(item.day, item.isCurrentMonth)}
                      style={[
                        styles.dayCell,
                        isSelected && styles.selectedDayCell,
                        isToday && styles.currentDayCell,
                        !item.isCurrentMonth && styles.disabledDayCell
                      ]}
                    >
                      <Text style={[
                        styles.dayText, 
                        isSelected && styles.selectedDayText,
                        !item.isCurrentMonth && styles.disabledDayText
                      ]}>
                        {item.day}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <View style={styles.actions}>
                <Pressable style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.cancelButtonText}>Отмена</Text>
                </Pressable>
                <Pressable style={styles.saveButton} onPress={handleSave}>
                  <Text style={styles.saveButtonText}>Сохранить</Text>
                </Pressable>
              </View>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  arrowButton: {
    padding: 4,
  },
  arrowText: {
    fontSize: 24,
    color: '#116F63',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%', 
  },
  dayCell: {
    width: 38,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 1, 
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#116F63',
    backgroundColor: 'transparent',
  },
  selectedDayCell: {
    backgroundColor: '#116F63',
  },
  currentDayCell: {
    borderWidth: 2,
  },
  disabledDayCell: {
    backgroundColor: 'rgba(246, 248, 252, 0.3)', 
    borderColor: 'rgba(17, 111, 99, 0.3)', 
  },
  dayText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  disabledDayText: {
    color: 'rgba(0, 0, 0, 0.3)',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24, 
    paddingHorizontal: 8,
  },
  cancelButton: {
    width: 131,
    height: 39,
    backgroundColor: '#E5F0ED',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#116F63',
  },
  saveButton: {
    width: 131,
    height: 39,
    backgroundColor: '#116F63',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D871F',
  },
  saveButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});