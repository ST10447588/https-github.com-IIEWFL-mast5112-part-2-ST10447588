import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp , useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { NavigationContainerProps } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import OrderSummaryScreen from './OderSummaryScreen';

type DishDetailsScreenRouteProp = RouteProp<RootStackParamList, 'DishDetails'>;

type Props = {
  route: DishDetailsScreenRouteProp;
};




const DishDetailsScreen:  React.FC<Props> = ({ route }) => {

  const [quantity, setQuantity] = useState<number>(1); // Quantity state for the dish
const { dish } = route.params;

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
       
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Dish Image Section */}
      <View style={styles.dishImageContainer}>
  
      </View>

      {/* Dish Details Section */}
<View style={styles.dishDetails}>
  <Text style={styles.dishName}>{dish.name} {/* Display the dish name */}
  </Text>
  <Text style={styles.dishDescription}> {dish.description}
    {dish.description} {/* Display the dish description */}
  </Text>
  <Text style={styles.price}>Price: R{dish.price.toFixed(2)} {/* Display the price */}
  </Text>
</View>


      {/* Footer Section */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.backToMenuButton}>
          <Text style={styles.backToMenuButtonText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DishDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
  },
  dishImageContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  dishImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  dishDetails: {
    marginBottom: 20,
  },
  dishName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dishDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  orderSection: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  quantityButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    fontSize: 18,
  },
  addToOrderButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
  addToOrderButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  backToMenuButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  backToMenuButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});
