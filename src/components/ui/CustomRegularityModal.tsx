import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableWithoutFeedback, Image } from 'react-native';
import { CalendarModal } from './CalendarModal';

// Подключаем иконку календаря
const iconCalendar = require('../../assets/icon-calendar-green.png');
const iconChevronDown = require('../../assets/icon-chevron-down.png');

interface CustomRegularityModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (startDate: string, interval: number, period: string, endDate: string) => void;
}

const PERIOD_OPTIONS = ['Месяц', 'Неделя', 'День', 'Год'];

export const CustomRegularityModal: React.FC<CustomRegularityModalProps> = ({ visible, onClose, onSave }) => {
  const [startDate, setStartDate] = useState('Четверг, 8.10.2026');
  const [interval, setIntervalValue] = useState(1);
  const [period, setPeriod] = useState('Месяц');
  const [endDate, setEndDate] = useState('8.12.2026');
  
  const [isStartCalendar, setIsStartCalendar] = useState(false);
  const [isEndCalendar, setIsEndCalendar] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);

  const handleSave = () => {
    onSave(startDate, interval, period, endDate);
    onClose();
    setIsPeriodOpen(false);
  };

  return (
    <>
      <Modal visible={visible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                <Text style={styles.title}>Настроить регулярность</Text>
                <View style={styles.divider} />

                {/* Дата начала */}
                <Text style={styles.inputLabel}>Дата начала</Text>
                <Pressable style={styles.inputPressable} onPress={() => setIsStartCalendar(true)}>
                  <Text style={styles.inputText}>{startDate}</Text>
                  {/* ВСТАВЛЕНА ИКОНКА КАЛЕНДАРЯ */}
                  <Image source={iconCalendar} style={styles.icon} resizeMode="contain" />
                </Pressable>

                {/* Интервал и Период */}
                <Text style={styles.inputLabel}>Повторять с интервалом</Text>
                <View style={styles.intervalRow}>
                  <View style={styles.intervalCounter}>
                    <Pressable onPress={() => setIntervalValue(Math.max(1, interval - 1))} style={styles.counterButton}>
                      <Text style={styles.counterText}>-</Text>
                    </Pressable>
                    <Text style={styles.counterValue}>{interval}</Text>
                    <Pressable onPress={() => setIntervalValue(interval + 1)} style={styles.counterButton}>
                      <Text style={styles.counterText}>+</Text>
                    </Pressable>
                  </View>
                  
                  <View style={styles.periodWrapper}>
                    <Pressable style={styles.periodInput} onPress={() => setIsPeriodOpen(!isPeriodOpen)}>
                      <Text style={styles.inputText}>{period}</Text>
                      <Image source={iconChevronDown} style={styles.iconSmall} resizeMode="contain" />
                    </Pressable>
                    
                    {isPeriodOpen && (
                      <View style={styles.dropdownList}>
                        {PERIOD_OPTIONS.map((opt) => (
                          <Pressable 
                            key={opt} 
                            style={styles.dropdownItem}
                            onPress={() => {
                              setPeriod(opt);
                              setIsPeriodOpen(false);
                            }}
                          >
                            <Text style={styles.dropdownText}>{opt}</Text>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </View>
                </View>

                {/* Дата окончания */}
                <Text style={styles.inputLabel}>Дата окончания</Text>
                <Pressable style={styles.inputPressable} onPress={() => setIsEndCalendar(true)}>
                  <Text style={styles.inputText}>{endDate}</Text>
                  {/* ВСТАВЛЕНА ИКОНКА КАЛЕНДАРЯ */}
                  <Image source={iconCalendar} style={styles.icon} resizeMode="contain" />
                </Pressable>

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

      <CalendarModal visible={isStartCalendar} onClose={() => setIsStartCalendar(false)} onSave={(d) => setStartDate(`${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`)} />
      <CalendarModal visible={isEndCalendar} onClose={() => setIsEndCalendar(false)} onSave={(d) => setEndDate(`${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`)} />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center' },
  container: { width: 320, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#D9D9D9' },
  title: { fontSize: 16, fontWeight: '600', color: '#000000', marginBottom: 12 },
  divider: { height: 1, backgroundColor: 'rgba(0, 0, 0, 0.15)', marginBottom: 16 },
  inputLabel: { fontSize: 14, fontWeight: '500', color: '#000000', marginBottom: 8 },
  
  inputPressable: { width: '100%', height: 31, backgroundColor: '#E5F0ED', borderWidth: 1, borderColor: '#116F63', borderRadius: 8, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  inputText: { fontSize: 13, fontWeight: '500', color: '#000000' },
  icon: { width: 16, height: 16 }, // Размер иконки календаря
  
  intervalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, zIndex: 10 },
  intervalCounter: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E5F0ED', borderWidth: 1, borderColor: '#116F63', borderRadius: 8, height: 31, width: 105 },
  counterButton: { width: 30, justifyContent: 'center', alignItems: 'center' },
  counterText: { fontSize: 18, color: '#116F63', fontWeight: '500' },
  counterValue: { fontSize: 14, fontWeight: '500', color: '#000000' },
  
  periodWrapper: { width: 171, position: 'relative' },
  periodInput: { width: '100%', height: 31, backgroundColor: '#E5F0ED', borderWidth: 1, borderColor: '#116F63', borderRadius: 8, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconSmall: { width: 12, height: 12 },
  
  dropdownList: { position: 'absolute', top: 35, left: 0, right: 0, backgroundColor: '#E5F0ED', borderRadius: 8, borderWidth: 1, borderColor: '#116F63', zIndex: 20 },
  dropdownItem: { paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  dropdownText: { fontSize: 13, fontWeight: '500', color: '#000000' },

  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, gap: 10 },
  cancelButton: { flex: 1, height: 39, backgroundColor: '#E5F0ED', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  cancelButtonText: { fontSize: 13, fontWeight: '500', color: '#116F63' },
  saveButton: { flex: 1, height: 39, backgroundColor: '#116F63', borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#2D871F' },
  saveButtonText: { fontSize: 13, fontWeight: '500', color: '#FFFFFF' },
});