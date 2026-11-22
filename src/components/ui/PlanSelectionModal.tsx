import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';

interface PlanSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (planName: string) => void;
}

const PLANS = ['План на отпуск', 'Накопления', 'На машину'];

export const PlanSelectionModal: React.FC<PlanSelectionModalProps> = ({ visible, onClose, onSelect }) => {
  const [selectedPlan, setSelectedPlan] = useState('План на отпуск');

  const handleSelect = (plan: string) => {
    setSelectedPlan(plan);
    onSelect(plan);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              {PLANS.map((plan) => (
                <Pressable
                  key={plan}
                  style={[
                    styles.planItem,
                    selectedPlan === plan && styles.selectedPlanItem
                  ]}
                  onPress={() => handleSelect(plan)}
                >
                  <Text style={styles.planText}>{plan}</Text>
                </Pressable>
              ))}
              
              {/* Кнопка "Создать план" */}
              <Pressable style={styles.createPlanButton}>
                <Text style={styles.createPlanText}>Создать план</Text>
              </Pressable>
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
    backgroundColor: 'transparent', // Прозрачный фон, чтобы видеть таблицу (на скрине фон не затемнен)
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 170, // Отступ сверху, чтобы плашка встала под кнопкой "Основной план"
    paddingLeft: 30, // Отступ слева
  },
  container: {
    width: 239, // Из Figma (W 239)
    backgroundColor: 'rgba(128, 166, 153, 0.9)', // Фон 80A699
    borderRadius: 16,
    padding: 8,
    gap: 6,
  },
  planItem: {
    width: '100%',
    height: 60, // Из Figma
    backgroundColor: '#E5F0ED', // Grey_Cancel
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  selectedPlanItem: {
    borderWidth: 1,
    borderColor: 'rgba(246, 248, 252, 0.4)', // Легкая обводка для выбранного (из Figma)
  },
  planText: {
    fontSize: 20, // Из Figma
    fontWeight: '500',
    color: '#116F63', // Primary
  },
  createPlanButton: {
    width: 196,
    height: 54,
    backgroundColor: '#E5F0ED',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 4,
  },
  createPlanText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#116F63',
  },
});