import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { colors } from '../../theme/tokens';

interface SidebarMenuProps {
  visible: boolean;
  onClose: () => void;
  onItemPress?: (id: string) => void;
}

const menuItems = [
  { id: 'accounts', label: 'Счета' },
  { id: 'table', label: 'Таблица' },
  { id: 'balance', label: 'Сверка баланса' },
  { id: 'export', label: 'Экспорт/Импорт' },
  { id: 'settings', label: 'Настройки' },
];

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ visible, onClose, onItemPress }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Затемнение фона (закрывает меню по клику) */}
        <Pressable style={styles.backdrop} onPress={onClose} />

        {/* Сама панель */}
        <View style={styles.panel}>
          
          {/* Шапка меню */}
          <View style={styles.header}>
            <Text style={styles.title}>Меню</Text>
            <Pressable onPress={onClose} hitSlop={15}>
              <Text style={styles.closeIcon}>✕</Text>
            </Pressable>
          </View>

          {/* Список кнопок */}
          <View style={styles.buttonsList}>
            {menuItems.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => {
                  onItemPress?.(item.id);
                  onClose(); // Закрываем при клике
                }}
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.buttonText}>{item.label}</Text>
              </Pressable>
            ))}
          </View>

          {/* Кнопка "На главную" */}
          <Pressable
            onPress={() => onItemPress?.('home')}
            style={({ pressed }) => [
              styles.homeButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.homeButtonText}>На главную</Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  panel: {
    width: 290,
    height: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40, 
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
  closeIcon: {
    fontSize: 30,
    color: '#000000',
    fontWeight: '300',
  },
  buttonsList: {
    flex: 1,
    gap: 17,
  },
  button: {
    width: 250,
    height: 70,
    backgroundColor: colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.textOnPrimary,
    fontSize: 28,
    fontWeight: '400',
  },
  pressed: {
    opacity: 0.7,
  },
  homeButton: {
    width: 250,
    height: 70,
    backgroundColor: '#E5F0ED',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  homeButtonText: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '400',
  },
});