import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import { useData } from '../context/DataContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import ItemCard from '../components/ItemCard';

const { width } = Dimensions.get('window');

const categories = ['All', 'Movie', 'Series', 'Anime'];

const ListScreen = () => {
  const { items } = useData();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const [filter, setFilter] = useState<'All' | 'Plan to Watch' | 'Watching' | 'Completed'>('All');
  const [category, setCategory] = useState<'All' | 'Movie' | 'Series' | 'Anime'>('All');

  const filteredItems = items.filter((item) => {
    if (category !== 'All' && item.type !== category) return false;
    if (filter !== 'All' && item.status !== filter) return false;
    return true;
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>{route.params?.type || 'All'} List</Text>

        {/* HORIZONTAL CATEGORY SLIDER */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          style={styles.categorySlider}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                category === item && { backgroundColor: colors.accent },
              ]}
              onPress={() => setCategory(item as any)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === item && { color: colors.background, fontWeight: '700' },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* FILTER BUTTONS */}
        <View style={styles.filterContainer}>
          {['All', 'Plan to Watch', 'Watching', 'Completed'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterButton,
                filter === status && { backgroundColor: colors.accent },
              ]}
              onPress={() => setFilter(status as any)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === status && { color: colors.background, fontWeight: '700' },
                ]}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ITEM LIST */}
        {filteredItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="videocam-off-outline" size={60} color="#555" />
            <Text style={styles.emptyText}>No items found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            scrollEnabled={false} // ScrollView handles scrolling
            renderItem={({ item }) => (
              <ItemCard
                title={item.title}
                status={item.status}
                notes={item.notes}
                rating={item.rating}
                onPress={() => navigation.navigate('Details', { item })}
              />
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    color: colors.accent,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  categorySlider: {
    marginBottom: 17,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.card,
    borderRadius: 25,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  categoryText: {
    color: colors.text,
    fontSize: 14,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingVertical: 5,
    marginHorizontal: 3,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  filterText: {
    color: colors.text,
    fontSize: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: '#777',
    marginTop: 10,
    fontSize: 16,
  },
});

export default ListScreen;
