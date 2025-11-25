import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useLists } from '../contexts/ListsContext';

const ListTabs: React.FC = () => {
  const { lists, activeListId, setActiveList, createList, deleteList, renameList } = useLists();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  // A separate TextInput ref for every list ID
  const inputRefs = React.useRef<{ [key: string]: TextInput | null }>({});

  // Auto focus AFTER the input is mounted
  React.useEffect(() => {
    if (editingId) {
      setTimeout(() => {
        const ref = inputRefs.current[editingId];
        ref?.focus();
      }, 50);
    }
  }, [editingId]);

  const handleCreateList = async () => {
    const name = `Ny Liste`;
    await createList(name);
  };

  const handleLongPress = (listId: string, currentName: string) => {
    Alert.alert(
        'Liste alternativer',
        currentName,
        [
          { text: 'Avbryt', style: 'cancel' },
          {
            text: 'Endre navn',
            onPress: () => {
              setEditName(currentName);
              setEditingId(listId);
            }
          },
          {
            text: 'Slett',
            style: 'destructive',
            onPress: () => {
              Alert.alert('Bekreft sletting', 'Er du sikker på at du vil slette denne listen?', [
                { text: 'Avbryt', style: 'cancel' },
                { text: 'Slett', style: 'destructive', onPress: () => deleteList(listId) }
              ]);
            }
          }
        ]
    );
  };

  const handleSaveEdit = async (listId: string) => {
    if (editName.trim()) {
      await renameList(listId, editName.trim());
    }
    setEditingId(null);
    setEditName('');
  };

  return (
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {lists.map(l => (
              <View key={l.id} style={styles.tabContainer}>
                {editingId === l.id ? (
                    <TextInput
                        ref={(ref) => {
                          inputRefs.current[l.id] = ref;
                        }}
                        style={[styles.tab, styles.activeTab, styles.editInput]}
                        value={editName}
                        onChangeText={setEditName}
                        onSubmitEditing={() => handleSaveEdit(l.id)}
                        onBlur={() => handleSaveEdit(l.id)}
                        selectTextOnFocus={true}
                    />
                ) : (
                    <TouchableOpacity
                        onPress={() => setActiveList(l.id)}
                        onLongPress={() => handleLongPress(l.id, l.name)}
                        style={[styles.tab, activeListId === l.id && styles.activeTab]}
                    >
                      <Text style={styles.tabText} numberOfLines={1}>{l.name}</Text>
                    </TouchableOpacity>
                )}
              </View>
          ))}

          <TouchableOpacity onPress={handleCreateList} style={styles.addTab}>
            <Text style={styles.addText}>+ Ny liste</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  scroll: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  tabContainer: {
    marginRight: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    minWidth: 80,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#ffffff',
    borderColor: '#070707',
    borderWidth: 1,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  editInput: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    padding: 0,
  },
  addTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    marginLeft: 4,
  },
  addText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
});

export default ListTabs;
