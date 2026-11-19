import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';

interface ViewTypeModalProps {
  visible: boolean;
  onClose: () => void;
  currentValue: string;
  onSelect: (value: string) => void;
}

const options = ['Неделя', 'Месяц', 'Квартал', 'Год'];

export const ViewTypeModal: React.FC<ViewTypeModalProps> = ({ visible, onClose, currentValue, onSelect }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              
              <Text style={styles.title}>Вид таблицы</Text>

              {/* Линия-разделитель */}
              <View style={styles.divider} />

              {/* Кнопки */}
              <View style={styles.buttonsList}>
                {options.map((option) => (
                  <Pressable
                    key={option}
                    onPress={() => {
                      onSelect(option);
                      onClose();
                    }}
                    style={[
                      styles.optionButton,
                      currentValue === option && styles.activeOptionButton
                    ]}
                  >
                    <Text style={[
                      styles.optionText,
                      currentValue === option && styles.activeOptionText
                    ]}>
                      {option}
                    </Text>
                  </Pressable>
                ))}
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
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.15)', // Из Figma (Line 1, 15% черного)
    marginBottom: 16,
  },
  buttonsList: {
    gap: 12,
  },
  optionButton: {
    width: '100%',
    height: 47,
    backgroundColor: '#E5F0ED', // Grey_Cancel из Figma
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeOptionButton: {
    borderWidth: 2,
    borderColor: '#116F63', // Рамка выбранного элемента
  },
  optionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#16805B', // Income из Figma
  },
  activeOptionText: {
    color: '#000000', // Или другой цвет для выбранного
  },
});