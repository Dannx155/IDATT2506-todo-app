import React, { useMemo, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import ListTabs from '../components/ListTabs';
import InputField from '../components/InputField';
import ListItem from '../components/ListItem';
import { useLists } from '../contexts/ListsContext';
import { sortItemsForDisplay } from '../utils/sorting';


const HomeScreen: React.FC = () => {
  const { lists, activeListId, addItem, toggleItem, deleteItem } = useLists();
  const [text, setText] = useState('');


  const activeList = useMemo(() => lists.find(l => l.id === activeListId) ?? null, [lists, activeListId]);
  const items = useMemo(() => activeList ? sortItemsForDisplay(activeList.items) : [], [activeList]);


  const handleSubmit = useCallback(async () => {
    if (!activeList) return;
    if (!text.trim()) return;
    try {
      await addItem(activeList.id, text.trim());
      setText('');
    } catch (error) {
      Alert.alert('Feil', 'Kunne ikke legge til element. Prøv igjen.');
    }
  }, [activeList, text, addItem]);


  const handleToggle = useCallback((itemId: string) => {
    if (!activeList) return;
    toggleItem(activeList.id, itemId);
  }, [activeList, toggleItem]);


  const handleDelete = useCallback((itemId: string) => {
    if (!activeList) return;
    Alert.alert(
      'Slett element',
      'Er du sikker på at du vil slette dette elementet?',
      [
        { text: 'Avbryt', style: 'cancel' },
        {
          text: 'Slett',
          style: 'destructive',
          onPress: () => deleteItem(activeList.id, itemId)
        }
      ]
    );
  }, [activeList, deleteItem]);


  const renderItem = useCallback(({ item }: { item: typeof items[0] }) => (
    <ListItem
      item={item}
      onToggle={() => handleToggle(item.id)}
      onDelete={() => handleDelete(item.id)}
    />
  ), [handleToggle, handleDelete]);


  const renderEmpty = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.empty}>Ingen elementer i listen</Text>
      <Text style={styles.emptyHint}>Trykk på "Ny liste" for å opprette en liste</Text>
    </View>
  ), []);


  if (lists.length === 0) {
    return (
      <View style={styles.container}>
        <ListTabs />
        <View style={styles.emptyContainer}>
          <Text style={styles.empty}>Ingen lister ennå</Text>
          <Text style={styles.emptyHint}>Trykk på "+ Ny liste" for å opprette din første liste</Text>
        </View>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <ListTabs />
      {activeList && (
        <>
          <InputField
            placeholder="Legg til nytt element..."
            value={text}
            onChangeText={setText}
            onSubmit={handleSubmit}
          />
          <FlatList
            data={items}
            keyExtractor={i => i.id}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
            contentContainerStyle={items.length === 0 ? styles.emptyListContainer : undefined}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={10}
          />
        </>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32
  },
  emptyListContainer: {
    flexGrow: 1
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    fontWeight: '500'
  },
  emptyHint: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    color: '#999'
  }
});


export default HomeScreen;