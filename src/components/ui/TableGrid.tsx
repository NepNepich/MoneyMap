import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { CellHistoryModal } from './CellHistoryModal';
import { EditOperationModal } from './EditOperationModal';
import { AddOperationModal } from './AddOperationModal';
import { NotificationSettingsModal } from './NotificationSettingsModal';

interface TableGridProps {
  startDate: Date;
  viewType?: 'Неделя' | 'Месяц' | 'Квартал' | 'Год';
  isFact?: boolean;
}

const articles = [
  { id: '1', name: 'Доходы', type: 'header' },
  { id: '2', name: 'Подработка', type: 'row' },
  { id: '3', name: 'Взятие займа', type: 'row' },
  { id: '4', name: 'Баланс', type: 'balance' },
  { id: '5', name: 'Расходы', type: 'header_expense' },
  { id: '6', name: 'Еда', type: 'row' },
  { id: '7', name: 'Транспорт', type: 'row' },
  { id: '8', name: 'Аренда', type: 'row' },
  { id: '9', name: 'Интернет', type: 'row' },
  { id: '10', name: 'Мобильная связь', type: 'row' },
  { id: '11', name: 'Развлечения', type: 'row' },
];

interface Operation {
  id: string;
  articleId: string;
  date: string; // YYYY-MM-DD
  amount: string;
  comment: string;
  isFact: boolean;
}

