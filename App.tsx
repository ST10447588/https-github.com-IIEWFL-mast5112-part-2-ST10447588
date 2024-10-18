import React, { useCallback, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  LoginScreen  from '../ChefSpark/screens/LoginScreen';
import SignUpScreen  from './screens/SignUpScreen';
import  HomeScreen  from './screens/HomeScreen';
import MenuItemsScreen from './screens/MenuItemsScreen';
import FilteredMenuScreen  from './screens/FilteredMenuScreen';
import  DashboardChristoffelScreen  from './screens/DashboardChristoffelScreen';
import DishDetailsScreen  from './screens/DishDetailsScreen';
import   OrderSummaryScreen  from './screens/OderSummaryScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { AppRegistry } from 'react-native';
import { registerRootComponent } from 'expo';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import  { useFocusEffect } from '@react-navigation/native';
import  { DishProvider } from './screens/DishContext';


// Define the type for the stack navigator
export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  DashboardClient: undefined;
  HomeScreen:  undefined;
  MenuItems: undefined;
  FilteredMenu: undefined;
  DashboardChristoffel: undefined;
  CreateDish: undefined;
  DishDetails: { dishId: undefined }; // Assuming you pass a dishId to DishDetails
  OrderSummary: undefined;
};

const Stack = createStackNavigator();



const App: React.FC =  () => {
return (
  <DishProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MenuItems" component={MenuItemsScreen} />
        <Stack.Screen name="FilteredMenu" component={FilteredMenuScreen} />
        <Stack.Screen name="DashboardChristoffel" component={DashboardChristoffelScreen} />
        <Stack.Screen name="DishDetails" component={DishDetailsScreen} />
        <Stack.Screen name="Order" component={OrderSummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </DishProvider>
  );
};


export default App;
