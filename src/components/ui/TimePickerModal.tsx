import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableWithoutFeedback, ScrollView } from 'react-native';

interface TimePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (time: string) => void;
}

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

export const TimePickerModal: React.FC<TimePickerModalProps> = ({ visible, onClose, onSave }) => {
  const [selectedHour, setSelectedHour] = useState('13');
  const [selectedMinute, setSelectedMinute] = useState('00');

  const handleSave = () => {
    onSave(`${selectedHour}:${selectedMinute}`);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              
              <Text style={styles.title}>Выберите время</Text>

              <View style={styles.pickersRow}>
                {/* Часы */}
                <View style={styles.pickerColumn}>
                  <Text style={styles.pickerHeader}>Ч</Text>
                  <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollArea}>
                    {hours.map((h) => (
                      <Pressable key={h} onPress={() => setSelectedHour(h)} style={[styles.pickerItem, selectedHour === h && styles.selectedItem]}>
                        <Text style={[styles.pickerText, selectedHour === h && styles.selectedText]}>{h}</Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>

                {/* Минуты */}
                <View style={styles.pickerColumn}>
                  <Text style={styles.pickerHeader}>М</Text>
                  <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollArea}>
                    {minutes.map((m) => (
                      <Pressable key={m} onPress={() => setSelectedMinute(m)} style={[styles.pickerItem, selectedMinute === m && styles.selectedItem]}>
                        <Text style={[styles.pickerText, selectedMinute === m && styles.selectedText]}>{m}</Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
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
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center' },
  container: { width: 320, height: 413, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#D9D9D9' },
  title: { fontSize: 16, fontWeight: '600', color: '#000000', textAlign: 'center', marginBottom: 16 },
  
  pickersRow: { flexDirection: 'row', justifyContent: 'center', gap: 20, flex: 1 },
  pickerColumn: { alignItems: 'center', flex: 1 },
  pickerHeader: { fontSize: 16, fontWeight: '600', color: '#116F63', marginBottom: 8 },
  scrollArea: { height: 200 },
  pickerItem: { height: 40, justifyContent: 'center', alignItems: 'center', width: 60 },
  selectedItem: { backgroundColor: '#E5F0ED', borderRadius: 8 },
  pickerText: { fontSize: 20, fontWeight: '500', color: '#000000' },
  selectedText: { fontWeight: '600', color: '#116F63' },

  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, gap: 10 },
  cancelButton: { flex: 1, height: 39, backgroundColor: '#E5F0ED', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  cancelButtonText: { fontSize: 13, fontWeight: '500', color: '#116F63' },
  saveButton: { flex: 1, height: 39, backgroundColor: '#116F63', borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#2D871F' },
  saveButtonText: { fontSize: 13, fontWeight: '500', color: '#FFFFFF' },
});