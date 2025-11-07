import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import colors from '../theme/colors';
import { useData } from '../context/DataContext';
import uuid from 'react-native-uuid';

const AddItemScreen = ({ navigation }: any) => {
  const { addItem, items } = useData();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<'Movie' | 'Series' | 'Anime'>('Movie');
  const [status, setStatus] = useState<'Plan to Watch' | 'Watching' | 'Completed'>('Plan to Watch');
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState('');

  const handleSave = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      Alert.alert('Missing Title', 'Please enter a title before saving.');
      return;
    }

    // Check for duplicates (ignore case and extra spaces)
    const duplicate = items.some(
      (item) =>
        item.type === type &&
        item.title.trim().toLowerCase() === trimmedTitle.toLowerCase()
    );

    if (duplicate) {
      Alert.alert(
        'Duplicate Entry',
        `This ${type.toLowerCase()} is already in your WatchVault!`
      );
      return;
    }

    const newItem = {
      id: uuid.v4().toString(),
      title: trimmedTitle,
      type,
      status,
      notes,
      rating: rating ? Number(rating) : undefined,
    };

    addItem(newItem);
    Alert.alert('Success', `${trimmedTitle} added to your WatchVault!`);

    // Reset inputs to defaults
    setTitle('');
    setType('Movie');
    setStatus('Plan to Watch');
    setNotes('');
    setRating('');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.header}>Add to WatchVault</Text>

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter title..."
            placeholderTextColor="#777"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={type}
              onValueChange={(value) => setType(value)}
              dropdownIconColor={colors.accent}
              style={styles.picker}
            >
              <Picker.Item label="Movie" value="Movie" />
              <Picker.Item label="Series" value="Series" />
              <Picker.Item label="Anime" value="Anime" />
            </Picker>
          </View>

          <Text style={styles.label}>Status</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={status}
              onValueChange={(value) => setStatus(value)}
              dropdownIconColor={colors.accent}
              style={styles.picker}
            >
              <Picker.Item label="Plan to Watch" value="Plan to Watch" />
              <Picker.Item label="Watching" value="Watching" />
              <Picker.Item label="Completed" value="Completed" />
            </Picker>
          </View>

          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add your thoughts or notes..."
            placeholderTextColor="#777"
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          <Text style={styles.label}>Rating (1–10)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter rating..."
            placeholderTextColor="#777"
            value={rating}
            onChangeText={setRating}
            keyboardType="numeric"
            maxLength={2}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Ionicons name="save-outline" size={20} color={colors.text} />
            <Text style={styles.saveButtonText}>Save Item</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    color: colors.accent,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: colors.text,
    fontSize: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: colors.card,
    color: colors.text,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: colors.card,
    borderRadius: 10,
    marginBottom: 5,
  },
  picker: {
    color: colors.text,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 25,
  },
  saveButtonText: {
    color: colors.background,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddItemScreen;