export const TableGrid: React.FC<TableGridProps> = ({ startDate, viewType = 'Месяц', isFact = true }) => {
  const [operations, setOperations] = useState<Operation[]>([
    { id: '1', articleId: '3', date: '2026-11-01', amount: '1 000', comment: 'Первый займ', isFact: false },
    { id: '2', articleId: '3', date: '2026-11-08', amount: '1 000', comment: 'Второй займ', isFact: true },
    { id: '3', articleId: '6', date: '2026-11-08', amount: '5056', comment: 'Продукты', isFact: false },
  ]);

  // Состояния для модальных окон
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  
  // Данные выбранной ячейки (статья, диапазон дат и подпись колонки)
  const [selectedCell, setSelectedCell] = useState<{ 
    articleId: string; 
    articleName: string; 
    startDate: Date; 
    endDate: Date; 
    label: string 
  } | null>(null);
  
  const [editingOperation, setEditingOperation] = useState<Operation | null>(null);

  const fixedColWidth = 120;
  const dataColWidth = 100;

  // Генерация колонок в зависимости от выбранного вида
  const columns: { label: string; start: Date; end: Date }[] = [];
  
  if (viewType === 'Неделя') {
    const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    for (let i = 0; i < 12; i++) {
      const start = new Date(startDate);
      start.setDate(startDate.getDate() + i * 7);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      columns.push({ 
        label: `${start.getDate()} ${months[start.getMonth()]}\n${end.getDate()} ${months[end.getMonth()]}`, 
        start, 
        end 
      });
    }
  } else if (viewType === 'Месяц') {
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    for (let i = 0; i < 12; i++) {
      const mIndex = (startDate.getMonth() + i) % 12;
      const y = startDate.getFullYear() + Math.floor((startDate.getMonth() + i) / 12);
      const start = new Date(y, mIndex, 1);
      const end = new Date(y, mIndex + 1, 0);
      columns.push({ label: `${months[mIndex]}\n${y}`, start, end });
    }
  } else if (viewType === 'Квартал') {
    const quarters = ['I кв', 'II кв', 'III кв', 'IV кв'];
    const currentQuarter = Math.floor(startDate.getMonth() / 3);
    for (let i = 0; i < 12; i++) {
      const qIndex = (currentQuarter + i) % 4;
      const y = startDate.getFullYear() + Math.floor((currentQuarter + i) / 4);
      const start = new Date(y, qIndex * 3, 1);
      const end = new Date(y, (qIndex + 1) * 3, 0);
      columns.push({ label: `${quarters[qIndex]}\n${y}`, start, end });
    }
  } else {
    for (let i = 0; i < 12; i++) {
      const y = startDate.getFullYear() + i;
      columns.push({ 
        label: `${y}`, 
        start: new Date(y, 0, 1), 
        end: new Date(y, 11, 31) 
      });
    }
  }

  // Подсчет суммы для ячейки (суммирует все операции, попадающие в диапазон дат)
  const getCellSum = (articleId: string, colStart: Date, colEnd: Date, showFact: boolean) => {
    const relevantOps = operations.filter(op => {
      const opDate = new Date(op.date);
      return (
        op.articleId === articleId && 
        op.isFact === showFact && 
        opDate >= colStart && 
        opDate <= colEnd
      );
    });
    
    if (relevantOps.length === 0) return '—';
    
    const total = relevantOps.reduce((acc, op) => acc + parseFloat(op.amount.replace(/[^\d.-]/g, '')), 0);
    return total.toFixed(2).replace('.00', '');
  };

  const getValueColor = (val: string, isPlan: boolean, isBalanceRow: boolean) => {
    if (val === '—') return '#000000';
    if (isBalanceRow) return '#4E60BD';
    if (isPlan) return '#848080';
    return '#2D871F';
  };

  // Обработчик клика по ячейке
  const handleCellPress = (articleId: string, articleName: string, start: Date, end: Date, label: string) => {
    setSelectedCell({ articleId, articleName, startDate: start, endDate: end, label });
    setIsHistoryVisible(true);
  };

  // Фильтрация и сортировка истории для выбранной ячейки
  const historyForCell = selectedCell 
    ? operations
        .filter(op => {
          const opDate = new Date(op.date);
          return (
            op.articleId === selectedCell.articleId && 
            opDate >= selectedCell.startDate && 
            opDate <= selectedCell.endDate
          );
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : [];

  // Добавление новой операции
  const handleAddOperation = (data: { amount: string; comment: string; isFact: boolean; date: string; regularity?: string }) => {
  if (!selectedCell) return;

  const [day, month] = data.date.split('.');
  const year = selectedCell.startDate.getFullYear();
  const baseDate = new Date(year, parseInt(month) - 1, parseInt(day));

  const newOps: Operation[] = [];

  // Если регулярности нет или она "Каждый месяц" / "Настраиваемый" и т.д.
  if (data.regularity === 'Каждый месяц') {
    // Генерируем 12 месяцев (например, до конца года)
    for (let i = 0; i < 12; i++) {
      const opDate = new Date(baseDate);
      opDate.setMonth(baseDate.getMonth() + i);
      
      newOps.push({
        id: `${Date.now()}_${i}`,
        articleId: selectedCell.articleId,
        date: opDate.toISOString().split('T')[0],
        amount: data.amount,
        comment: data.comment,
        isFact: data.isFact,
      });
    }
  } else {
    // Обычная операция
    newOps.push({
      id: Date.now().toString(),
      articleId: selectedCell.articleId,
      date: baseDate.toISOString().split('T')[0],
      amount: data.amount,
      comment: data.comment,
      isFact: data.isFact,
    });
  }

  setOperations(prev => [...prev, ...newOps]);
  setIsAddVisible(false);
};

  // Открытие окна редактирования
  const handleEditClick = (opId: string) => {
    const op = operations.find(o => o.id === opId);
    if (op) {
      setEditingOperation(op);
      setIsEditVisible(true);
    }
  };

  // Сохранение отредактированной операции
  const handleSaveEdit = (newAmount: string, newComment: string) => {
    if (!editingOperation) return;
    setOperations(prev => prev.map(op => 
      op.id === editingOperation.id ? { ...op, amount: newAmount, comment: newComment } : op
    ));
  };

  // Удаление операции
  const handleDeleteOperation = (opId: string) => {
    setOperations(prev => prev.filter(op => op.id !== opId));
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.verticalScroll}>
        <View style={styles.tableRow}>
          
          {/* Левая фиксированная колонка */}
          <View style={[styles.fixedColumn, { width: fixedColWidth }]}>
            <View style={styles.headerCellName}>
              <Text style={styles.headerText}>Статья</Text>
            </View>
            {articles.map((article, index) => {
              let textColor = '#000000';
              if (article.type === 'header') textColor = '#2D871F';
              if (article.type === 'header_expense') textColor = '#BD4E4E';
              if (article.type === 'balance') textColor = '#4E60BD';
              
              const isEven = index % 2 === 0;
              
              return (
                <View key={article.id} style={[styles.cellName, { backgroundColor: isEven ? '#FFFFFF' : '#F3F9F3' }]}>
                  <Text style={[styles.cellNameText, { color: textColor }]} numberOfLines={2}>
                    {article.name}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Правая скроллируемая часть */}
          <ScrollView horizontal showsHorizontalScrollIndicator={true} nestedScrollEnabled={true} style={styles.horizontalScroll}>
            <View>
              <View style={styles.headerRow}>
                {columns.map((col, index) => (
                  <View key={index} style={[styles.headerCellDate, { width: dataColWidth }]}>
                    <Text style={styles.headerDateText}>{col.label}</Text>
                  </View>
                ))}
              </View>
              
              {articles.map((article, index) => {
                const isEven = index % 2 === 0;
                const isBalanceRow = article.type === 'balance';
                
                return (
                  <View key={article.id} style={styles.dataRow}>
                    {columns.map((col, colIndex) => {
                      const val = getCellSum(article.id, col.start, col.end, isFact);
                      const color = getValueColor(val, !isFact, isBalanceRow);

                      return (
                        <Pressable 
                          key={colIndex} 
                          style={[styles.cellValue, { width: dataColWidth, backgroundColor: isEven ? '#FFFFFF' : '#F3F9F3' }]}
                          onPress={() => handleCellPress(article.id, article.name, col.start, col.end, col.label)}
                        >
                          <Text style={[styles.cellValueText, { color }]}>{val}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Модальные окна */}
      
      <CellHistoryModal
        visible={isHistoryVisible}
        onClose={() => setIsHistoryVisible(false)}
        dateRange={selectedCell?.label.replace('\n', ' - ') || ''}
        history={historyForCell.map(op => ({
          id: op.id,
          date: op.date.split('-').reverse().slice(0, 2).join('.'),
          comment: op.comment,
          amount: `${op.amount} ₽`
        }))}
        onAdd={() => setIsAddVisible(true)}
        onEdit={() => console.log('Редактировать')}
        onSave={() => console.log('Сохранить')}
        onEditItem={handleEditClick}
        onDeleteItem={handleDeleteOperation}
      />

      <EditOperationModal
        visible={isEditVisible}
        onClose={() => setIsEditVisible(false)}
        initialData={editingOperation ? { 
          amount: editingOperation.amount, 
          comment: editingOperation.comment, 
          date: editingOperation.date 
        } : null}
        articleName={selectedCell?.articleName || ''}
        onSave={handleSaveEdit}
      />

      {/* Окно уведомлений (открывается поверх окна добавления) */}
      <NotificationSettingsModal 
        visible={isNotificationVisible}
        onClose={() => setIsNotificationVisible(false)}
        onSave={() => console.log('Настройки уведомлений сохранены')}
      />

      {selectedCell && (
        <AddOperationModal
          visible={isAddVisible}
          onClose={() => setIsAddVisible(false)}
          articleName={selectedCell.articleName}
          initialDate={`${selectedCell.startDate.getDate()}.${selectedCell.startDate.getMonth() + 1}`}
          onSave={handleAddOperation}
          
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  verticalScroll: { flex: 1, backgroundColor: '#FFFFFF' },
  tableRow: { flexDirection: 'row' },
  fixedColumn: { borderRightWidth: 1, borderColor: '#B0B0B0' },
  headerCellName: { height: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: '#B0B0B0' },
  cellName: { height: 40, justifyContent: 'center', paddingLeft: 8, borderBottomWidth: 1, borderColor: '#B0B0B0' },
  cellNameText: { fontSize: 16, fontWeight: '600' },
  horizontalScroll: { flex: 1 },
  headerRow: { flexDirection: 'row', height: 50, borderBottomWidth: 1, borderColor: '#B0B0B0' },
  headerCellDate: { justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderColor: '#B0B0B0' },
  headerText: { fontSize: 20, fontWeight: '600', color: '#000000' },
  headerDateText: { fontSize: 14, fontWeight: '600', textAlign: 'center', color: '#000000', lineHeight: 18 },
  dataRow: { flexDirection: 'row' },
  cellValue: { height: 40, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#B0B0B0' },
  cellValueText: { fontSize: 16, fontWeight: '600' },
});