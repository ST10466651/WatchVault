import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Animated, Easing } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import AddItemScreen from './src/screens/AddItemScreen';
import ListScreen from './src/screens/ListScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import SplashScreen from './src/screens/SplashScreen';
import { DataProvider } from './src/context/DataContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#121212',
          height: 70, 
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#aaa',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      {[
        { name: 'Home', component: HomeScreen, icon: 'home-outline' },
        { name: 'List', component: ListScreen, icon: 'list-outline' },
        { name: 'Add', component: AddItemScreen, icon: 'add-circle-outline' },
      ].map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              // Smooth scale animation on focus
              const scale = new Animated.Value(focused ? 1.2 : 1);
              Animated.timing(scale, {
                toValue: focused ? 1.2 : 1,
                duration: 200,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
              }).start();

              return (
                <Animated.View style={{ transform: [{ scale }] }}>
                  <Ionicons name={tab.icon as any} color={color} size={size} />
                </Animated.View>
              );
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right', // smooth screen transitions
          }}
        >
          {/* Splash screen first */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
