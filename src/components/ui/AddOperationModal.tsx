import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableWithoutFeedback, TextInput, Image } from 'react-native';
import { CalendarModal } from './CalendarModal';
import { CustomRegularityModal } from './CustomRegularityModal';
import { NotificationSettingsModal } from './NotificationSettingsModal';

const iconCalendarSmall = require('../../assets/icon-calendar-green.png');
const iconChevronRight = require('../../assets/icon-chevron.png');
const iconChevronDown = require('../../assets/icon-chevron.png');

const REGULARITY_OPTIONS = ['Каждый месяц', 'Каждую неделю', 'Каждый день', 'Настраиваемый'];

interface AddOperationModalProps {
  visible: boolean;
  onClose: () => void;
  articleName: string;
  initialDate: string;
  onSave: (data: { amount: string; comment: string; isFact: boolean; date: string; regularity?: string }) => void;
  // onNotificationPress УДАЛЕН
}

export const AddOperationModal: React.FC<AddOperationModalProps> = ({
  visible, onClose, articleName, initialDate, onSave
}) => {
  const [isFact, setIsFact] = useState(true);
  const [comment, setComment] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(initialDate);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  
  const [regularity, setRegularity] = useState('Каждый месяц');
  const [isRegularityOpen, setIsRegularityOpen] = useState(false);
  const [isCustomRegularityVisible, setIsCustomRegularityVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setComment('');
      setAmount('');
      setDate(initialDate);
      setIsFact(true);
      setIsRegularityOpen(false);
    }
  }, [visible, initialDate]);

  const handleSave = () => {
    if (!amount.trim()) return;
    onSave({ amount, comment, isFact, date, regularity });
    onClose();
  };

  const handleSelectRegularity = (option: string) => {
    if (option === 'Настраиваемый') {
      setIsCustomRegularityVisible(true);
    } else {
      setRegularity(option);
    }
    setIsRegularityOpen(false);
  };

  return (
    <>
      <Modal visible={visible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                
                <Text style={styles.title}>Добавить операцию</Text>

                <View style={styles.infoRow}>
                  <View style={styles.infoColumnLeft}>
                    <Text style={styles.infoLabel}>План</Text>
                    <Text style={styles.infoLabel}>Статья</Text>
                  </View>
                  <View style={styles.infoColumnRight}>
                    <Text style={styles.infoValue}>Основной</Text>
                    <Text style={styles.infoValue}>{articleName}</Text>
                  </View>
                </View>

                <Text style={styles.inputLabel}>Тип операции</Text>
                <View style={styles.toggleContainer}>
                  <Pressable style={[styles.toggleButton, isFact && styles.toggleButtonActive]} onPress={() => setIsFact(true)}>
                    <Text style={[styles.toggleText, isFact && styles.toggleTextActive]}>Фактическая</Text>
                  </Pressable>
                  <Pressable style={[styles.toggleButton, !isFact && styles.toggleButtonActive]} onPress={() => setIsFact(false)}>
                    <Text style={[styles.toggleText, !isFact && styles.toggleTextActive]}>Плановая</Text>
                  </Pressable>
                </View>

                <Text style={styles.inputLabel}>Дата операции</Text>
                <Pressable style={styles.dateInput} onPress={() => setIsCalendarVisible(true)}>
                  <Text style={styles.dateText}>{date}</Text>
                  <Image source={iconCalendarSmall} style={styles.smallIcon} resizeMode="contain" />
                </Pressable>

                <Text style={styles.inputLabel}>Комментарий</Text>
                <TextInput style={styles.input} value={comment} onChangeText={setComment} placeholder="Введите комментарий" />

                {!isFact && (
                  <>
                    <Text style={styles.inputLabel}>Регулярность</Text>
                    <Pressable style={styles.dropdownInput} onPress={() => setIsRegularityOpen(!isRegularityOpen)}>
                      <Text style={styles.inputText}>{regularity}</Text>
                      <Image source={iconChevronDown} style={styles.chevronIcon} resizeMode="contain" />
                    </Pressable>

                    {isRegularityOpen && (
                      <View style={styles.dropdownList}>
                        {REGULARITY_OPTIONS.map((option) => (
                          <Pressable 
                            key={option} 
                            style={styles.dropdownItem} 
                            onPress={() => handleSelectRegularity(option)}
                          >
                            <View style={styles.dropdownRow}>
                              <Text style={styles.dropdownText}>{option}</Text>
                              {option === 'Настраиваемый' && (
                                <Image source={iconChevronRight} style={styles.dropdownIconRight} resizeMode="contain" />
                              )}
                            </View>
                          </Pressable>
                        ))}
                      </View>
                    )}

                    <Text style={styles.inputLabel}>Уведомления</Text>
                    {/* ВЫЗЫВАЕМ ОКНО УВЕДОМЛЕНИЙ ЗДЕСЬ */}
                    <Pressable style={styles.notificationBox} onPress={() => setIsNotificationVisible(true)}>
                      <Text style={styles.notificationText}>Настроить уведомления</Text>
                      <View style={styles.notificationRight}>
                        <Text style={styles.statusText}>ВКЛ</Text>
                        <Image source={iconChevronRight} style={styles.chevronIcon} resizeMode="contain" />
                      </View>
                    </Pressable>
                  </>
                )}

                <Text style={styles.inputLabel}>Сумма, ₽</Text>
                <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="Введите сумму" />

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

      <CalendarModal 
        visible={isCalendarVisible}
        onClose={() => setIsCalendarVisible(false)}
        onSave={(newDate) => {
          setDate(`${newDate.getDate()}.${newDate.getMonth() + 1}`);
        }}
      />

      <CustomRegularityModal 
        visible={isCustomRegularityVisible}
        onClose={() => setIsCustomRegularityVisible(false)}
        onSave={(start, int, period, end) => {
          setRegularity(`Настраиваемый (${int} ${period.toLowerCase()})`);
        }}
      />

      {/* ОКНО НАСТРОЙКИ УВЕДОМЛЕНИЙ */}
      <NotificationSettingsModal 
        visible={isNotificationVisible}
        onClose={() => setIsNotificationVisible(false)}
        onSave={() => {
          console.log('Настройки уведомлений сохранены');
          setIsNotificationVisible(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  // ... (все стили остаются без изменений)
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center' },
  container: { width: 320, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#D9D9D9' },
  title: { fontSize: 16, fontWeight: '600', color: '#000000', marginBottom: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4, marginBottom: 16 },
  infoColumnLeft: { gap: 8 },
  infoColumnRight: { alignItems: 'flex-end', gap: 8 },
  infoLabel: { fontSize: 14, fontWeight: '500', color: 'rgba(0, 0, 0, 0.3)' },
  infoValue: { fontSize: 14, fontWeight: '500', color: '#000000' },
  inputLabel: { fontSize: 14, fontWeight: '500', color: '#000000', marginBottom: 8 },
  toggleContainer: { flexDirection: 'row', backgroundColor: '#E5F0ED', borderRadius: 8, padding: 4, marginBottom: 16 },
  toggleButton: { flex: 1, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  toggleButtonActive: { backgroundColor: '#116F63' },
  toggleText: { fontSize: 14, fontWeight: '600', color: '#116F63' },
  toggleTextActive: { color: '#FFFFFF' },
  dateInput: { width: 94, height: 31, backgroundColor: '#E5F0ED', borderWidth: 1, borderColor: '#116F63', borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 16 },
  dateText: { fontSize: 13, fontWeight: '500', color: '#000000' },
  smallIcon: { width: 16, height: 16 },
  input: { width: '100%', height: 31, backgroundColor: '#E5F0ED', borderWidth: 1, borderColor: '#116F63', borderRadius: 8, paddingHorizontal: 12, fontSize: 13, fontWeight: '500', marginBottom: 16 },
  dropdownInput: { width: '100%', height: 31, backgroundColor: '#E5F0ED', borderWidth: 1, borderColor: '#116F63', borderRadius: 8, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  inputText: { fontSize: 13, fontWeight: '500', color: '#000000' },
  dropdownList: { backgroundColor: '#E5F0ED', borderRadius: 8, borderWidth: 1, borderColor: '#116F63', marginBottom: 16, overflow: 'hidden' },
  dropdownItem: { paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  dropdownRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dropdownText: { fontSize: 13, fontWeight: '500', color: '#000000' },
  dropdownIconRight: { width: 12, height: 12 },
  notificationBox: { width: '100%', height: 39, backgroundColor: '#E5F0ED', borderRadius: 8, paddingHorizontal: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  notificationText: { fontSize: 13, fontWeight: '500', color: '#000000' },
  notificationRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusText: { fontSize: 13, fontWeight: '500', color: '#16805B' },
  chevronIcon: { width: 12, height: 12 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, gap: 10 },
  cancelButton: { flex: 1, height: 39, backgroundColor: '#E5F0ED', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  cancelButtonText: { fontSize: 13, fontWeight: '500', color: '#116F63' },
  saveButton: { flex: 1, height: 39, backgroundColor: '#116F63', borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#2D871F' },
  saveButtonText: { fontSize: 13, fontWeight: '500', color: '#FFFFFF' },
});