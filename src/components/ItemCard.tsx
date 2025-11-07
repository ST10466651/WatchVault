import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import colors from '../theme/colors';

interface ItemCardProps {
  title: string;
  status: string;
  notes?: string;
  rating?: number;
  onPress: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ title, status, notes, rating, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{title}</Text>
        </View>
          <Text style={styles.status}>{status}</Text>
        {notes ? (
          <Text numberOfLines={2} style={styles.notes}>
            {notes}
          </Text>
        ) : (
          <Text style={styles.notesPlaceholder}>No notes</Text>
        )}

        <Text style={styles.rating}>{rating ? `⭐ ${rating}/10` : 'No rating'}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  status: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '200',
    paddingBottom: 8,
    marginTop: -10,
  },
  notes: {
    color: '#ccc',
    fontSize: 14,
  },
  notesPlaceholder: {
    color: '#555',
    fontSize: 14,
    fontStyle: 'italic',
  },
  rating: {
    color: colors.accent,
    marginTop: 5,
    fontWeight: '600',
  },
});

export default ItemCard;
