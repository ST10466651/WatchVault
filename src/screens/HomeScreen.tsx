import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../context/DataContext';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { items } = useData();

  // Count items by type
  const getCount = (type: string) => items.filter((i) => i.type === type).length;

  // Animation for cards
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Text style={styles.title}>🎬 WatchVault</Text>
        <Text style={styles.subtitle}>Your personal watchlist vault</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categories}>
            {['Movie', 'Series', 'Anime'].map((type) => (
              <Animated.View key={type} style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.categoryCard}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  onPress={() => navigation.navigate('List', { type })}
                >
                  <Ionicons
                    name={
                      type === 'Movies'
                        ? 'film-outline'
                        : type === 'Series'
                        ? 'tv-outline'
                        : 'planet-outline'
                    }
                    size={28}
                    color={colors.accent}
                  />
                  <Text style={styles.categoryText}>{type}</Text>
                  <Text style={styles.count}>{getCount(type)}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.addButton}
            onPress={() => navigation.navigate('Add')}
          >
            <Ionicons name="add-circle-outline" size={24} color={colors.text} />
            <Text style={styles.addButtonText}>Add New Item</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: colors.accent,
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 30,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryCard: {
    flex: 1,
    backgroundColor: colors.card,
    alignItems: 'center',
    paddingVertical: 25,
    borderRadius: 16,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.accent + '33', // subtle accent border to grab attention
  },
  categoryText: {
    color: colors.text,
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  count: {
    color: colors.accent,
    fontSize: 14,
    marginTop: 4,
    fontWeight: '700',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    padding: 15,
    borderRadius: 12,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  addButtonText: {
    color: colors.background,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
