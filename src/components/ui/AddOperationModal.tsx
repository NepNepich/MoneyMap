import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableWithoutFeedback, TextInput, Image } from 'react-native';
import { CalendarModal } from './CalendarModal';

const iconCalendarSmall = require('../../assets/icon-calendar.png');
const iconChevronRight = require('../../assets/icon-chevron.png');

interface AddOperationModalProps {
  visible: boolean;
  onClose: () => void;
  articleName: string;
  initialDate: string;
  onSave: (data: { amount: string; comment: string; isFact: boolean; date: string }) => void;
  onNotificationPress: () => void; // <--- Новый пропс для открытия уведомлений
}

export const AddOperationModal: React.FC<AddOperationModalProps> = ({
  visible,
  onClose,
  articleName,
  initialDate,
  onSave,
  onNotificationPress,
}) => {
  const [isFact, setIsFact] = useState(true);
  const [comment, setComment] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(initialDate);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleSave = () => {
    if (!amount.trim()) return;
    onSave({ amount, comment, isFact, date });
    onClose();
    setAmount('');
    setComment('');
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
                <TextInput style={styles.input} value={comment} onChangeText={setComment} placeholder="Вода" />

                {!isFact && (
                  <>
                    <Text style={styles.inputLabel}>Регулярность</Text>
                    <Pressable style={styles.inputPressable}>
                      <Text style={styles.inputText}>Раз в месяц</Text>
                    </Pressable>

                    <Text style={styles.inputLabel}>Уведомления</Text>
                    {/* Вызываем onNotificationPress */}
                    <Pressable style={styles.notificationBox} onPress={onNotificationPress}>
                      <Text style={styles.notificationText}>Настроить уведомления</Text>
                      <View style={styles.notificationRight}>
                        <Text style={styles.statusText}>ВКЛ</Text>
                        <Image source={iconChevronRight} style={styles.chevronIcon} resizeMode="contain" />
                      </View>
                    </Pressable>
                  </>
                )}

                <Text style={styles.inputLabel}>Сумма, ₽</Text>
                <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="1 357,00" />

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
    </>
  );
};

const styles = StyleSheet.create({
  // ... (стили без изменений, как в прошлом сообщении)
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
  inputPressable: { width: '100%', height: 31, backgroundColor: '#E5F0ED', borderWidth: 1, borderColor: '#116F63', borderRadius: 8, paddingHorizontal: 12, justifyContent: 'center', marginBottom: 16 },
  inputText: { fontSize: 13, fontWeight: '500', color: '#000000' },
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