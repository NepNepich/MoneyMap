import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableWithoutFeedback, TextInput } from 'react-native';

interface AddPlanModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (planName: string) => void;
}

export const AddPlanModal: React.FC<AddPlanModalProps> = ({ visible, onClose, onSave }) => {
  const [planName, setPlanName] = useState('');

  const handleSave = () => {
    if (planName.trim()) {
      onSave(planName);
      setPlanName(''); // Очищаем поле
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              
              <Text style={styles.title}>Добавить план</Text>
              <View style={styles.divider} />

              <Text style={styles.inputLabel}>Название</Text>
              <TextInput
                style={styles.input}
                value={planName}
                onChangeText={setPlanName}
                placeholder="Введите название"
                placeholderTextColor="rgba(17, 111, 99, 0.4)" // Цвет плейсхолдера из макета
              />

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
    height: 259,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 42,
    backgroundColor: '#E5F0ED',
    borderWidth: 1,
    borderColor: '#116F63',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 13,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
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
    flex: 1,
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