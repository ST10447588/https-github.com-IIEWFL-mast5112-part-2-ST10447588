import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './RootStackParamList';

type OrderSummaryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OrderSummary'>;
type OrderSummaryScreenRouteProp = RouteProp<RootStackParamList, 'OrderSummary'>;

interface OrderSummaryScreenProps {
  navigation: OrderSummaryScreenNavigationProp;
  route: OrderSummaryScreenRouteProp;
}

const OrderSummaryScreen: React.FC<OrderSummaryScreenProps> = ({ navigation, route }) => {
  const { orderId } = route.params; // Access the orderId passed to the screen

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      <Text style={styles.orderId}>Order ID: {orderId}</Text>
      <Text>Here are the details of your order...</Text>

      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderId: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default OrderSummaryScreen;
