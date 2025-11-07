import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text } from 'react-native';
import colors from '../theme/colors';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }: any) => {
  const leftDoorAnim = useRef(new Animated.Value(0)).current;
  const rightDoorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate doors opening
    Animated.parallel([
      Animated.timing(leftDoorAnim, {
        toValue: -width / 2 - 20, // move left off screen
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(rightDoorAnim, {
        toValue: width / 2 + 20, // move right off screen
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After animation, navigate to Home
      navigation.replace('Tabs');
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Left Door */}
      <Animated.View
        style={[
          styles.door,
          { left: 0, transform: [{ translateX: leftDoorAnim }] },
        ]}
      />
      {/* Right Door */}
      <Animated.View
        style={[
          styles.door,
          { right: 0, transform: [{ translateX: rightDoorAnim }] },
        ]}
      />
      {/* Vault Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>🔒 WatchVault</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0E0E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  door: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width / 2 + 20,
    backgroundColor: '#1C1C1C',
    zIndex: 10,
  },
  logoContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  logoText: {
    color: colors.accent,
    fontSize: 28,
    fontWeight: '700',
  },
});

export default SplashScreen;
