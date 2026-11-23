import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableWithoutFeedback, TextInput, Image } from 'react-native';
import { CalendarModal } from './CalendarModal';
import { NotificationSettingsModal } from './NotificationSettingsModal';

const iconCalendar = require('../../assets/icon-calendar-green.png');
const iconArrowUp = require('../../assets/icon-arrow-up-right.png');
const iconArrowDown = require('../../assets/icon-arrow-down-left.png');
const iconChevronRight = require('../../assets/icon-chevron-right.png');
const iconChevronDown = require('../../assets/icon-chevron-down.png');

interface LoanModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const LOANS = ['Займ №1', 'Займ №2', 'Займ №3'];

export const LoanModal: React.FC<LoanModalProps> = ({ visible, onClose, onSave }) => {
  const [isFact, setIsFact] = useState(true); // Рабочий переключатель
  const [loanType, setLoanType] = useState<'get' | 'pay'>('pay');
  
  const [amount, setAmount] = useState('');
  const [percent, setPercent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [comment, setComment] = useState('');
  
  // Для выпадающего списка займов
  const [selectedLoan, setSelectedLoan] = useState('Займ №1');
  const [isLoansOpen, setIsLoansOpen] = useState(false);

  // Для уведомлений
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const [isStartCalendar, setIsStartCalendar] = useState(false);
  const [isEndCalendar, setIsEndCalendar] = useState(false);

  const handleSave = () => {
    onSave({ isFact, loanType, amount, percent, startDate, endDate, comment, selectedLoan });
    onClose();
  };

  return (
    <>
      <Modal visible={visible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                
                <Text style={styles.title}>Добавить операцию</Text>
                <View style={styles.divider} />

                <Text style={styles.inputLabel}>Тип операции</Text>
                
                {/* РАБОЧИЙ ПЕРЕКЛЮЧАТЕЛЬ ФАКТ/ПЛАН */}
                <View style={styles.toggleContainer}>
                  <Pressable 
                    style={[styles.toggleButton, isFact && styles.toggleButtonActive]} 
                    onPress={() => setIsFact(true)}
                  >
                    <Text style={[styles.toggleText, isFact && styles.toggleTextActive]}>Фактическая</Text>
                  </Pressable>
                  <Pressable 
                    style={[styles.toggleButton, !isFact && styles.toggleButtonActive]} 
                    onPress={() => setIsFact(false)}
                  >
                    <Text style={[styles.toggleText, !isFact && styles.toggleTextActive]}>Плановая</Text>
                  </Pressable>
                </View>

                <Text style={styles.inputLabel}>Тип операции</Text>
                {/* ПЕРЕКЛЮЧАТЕЛЬ ПОЛУЧЕНИЕ / ПОГАШЕНИЕ */}
                <View style={styles.loanTypeContainer}>
                  <Pressable 
                    style={[styles.loanTypeButton, loanType === 'get' && styles.loanTypeButtonActive]} 
                    onPress={() => setLoanType('get')}
                  >
                    <Image source={iconArrowUp} style={[styles.loanTypeIcon, loanType !== 'get' && { opacity: 0.3 }]} />
                    <Text style={[styles.loanTypeText, loanType !== 'get' && { color: 'rgba(0,0,0,0.3)' }]}>Получение займа</Text>
                  </Pressable>
                  <Pressable 
                    style={[styles.loanTypeButton, loanType === 'pay' && styles.loanTypeButtonActive]} 
                    onPress={() => setLoanType('pay')}
                  >
                    <Image source={iconArrowDown} style={[styles.loanTypeIcon, loanType !== 'pay' && { opacity: 0.3 }]} />
                    <Text style={[styles.loanTypeText, loanType !== 'pay' && { color: 'rgba(0,0,0,0.3)' }]}>Погашение долга</Text>
                  </Pressable>
                </View>

                {/* ВЫПАДАЮЩИЙ СПИСОК ЗАЙМОВ */}
                <Text style={styles.inputLabel}>Кредит / займ</Text>
                <View style={styles.dropdownWrapper}>
                  <Pressable style={styles.inputPressable} onPress={() => setIsLoansOpen(!isLoansOpen)}>
                    <Text style={styles.inputText}>{selectedLoan}</Text>
                    <Image source={iconChevronDown} style={styles.iconSmall} />
                  </Pressable>
                  {isLoansOpen && (
                    <View style={styles.dropdownList}>
                      {LOANS.map((loan) => (
                        <Pressable 
                          key={loan} 
                          style={styles.dropdownItem} 
                          onPress={() => {
                            setSelectedLoan(loan);
                            setIsLoansOpen(false);
                          }}
                        >
                          <Text style={styles.dropdownText}>{loan}</Text>
                        </Pressable>
                      ))}
                    </View>
                  )}
                </View>

                {/* ПОЛЯ ДЛЯ ПОЛУЧЕНИЯ */}
                {loanType === 'get' && (
                  <>
                    <Text style={styles.inputLabel}>Сумма, ₽</Text>
                    <TextInput style={styles.input} value={amount} onChangeText={setAmount} placeholder="20 000,00" placeholderTextColor="rgba(0,0,0,0.4)" keyboardType="numeric" />

                    <Text style={styles.inputLabel}>Процентная ставка, %</Text>
                    <TextInput style={styles.input} value={percent} onChangeText={setPercent} placeholder="12" placeholderTextColor="rgba(0,0,0,0.4)" keyboardType="numeric" />

                    <View style={styles.datesRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>Дата получения</Text>
                        <Pressable style={styles.inputPressable} onPress={() => setIsStartCalendar(true)}>
                          <Text style={[styles.inputText, !startDate && styles.placeholder]}>{startDate || '11.12.2026'}</Text>
                          <Image source={iconCalendar} style={styles.iconSmall} />
                        </Pressable>
                      </View>
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.inputLabel}>Дата погашения</Text>
                        <Pressable style={styles.inputPressable} onPress={() => setIsEndCalendar(true)}>
                          <Text style={[styles.inputText, !endDate && styles.placeholder]}>{endDate || '12.12.2026'}</Text>
                          <Image source={iconCalendar} style={styles.iconSmall} />
                        </Pressable>
                      </View>
                    </View>
                  </>
                )}

                {/* ПОЛЯ ДЛЯ ПОГАШЕНИЯ */}
                {loanType === 'pay' && (
                  <>
                    <Text style={styles.inputLabel}>Сумма погашения, ₽</Text>
                    <TextInput style={styles.input} value={amount} onChangeText={setAmount} placeholder="5 000,00" placeholderTextColor="rgba(0,0,0,0.4)" keyboardType="numeric" />

                    <Text style={styles.inputLabel}>Дата погашения</Text>
                    <Pressable style={styles.inputPressable} onPress={() => setIsEndCalendar(true)}>
                      <Text style={[styles.inputText, !endDate && styles.placeholder]}>{endDate || '12.12.2026'}</Text>
                      <Image source={iconCalendar} style={styles.iconSmall} />
                    </Pressable>

                    {/* ОСТАТОК ДОЛГА В ОТДЕЛЬНОМ ПОЛЕ */}
                    <Text style={styles.inputLabel}>Остаток долга после оплаты</Text>
                    <View style={styles.readOnlyField}>
                      <Text style={styles.readOnlyText}>15 000 ₽</Text>
                    </View>
                  </>
                )}

                <Text style={styles.inputLabel}>Уведомления</Text>
                {/* ВЫЗОВ ОКНА УВЕДОМЛЕНИЙ */}
                <Pressable style={styles.notificationBox} onPress={() => setIsNotificationVisible(true)}>
                  <Text style={styles.notificationText}>Настроить уведомления</Text>
                  <View style={styles.notificationRight}>
                    <Text style={styles.statusText}>ВКЛ</Text>
                    <Image source={iconChevronRight} style={styles.iconSmall} />
                  </View>
                </Pressable>

                <TextInput style={styles.input} value={comment} onChangeText={setComment} placeholder="Введите комментарий" placeholderTextColor="rgba(0,0,0,0.4)" />

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
      
      {/* ОКНО УВЕДОМЛЕНИЙ */}
      <NotificationSettingsModal 
        visible={isNotificationVisible}
        onClose={() => setIsNotificationVisible(false)}
        onSave={() => setIsNotificationVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center' },
  container: { width: 320, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#D9D9D9' },
  title: { fontSize: 18, fontWeight: '600', color: '#000000', marginBottom: 12 },
  divider: { height: 1, backgroundColor: 'rgba(0, 0, 0, 0.15)', marginBottom: 16 },
  inputLabel: { fontSize: 14, fontWeight: '500', color: '#000000', marginBottom: 8 },
  
  toggleContainer: { flexDirection: 'row', backgroundColor: '#E5F0ED', borderRadius: 8, padding: 4, marginBottom: 16 },
  toggleButton: { flex: 1, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  toggleButtonActive: { backgroundColor: '#116F63' },
  toggleText: { fontSize: 14, fontWeight: '600', color: '#116F63' },
  toggleTextActive: { color: '#FFFFFF' },

  loanTypeContainer: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  loanTypeButton: { flex: 1, height: 54, backgroundColor: '#E5F0ED', borderRadius: 8, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 6 },
  loanTypeButtonActive: { borderWidth: 1, borderColor: '#16805B' },
  loanTypeIcon: { width: 16, height: 16 },
  loanTypeText: { fontSize: 14, fontWeight: '600', color: '#16805B' },

  input: { width: '100%', height: 42, backgroundColor: '#E5F0ED', borderWidth: 1, borderColor: '#116F63', borderRadius: 8, paddingHorizontal: 12, fontSize: 13, fontWeight: '500', marginBottom: 16, color: '#000000' },
  inputPressable: { width: '100%', height: 42, backgroundColor: '#E5F0ED', borderWidth: 1, borderColor: '#116F63', borderRadius: 8, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  inputText: { fontSize: 13, fontWeight: '500', color: '#000000' },
  placeholder: { color: 'rgba(0,0,0,0.4)' },
  iconSmall: { width: 16, height: 16 },
  
  // Выпадающий список
  dropdownWrapper: { position: 'relative', marginBottom: 16, zIndex: 10 },
  dropdownList: { position: 'absolute', top: 42, left: 0, right: 0, backgroundColor: '#E5F0ED', borderRadius: 8, borderWidth: 1, borderColor: '#116F63', zIndex: 20 },
  dropdownItem: { paddingVertical: 12, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  dropdownText: { fontSize: 13, fontWeight: '500', color: '#000000' },

  datesRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  
  // Поле "Остаток долга"
  readOnlyField: {
    width: '100%',
    height: 42,
    backgroundColor: '#E5F0ED',
    borderWidth: 1,
    borderColor: '#116F63',
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    marginBottom: 16,
  },
  readOnlyText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
  },

  notificationBox: { width: '100%', height: 42, backgroundColor: '#E5F0ED', borderRadius: 8, paddingHorizontal: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  notificationText: { fontSize: 13, fontWeight: '500', color: '#000000' },
  notificationRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusText: { fontSize: 13, fontWeight: '500', color: '#16805B' },

  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, gap: 10 },
  cancelButton: { flex: 1, height: 39, backgroundColor: '#E5F0ED', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  cancelButtonText: { fontSize: 13, fontWeight: '500', color: '#116F63' },
  saveButton: { flex: 1, height: 39, backgroundColor: '#116F63', borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#2D871F' },
  saveButtonText: { fontSize: 13, fontWeight: '500', color: '#FFFFFF' },
});