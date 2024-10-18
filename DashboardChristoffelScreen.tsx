import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DishContext } from '../screens/DishContext'; // Import your context
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';
import { useNavigation } from '@react-navigation/native';

type DashboardChristoffelNavigationProp = StackNavigationProp<RootStackParamList, 'DashboardChristoffel'>;

const DashboardChristoffel: React.FC = () => {
  const navigation = useNavigation<DashboardChristoffelNavigationProp>();
  const context = useContext(DishContext);

  // Check if the context is undefined
  if (!context) {
    throw new Error('DashboardChristoffel must be used within a DishProvider');
  }

  const { addDish } = context; // Destructure addDish from context

  const [menuItems, setMenuItems] = useState([]);
  const [dishName, setDishName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // Load saved menu items from AsyncStorage when the component mounts
  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('menuItems');
        if (storedItems) {
          setMenuItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error('Failed to load menu items', error);
      }
    };

    loadMenuItems();
  }, []);

  // Save menu items to AsyncStorage whenever menuItems changes
  useEffect(() => {
    const saveMenuItems = async () => {
      try {
        await AsyncStorage.setItem('menuItems', JSON.stringify(menuItems));
      } catch (error) {
        console.error('Failed to save menu items', error);
      }
    };

    if (menuItems.length > 0) {
      saveMenuItems();
    }
  }, [menuItems]);

  const handleCreateDish = () => {
    const parsedPrice = parseFloat(price);

    // Check if the price is a valid number
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      alert('Please enter a valid price.');
      return;
    }

    const newDish = {
      id: Math.random().toString(), // Simulating a unique ID
      name: dishName,
      category,
      price: parsedPrice,
      description,
    };

    // Add the new dish to the context and update the local state
    addDish(newDish);
    setMenuItems([...menuItems, newDish]); // Update menu items list
    setDishName('');
    setCategory('');
    setPrice('');
    setDescription('');
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Text style={styles.dishName}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text>{item.category} - R{item.price.toFixed(2)}</Text>
    
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteDish(item.id)}>
        <Text style={styles.deleteButtonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={() => handleAddToHome(item)}>
        <Text style={styles.addButtonText}>Add to Home</Text>
      </TouchableOpacity>
      </View>
  );
  const handleDeleteDish = (id) => {
    const updatedMenuItems = menuItems.filter((item) => item.id !== id);
    setMenuItems(updatedMenuItems);
    addDish(updatedMenuItems); // Update the context with the new menu items
  };


  const handleAddToHome = (dish) => {
    console.log('Navigating to Home screen...');
    navigation.navigate('Home', { dish });
    console.log('Navigation complete.');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Chef's Dashboard</Text>
      <Text style={styles.subtitle}>Total Menu Items: {menuItems.length}</Text>

      {/* Create Dish Form */}
      <Text style={styles.subtitle}>Create New Dish</Text>
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateDish}>
        <Text style={styles.buttonText}>Create Dish</Text>
      </TouchableOpacity>

      {/* Menu Items List */}
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No menu items added yet.</Text>}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  menuItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF3737',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

});

export default DashboardChristoffel;
