import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { initialMenu, MenuItem } from './HomeScreen';

enum CourseType {
  STARTER,
  MAIN,
  DESSERT,
  BEVERAGE
}

interface Course {
  id: number;
  name: string;
  type: CourseType;
  price: string;
}

const MenuItemsScreen = ({ route }) => {
  const { menuItems } = route.params;

  const courses: Course[] = [
    { id: 1, name: 'Spring Rolls', type: CourseType.STARTER, price: 'R15' },
    { id: 2, name: 'Garlic Bread', type: CourseType.STARTER, price: 'R13' },
    { id: 3, name: 'Grilled Chicken', type: CourseType.MAIN, price: 'R30' },
    { id: 4, name: 'Steak', type: CourseType.MAIN, price: 'R50' },
    { id: 5, name: 'Ice Cream', type: CourseType.DESSERT, price: 'R30' },
    { id: 6, name: 'Cheesecake', type: CourseType.DESSERT, price: 'R45' },
    { id: 7, name: 'Coca Cola', type: CourseType.BEVERAGE, price: 'R25' },
    { id: 8, name: 'Orange Juice', type: CourseType.BEVERAGE, price: 'R13' },
  ];

  const [items, setItems] = useState<Course[]>(menuItems ?? []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!menuItems) {
      setLoading(true);
      const fetchMenuItems = async () => {
        try {
          if (courses) {
            setItems(courses);
          } else {
            setError('No courses available');
          }
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchMenuItems();
    }
  }, [menuItems]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name} - {item.price}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Error: {error}</Text>
      </View>
    );
  }

  if (!menuItems) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>No menu items available</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>No menu items available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu Items</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 15,
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
    fontFamily: 'Monospace',
  },
});

export default MenuItemsScreen;