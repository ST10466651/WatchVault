import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import colors from '../theme/colors';
import { useData } from '../context/DataContext';
import { useRoute, useNavigation } from '@react-navigation/native';

const DetailsScreen = () => {
  const { items, updateItem, deleteItem } = useData();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const item = route.params?.item;

  const [title, setTitle] = useState(item.title);
  const [status, setStatus] = useState(item.status);
  const [notes, setNotes] = useState(item.notes || '');
  const [rating, setRating] = useState(item.rating?.toString() || '');

  if (!item) return <Text>Item not found</Text>;

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a title before saving.');
      return;
    }

    updateItem({
      ...item,
      title: title.trim(),
      status,
      notes,
      rating: rating ? Number(rating) : undefined,
    });

    Alert.alert('Saved!', `${title} has been updated.`);
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteItem(item.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{item.type} Details</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title..."
        placeholderTextColor="#777"
      />

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
        value={notes}
        onChangeText={setNotes}
        placeholder="Add your notes..."
        placeholderTextColor="#777"
        multiline
      />

      <Text style={styles.label}>Rating (1–10)</Text>
      <TextInput
        style={styles.input}
        value={rating}
        onChangeText={setRating}
        placeholder="Enter rating..."
        placeholderTextColor="#777"
        keyboardType="numeric"
        maxLength={2}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Ionicons name="save-outline" size={20} color={colors.background} />
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Ionicons name="trash-outline" size={20} color="#fff" />
        <Text style={styles.deleteButtonText}>Delete Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4C4C',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 15,
  },
  deleteButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DetailsScreen;
