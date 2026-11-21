import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableWithoutFeedback, TextInput } from 'react-native';

interface EditOperationModalProps {
  visible: boolean;
  onClose: () => void;
  initialData: { amount: string; comment: string; date: string } | null;
  articleName: string;
  onSave: (newAmount: string, newComment: string) => void;
}

export const EditOperationModal: React.FC<EditOperationModalProps> = ({
  visible,
  onClose,
  initialData,
  articleName,
  onSave,
}) => {
  const [comment, setComment] = useState('');
  const [amount, setAmount] = useState('');

  // Очищаем поля при каждом открытии окна
  useEffect(() => {
    if (visible) {
      setComment('');
      setAmount('');
    }
  }, [visible]);

  const handleSave = () => {
    onSave(amount, comment);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <Text style={styles.title}>Редактировать операцию</Text>
              
              <View style={styles.infoRow}>
                <View style={styles.infoColumnLeft}>
                  <Text style={styles.infoLabel}>Статья</Text>
                  <Text style={styles.infoLabel}>Дата</Text>
                  <Text style={styles.infoLabel}>План</Text>
                </View>
                <View style={styles.infoColumnRight}>
                  <Text style={styles.infoValue}>{articleName}</Text>
                  <Text style={styles.infoValue}>{initialData?.date || '8 ноября'}</Text>
                  <Text style={styles.infoValue}>Основной</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <Text style={styles.inputLabel}>Комментарий</Text>
              <TextInput style={styles.input} value={comment} onChangeText={setComment} placeholder="Введите новый комментарий" />

              <Text style={styles.inputLabel}>Сумма, ₽</Text>
              <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="Введите новую сумму" />

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
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center' },
  container: { width: 320, height: 400, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#D9D9D9' },
  title: { fontSize: 16, fontWeight: '600', color: '#000000', marginBottom: 20 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 },
  infoColumnLeft: { gap: 8 },
  infoColumnRight: { alignItems: 'flex-end', gap: 8 },
  infoLabel: { fontSize: 14, fontWeight: '500', color: 'rgba(0, 0, 0, 0.3)' },
  infoValue: { fontSize: 14, fontWeight: '500', color: '#000000' },
  divider: { height: 1, backgroundColor: 'rgba(0, 0, 0, 0.15)', marginVertical: 16 },
  inputLabel: { fontSize: 14, fontWeight: '500', color: '#000000', marginBottom: 8 },
  input: { width: '100%', height: 31, backgroundColor: '#E5F0ED', borderWidth: 1, borderColor: '#116F63', borderRadius: 8, paddingHorizontal: 12, fontSize: 13, fontWeight: '500', marginBottom: 16 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto', gap: 10 },
  cancelButton: { flex: 1, height: 39, backgroundColor: '#E5F0ED', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  cancelButtonText: { fontSize: 13, fontWeight: '500', color: '#116F63' },
  saveButton: { flex: 1, height: 39, backgroundColor: '#116F63', borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#2D871F' },
  saveButtonText: { fontSize: 13, fontWeight: '500', color: '#FFFFFF' },
});