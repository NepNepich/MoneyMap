import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
        end={{ x: 0, y: 1 }} 
        style={styles.card}
      >
        <View style={styles.topRow}>
          {/* Увеличили размер иконки карты */}
          <Image source={cardIcon} style={styles.cardIcon} resizeMode="contain" />
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          <Image source={settingsIcon} style={styles.settingsIcon} resizeMode="contain" />
        </View>

        {/* Сумма теперь будет чуть выше за счет изменения justifyContent */}
        <Text style={styles.balance}>{balanceText}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: 340,
    height: 207,
    alignSelf: 'center',
    marginTop: 40,
    paddingHorizontal: 20, 
  },
  pressed: {
    opacity: 0.9,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 24,
    justifyContent: 'space-between', 
    paddingBottom: 32, 
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardIcon: {
    width: 69,       
    height: 64.54,   
    marginTop: -10,  
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    marginTop: 4, 
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular', // <--- ДОБАВЛЕН ШРИФТ
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 14,
    color: '#E3E8F2',
    fontFamily: 'Inter_400Regular', // <--- ДОБАВЛЕН ШРИФТ
    marginTop: 4,
  },
  settingsIcon: {
    width: 22,
    height: 22,
    marginTop: 8,
  },
  balance: {
    fontSize: 28,
    fontFamily: 'Inter_600SemiBold', // <--- ДОБАВЛЕН ЖИРНЫЙ ШРИФТ
    color: '#F6F8FC',
  },
});