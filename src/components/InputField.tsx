import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';


type Props = {
  placeholder?: string;
  value: string;
  onChangeText: (t: string) => void;
  onSubmit: () => void;
};


const InputField: React.FC<Props> = ({ placeholder, value, onChangeText, onSubmit }) => {
  const ref = useRef<TextInput | null>(null);


  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit();
    // Keep focus after submission
    setTimeout(() => ref.current?.focus(), 100);
  };


  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
        accessibilityLabel="Legg til nytt element"
        accessibilityHint="Skriv inn tekst og trykk Enter for å legge til"
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9'
  }
});


export default React.memo(InputField);