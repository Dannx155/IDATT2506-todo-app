import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { ListItemModel } from '../models/ListItem';


type Props = {
  item: ListItemModel;
  onToggle: () => void;
  onDelete?: () => void;
};


const ListItem: React.FC<Props> = ({ item, onToggle, onDelete }) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      onLongPress={onDelete}
      style={styles.row}
      activeOpacity={0.7}
      accessibilityLabel={item.done ? `${item.text}, fullført` : item.text}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: item.done }}
    >
      <View style={[styles.checkbox, item.done && styles.checked]}>
        {item.done && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={[styles.text, item.done && styles.textDone]} numberOfLines={2}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    backgroundColor: '#fff'
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  checked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50'
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
    color: '#333',
    flex: 1
  },
  textDone: {
    textDecorationLine: 'line-through',
    color: '#999'
  }
});


export default React.memo(ListItem);