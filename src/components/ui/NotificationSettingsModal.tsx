import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableWithoutFeedback, TextInput, Image } from 'react-native';
import { CalendarModal } from './CalendarModal';
import { TimePickerModal } from './TimePickerModal';

const iconCalendar = require('../../assets/icon-calendar-green.png');
const iconClock = require('../../assets/icon-clock.png'); 
const iconChevronRight = require('../../assets/icon-chevron-right.png');

interface NotificationSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({ visible, onClose, onSave }) => {
  const [text, setText] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [time, setTime] = useState('');
  
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isTimeVisible, setIsTimeVisible] = useState(false);
  const [dateTarget, setDateTarget] = useState<'start' | 'end'>('start');

  const openCalendar = (target: 'start' | 'end') => {
    setDateTarget(target);
    setIsCalendarVisible(true);
  };

  const handleSaveDate = (date: Date) => {
    const formatted = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    if (dateTarget === 'start') setStartDate(formatted);
    else setEndDate(formatted);
  };

  return (
    <>
      <Modal visible={visible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                
                <Text style={styles.title}>Настройка уведомлений</Text>
                
                {/* ПОЛОСКА-РАЗДЕЛИТЕЛЬ */}
                <View style={styles.divider} />

                <Text style={styles.inputLabel}>Текст уведомления</Text>
                <TextInput 
                  style={styles.input} 
                  value={text} 
                  onChangeText={setText} 
                  placeholder="Введите комментарий" 
                  placeholderTextColor="rgba(118, 112, 112, 0.5)" // СЕРЫЙ
                />

                <Text style={styles.inputLabel}>Дата начала</Text>
                <Pressable style={styles.inputPressable} onPress={() => openCalendar('start')}>
                  <Text style={[styles.inputText, !startDate && styles.placeholder]}>{startDate || 'Выберите дату'}</Text>
                  <Image source={iconCalendar} style={styles.icon} resizeMode="contain" />
                </Pressable>

                <Text style={styles.inputLabel}>Дата окончания</Text>
                <Pressable style={styles.inputPressable} onPress={() => openCalendar('end')}>
                  <Text style={[styles.inputText, !endDate && styles.placeholder]}>{endDate || 'Выберите дату'}</Text>
                  <Image source={iconCalendar} style={styles.icon} resizeMode="contain" />
                </Pressable>

                <Text style={styles.inputLabel}>Время уведомления</Text>
                <Pressable style={styles.inputPressable} onPress={() => setIsTimeVisible(true)}>
                  <Text style={[styles.inputText, !time && styles.placeholder]}>{time || 'Выберите время'}</Text>
                  <Image source={iconClock} style={styles.icon} resizeMode="contain" />
                </Pressable>

                <View style={styles.actions}>
                  <Pressable style={styles.cancelButton} onPress={onClose}>
                    <Text style={styles.cancelButtonText}>Отмена</Text>
                  </Pressable>
                  <Pressable style={styles.saveButton} onPress={() => { onSave(); onClose(); }}>
                    <Text style={styles.saveButtonText}>Сохранить</Text>
                  </Pressable>
                </View>

              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <CalendarModal visible={isCalendarVisible} onClose={() => setIsCalendarVisible(false)} onSave={handleSaveDate} />
      <TimePickerModal visible={isTimeVisible} onClose={() => setIsTimeVisible(false)} onSave={setTime} />
    </>
  );
};

const styles = StyleSheet.create({
  // ... (стили)
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center' },
  container: { width: 320, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#D9D9D9' },
  title: { fontSize: 18, fontWeight: '600', color: '#000000', marginBottom: 12 },
  divider: { height: 1, backgroundColor: 'rgba(0, 0, 0, 0.15)', marginBottom: 16 }, // ПОЛОСКА
  inputLabel: { fontSize: 14, fontWeight: '500', color: '#000000', marginBottom: 8 },
  input: { 
    width: '100%', 
    height: 31, 
    backgroundColor: '#E5F0ED', 
    borderWidth: 1, 
    borderColor: '#116F63', 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    fontSize: 13, 
    fontWeight: '500', 
    marginBottom: 16,
    color: '#000000',
  },
  inputPressable: { 
    width: '100%', 
    height: 31, 
    backgroundColor: '#E5F0ED', 
    borderWidth: 1, 
    borderColor: '#116F63', 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 16 
  },
  inputText: { fontSize: 13, fontWeight: '500', color: '#000000' },
  placeholder: { color: 'rgba(118, 112, 112, 0.5)' }, // ОДИНАКОВЫЙ СЕРЫЙ ЦВЕТ
  icon: { width: 16, height: 16 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, gap: 10 },
  cancelButton: { flex: 1, height: 39, backgroundColor: '#E5F0ED', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  cancelButtonText: { fontSize: 13, fontWeight: '500', color: '#116F63' },
  saveButton: { flex: 1, height: 39, backgroundColor: '#116F63', borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#2D871F' },
  saveButtonText: { fontSize: 13, fontWeight: '500', color: '#FFFFFF' },
});