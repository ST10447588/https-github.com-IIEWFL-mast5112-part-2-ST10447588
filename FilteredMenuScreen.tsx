import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './AppNavigator';

type FilteredMenuNavigationProp = StackNavigationProp<RootStackParamList, 'FilteredMenu'>;

type Dish = {
  id: string;
  name: string;
  category: string;
  price: number;
};

const dummyDishes: Dish[] = [
  { id: '1', name: 'Margherita Pizza', category: 'Pizza', price: 12.99 },
  { id: '2', name: 'Spaghetti Carbonara', category: 'Pasta', price: 14.99 },
  { id: '3', name: 'Caesar Salad', category: 'Salad', price: 9.99 },
  { id: '4', name: 'Chicken Parmesan', category: 'Main Course', price: 16.99 },
  { id: '5', name: 'Tiramisu', category: 'Dessert', price: 7.99 },
];

const FilteredMenuScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigation = useNavigation<FilteredMenuNavigationProp>();

  const filteredDishes = dummyDishes.filter(dish => 
    dish.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || dish.category === selectedCategory)
  );

  const categories = [...new Set(dummyDishes.map(dish => dish.category))];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search dishes..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <View style={styles.categoryContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(category === selectedCategory ? '' : category)}
          >
            <Text style={styles.categoryButtonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dishItem}
            onPress={() => {
              // Navigate to dish details or add to order
            }}
          >
            <Text style={styles.dishName}>{item.name}</Text>
            <Text style={styles.dishPrice}>${item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    color: '#333',
  },
  dishItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dishName: {
    fontSize: 16,
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilteredMenuScreen;