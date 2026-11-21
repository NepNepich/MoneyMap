import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';

const iconEdit = require('../../assets/icon-edit.png');
const iconTrash = require('../../assets/icon-trash.png');

export interface OperationHistoryItem {
  id: string;
  date: string;
  comment: string;
  amount: string;
}

interface CellHistoryModalProps {
  visible: boolean;
  onClose: () => void;
  dateRange: string;
  history: OperationHistoryItem[];
  onAdd: () => void;
  onEdit: () => void;
  onSave: () => void;
  onEditItem?: (id: string) => void;
  onDeleteItem?: (id: string) => void;
}

export const CellHistoryModal: React.FC<CellHistoryModalProps> = ({
  visible,
  onClose,
  dateRange,
  history,
  onAdd,
  onEdit,
  onSave,
  onEditItem,
  onDeleteItem,
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              
              <Text style={styles.headerTitle}>{dateRange}</Text>

              <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
                {history.length === 0 ? (
                  <View style={styles.emptyState} />
                ) : (
                  history.map((item) => (
                    <View key={item.id} style={styles.historyItem}>
                      
                      {/* Дата и Сумма */}
                      <View style={styles.itemLeft}>
                        <View style={styles.itemTopRow}>
                          {/* Увеличили ширину даты, чтобы не переносилось */}
                          <Text style={styles.itemDate}>{item.date}</Text>
                          <View style={styles.amountBox}>
                            <Text style={styles.itemAmount}>{item.amount}</Text>
                          </View>
                        </View>
                        <Text style={styles.itemComment}>{item.comment}</Text>
                      </View>

                      {/* Кнопки действий (выровнены по высоте с суммой) */}
                      <View style={styles.itemActions}>
                        <Pressable style={styles.iconActionButton} onPress={() => onEditItem?.(item.id)}>
                          <Image source={iconEdit} style={styles.actionIconImage} resizeMode="contain" />
                        </Pressable>
                        <Pressable style={styles.iconActionButton} onPress={() => onDeleteItem?.(item.id)}>
                          <Image source={iconTrash} style={styles.actionIconImage} resizeMode="contain" />
                        </Pressable>
                      </View>

                    </View>
                  ))
                )}
              </ScrollView>

              <View style={styles.actionsGrid}>
                <View style={styles.actionRow}>
                  <Pressable style={styles.primaryButton} onPress={onAdd}>
                    <Text style={styles.primaryButtonText}>Добавить</Text>
                  </Pressable>
                  <Pressable style={styles.secondaryButton} onPress={onEdit}>
                    <Text style={styles.secondaryButtonText}>Редактировать</Text>
                  </Pressable>
                </View>
                
                <View style={styles.actionRow}>
                  <Pressable style={styles.secondaryButton} onPress={onSave}>
                    <Text style={styles.secondaryButtonText}>Сохранить</Text>
                  </Pressable>
                  <Pressable style={styles.secondaryButton} onPress={onClose}>
                    <Text style={styles.secondaryButtonText}>Закрыть</Text>
                  </Pressable>
                </View>
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
    alignItems: 'center' 
  },
  container: { 
    width: 350, 
    maxHeight: '80%', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 20, 
    padding: 20, 
    borderWidth: 1, 
    borderColor: '#D9D9D9', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 4, 
    elevation: 5 
  },
  headerTitle: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#000000', 
    textAlign: 'center', 
    marginBottom: 16 
  },
  
  listContainer: { 
    marginBottom: 20, 
    maxHeight: 300 
  },
  emptyState: { 
    height: 40 
  },
  
  // Строка истории
  historyItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', // Выравниваем по верхнему краю
    marginBottom: 16 
  },
  itemLeft: { 
    flex: 1, 
    paddingRight: 16 // Отступ от кнопок
  },
  itemTopRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 4,
    gap: 8
  },
  
  // Дата (увеличили ширину)
  itemDate: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#000000', 
    width: 45 // Изменили с 30 на 45, чтобы "09.11" влезало
  },
  
  // Блок с суммой
  amountBox: { 
    flex: 1, // Занимает все доступное пространство
    height: 45, 
    backgroundColor: '#D9D9D9', 
    borderRadius: 16, 
    paddingHorizontal: 12, 
    justifyContent: 'center',
  },
  itemAmount: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#000000' 
  },
  
  itemComment: { 
    fontSize: 13, 
    fontWeight: '400', 
    color: 'rgba(0, 0, 0, 0.3)', 
    paddingLeft: 53 // Отступ под сумму (45 дата + 8 gap)
  },
  
  // Кнопки-иконки
  itemActions: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6 
  },
  iconActionButton: { 
    width: 40, 
    height: 42, 
    backgroundColor: '#D9D9D9', 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  actionIconImage: {
    width: 24, 
    height: 24,
  },

  actionsGrid: { 
    gap: 10 
  },
  actionRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    gap: 10 
  },
  primaryButton: { 
    flex: 1, 
    height: 63, 
    backgroundColor: '#116F63', 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  primaryButtonText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#FFFFFF' 
  },
  secondaryButton: { 
    flex: 1, 
    height: 63, 
    backgroundColor: '#D9D9D9', 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  secondaryButtonText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#000000' 
  },
});