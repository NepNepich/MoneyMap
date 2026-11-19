import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Подключаем ваши скачанные иконки
const cardIcon = require('../../assets/card-icon.png');
const settingsIcon = require('../../assets/settings-icon.png');

interface AccountCardProps {
  title: string;
  subtitle: string;
  balanceText: string;
  onPress?: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({ title, subtitle, balanceText, onPress }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}>
            <LinearGradient
                colors={['#12A58B', '#073F35']} 
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }} // <--- Теперь градиент идет строго сверху вниз
                style={styles.card}
      >
        <View style={styles.topRow}>
          {/* Иконка карты из Figma */}
          <Image source={cardIcon} style={styles.cardIcon} resizeMode="contain" />
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          {/* Иконка шестеренки из Figma */}
          <Image source={settingsIcon} style={styles.settingsIcon} resizeMode="contain" />
        </View>

        <Text style={styles.balance}>{balanceText}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: 340, // Ограничитель для больших экранов
    height: 207,
    alignSelf: 'center',
    marginTop: 40,
    paddingHorizontal: 20, // Отступы, чтобы карточка не прилипала к краям на узких экранах
  },
  pressed: {
    opacity: 0.9,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 24,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardIcon: {
    width: 63,
    height: 43,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '400',
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 14,
    color: '#E3E8F2',
    fontWeight: '400',
    marginTop: 4,
  },
  settingsIcon: {
    width: 22,
    height: 22,
    marginTop: 4,
  },
  balance: {
    fontSize: 28,
    fontWeight: '600',
    color: '#F6F8FC',
  },
});