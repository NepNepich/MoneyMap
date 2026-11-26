import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableWithoutFeedback, TextInput, Image } from 'react-native';
import { CalendarModal } from './CalendarModal';

const iconCalendar = require('../../assets/icon-calendar-green.png');
const iconBank = require('../../assets/icon-bank.png');
const iconChevronDown = require('../../assets/icon-chevron-down.png');

interface DepositModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const DEPOSITS = ['Депозит 1', 'Депозит 2', 'Депозит 3'];
const REGULARITY_OPTIONS = ['Разовая', 'Каждый месяц', 'Каждую неделю', 'Каждый день', 'Настраиваемый'];

export const DepositModal: React.FC<DepositModalProps> = ({ visible, onClose, onSave }) => {
  const [isFact, setIsFact] = useState(true);
  const [actionType, setActionType] = useState<'deposit' | 'withdraw'>('deposit');
  
  const [selectedDeposit, setSelectedDeposit] = useState('Мой депозит');
  const [isDepositsOpen, setIsDepositsOpen] = useState(false);
  
  const [date, setDate] = useState('');
  const [planDate, setPlanDate] = useState('');
  const [regularity, setRegularity] = useState('Разовые');
  const [isRegularityOpen, setIsRegularityOpen] = useState(false);
  
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  
  const [isDateCalendarVisible, setIsDateCalendarVisible] = useState(false);
  const [isPlanCalendarVisible, setIsPlanCalendarVisible] = useState(false);

  const handleSave = () => {
    onSave({ isFact, actionType, selectedDeposit, date, planDate, regularity, amount, comment });
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

                <View style={styles.infoRow}>
                  <View style={styles.infoColumnLeft}>
                    <Text style={styles.infoLabel}>План</Text>
                    <Text style={styles.infoLabel}>Статья</Text>
                  </View>
                  <View style={styles.infoColumnRight}>
                    <Text style={styles.infoValue}>Основной</Text>
                    <Text style={styles.infoValue}>Депозиты</Text>
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

                <Text style={styles.inputLabel}>Действие с депозитом</Text>
                <View style={styles.loanTypeContainer}>
                  <Pressable 
                    style={[styles.loanTypeButton, actionType === 'deposit' && styles.loanTypeButtonActive]} 
                    onPress={() => setActionType('deposit')}
                  >
                    <Text style={[styles.loanTypeText, { color: actionType === 'deposit' ? '#FFFFFF' : '#116F63' }]}>Пополнение</Text>
                  </Pressable>
                  <Pressable 
                    style={[styles.loanTypeButton, actionType === 'withdraw' && styles.loanTypeButtonActive]} 
                    onPress={() => setActionType('withdraw')}
                  >
                    <Text style={[styles.loanTypeText, { color: actionType === 'withdraw' ? '#FFFFFF' : '#116F63' }]}>Списание</Text>
                  </Pressable>
                </View>

                <Text style={styles.inputLabel}>Выберите депозит</Text>
                <View style={styles.dropdownWrapper}>
                  <Pressable style={styles.inputPressable} onPress={() => setIsDepositsOpen(!isDepositsOpen)}>
                    <View style={styles.dropdownRow}>
                      <Image source={iconBank} style={styles.iconSmall} />
                      <Text style={styles.inputText}>{selectedDeposit}</Text>
                    </View>
                    <Image source={iconChevronDown} style={styles.iconSmall} />
                  </Pressable>
                  {isDepositsOpen && (
                    <View style={styles.dropdownList}>
                      {DEPOSITS.map((dep) => (
                        <Pressable 
                          key={dep} 
                          style={styles.dropdownItem} 
                          onPress={() => {
                            setSelectedDeposit(dep);
                            setIsDepositsOpen(false);
                          }}
                        >
                          <Text style={styles.dropdownText}>{dep}</Text>
                        </Pressable>
                      ))}
                    </View>
                  )}
                </View>

                {/* УСЛОВНЫЙ РЕНДЕРИНГ ДАТ */}
                {isFact ? (
                  // Для ФАКТИЧЕСКОЙ - только "Дата операции"
                  <>
                   <View style={{ marginTop: 0 }}>
                    <Text style={styles.inputLabel}>Дата операции</Text>
                    <Pressable style={styles.inputPressable} onPress={() => setIsDateCalendarVisible(true)}>
                      <Text style={[styles.inputText, !date && styles.placeholder]}>{date || '8.10.2026'}</Text>
                      <Image source={iconCalendar} style={styles.iconSmall} />
                    </Pressable>
                   </View>
                  </>
                ) : (
                  // Для ПЛАНОВОЙ - "Планируемая дата" и "Регулярность"
                  <>
                    <View style={styles.rowContainer}>
                      <View style={{ flex: 1, marginRight: 10 }}>
                        <Text style={styles.inputLabel}>Планируемая дата</Text>
                        <Pressable style={styles.inputPressable} onPress={() => setIsPlanCalendarVisible(true)}>
                          <Text style={[styles.inputText, !planDate && styles.placeholder]}>{planDate || '8.12.2026'}</Text>
                          <Image source={iconCalendar} style={styles.iconSmall} />
                        </Pressable>
                      </View>
                      
                      <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>Регулярность</Text>
                        <Pressable style={styles.inputPressable} onPress={() => setIsRegularityOpen(!isRegularityOpen)}>
                          <Text style={styles.inputText}>{regularity}</Text>
                          <Image source={iconChevronDown} style={styles.iconSmall} />
                        </Pressable>
                      </View>
                    </View>

                    {isRegularityOpen && (
                      <View style={styles.dropdownListInline}>
                        {REGULARITY_OPTIONS.map((opt) => (
                          <Pressable 
                            key={opt} 
                            style={styles.dropdownItem} 
                            onPress={() => {
                              setRegularity(opt);
                              setIsRegularityOpen(false);
                            }}
                          >
                            <Text style={styles.dropdownText}>{opt}</Text>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </>
                )}

                <Text style={styles.inputLabel}>
                  Сумма {actionType === 'deposit' ? 'пополнения' : 'списания'}, ₽
                </Text>
                <TextInput 
                  style={styles.input} 
                  value={amount} 
                  onChangeText={setAmount} 
                  placeholder="5 000,00" 
                  placeholderTextColor="rgba(0,0,0,0.4)" 
                  keyboardType="numeric" 
                />

                <Text style={styles.inputLabel}>Комментарий</Text>
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

      <CalendarModal visible={isDateCalendarVisible} onClose={() => setIsDateCalendarVisible(false)} onSave={(d) => setDate(`${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`)} />
      <CalendarModal visible={isPlanCalendarVisible} onClose={() => setIsPlanCalendarVisible(false)} onSave={(d) => setPlanDate(`${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`)} />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center' },
  container: { width: 320, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#D9D9D9' },
  title: { fontSize: 18, fontWeight: '600', color: '#000000', marginBottom: 12 },
  divider: { height: 1, backgroundColor: 'rgba(0, 0, 0, 0.15)', marginBottom: 16 },
  
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4, marginBottom: 16 },
  infoColumnLeft: { gap: 8 },
  infoColumnRight: { alignItems: 'flex-end', gap: 8 },
  infoLabel: { fontSize: 14, fontWeight: '500', color: 'rgba(0, 0, 0, 0.3)' },
  infoValue: { fontSize: 14, fontWeight: '600', color: '#000000' },

  inputLabel: { fontSize: 14, fontWeight: '500', color: '#000000', marginBottom: 8, marginTop: 8},
  
  toggleContainer: { flexDirection: 'row', backgroundColor: '#E5F0ED', borderRadius: 8, padding: 4, marginBottom: 16 },
  toggleButton: { flex: 1, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  toggleButtonActive: { backgroundColor: '#116F63' },
  toggleText: { fontSize: 14, fontWeight: '600', color: '#116F63' },
  toggleTextActive: { color: '#FFFFFF' },

  loanTypeContainer: { flexDirection: 'row', marginBottom: 16, backgroundColor: '#E5F0ED', borderRadius: 8, padding: 4 },
  loanTypeButton: { flex: 1, height: 46, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  loanTypeButtonActive: { backgroundColor: '#116F63' },
  loanTypeText: { fontSize: 14, fontWeight: '600' },

dropdownWrapper: { 
    position: 'relative', 
    marginBottom: 16, 
    zIndex: 100, // <--- ВЫШЕ, ЧЕМ У ОСТАЛЬНЫХ ПОЛЕЙ
  },
  inputPressable: { width: '100%', height: 42, backgroundColor: '#E5F0ED', borderWidth: 1, borderColor: '#116F63', borderRadius: 8, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dropdownRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  inputText: { fontSize: 13, fontWeight: '500', color: '#000000' },
  placeholder: { color: 'rgba(0,0,0,0.4)' },
  iconSmall: { width: 16, height: 16 },
  
   dropdownList: { 
    position: 'absolute', 
    top: 42, 
    left: 0, 
    right: 0, 
    backgroundColor: '#E5F0ED', 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#116F63', 
    zIndex: 101, // <--- ЕЩЕ ВЫШЕ
    elevation: 10, // <--- ДЛЯ ANDROID
  },
  dropdownListInline: { backgroundColor: '#E5F0ED', borderRadius: 8, borderWidth: 1, borderColor: '#116F63', marginBottom: 16 },
  dropdownItem: { paddingVertical: 12, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  dropdownText: { fontSize: 13, fontWeight: '500', color: '#000000' },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    zIndex: 10,
  },

  input: { width: '100%', height: 42, backgroundColor: '#E5F0ED', borderWidth: 1, borderColor: '#116F63', borderRadius: 8, paddingHorizontal: 12, fontSize: 13, fontWeight: '500', marginBottom: 16, color: '#000000' },

  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, gap: 10 },
  cancelButton: { flex: 1, height: 39, backgroundColor: '#E5F0ED', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  cancelButtonText: { fontSize: 13, fontWeight: '500', color: '#116F63' },
  saveButton: { flex: 1, height: 39, backgroundColor: '#116F63', borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#2D871F' },
  saveButtonText: { fontSize: 13, fontWeight: '500', color: '#FFFFFF' },
});