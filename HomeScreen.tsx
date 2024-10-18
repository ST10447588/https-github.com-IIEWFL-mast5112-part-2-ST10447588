import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList'; // Adjust the path if necessary
import { Course, CourseType, courses } from './MenuItemsScreen';
import { MenuItem } from './MenuItemsScreen'; // Adjust this import based on your structure
import { useNavigation,  useRoute } from '@react-navigation/native';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>(); // Get the navigation prop
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
 // Adjust as per your initial menu structure
 const route = useRoute();
  const dish = route.params?.dish; // Access the passed dish


  const handleSelectDish = (dish: Course) => {
    console.log("Selected dish:", dish); // Track selected dish
    setSelectedCourses((prevSelected) => [...prevSelected, dish]);
  };

  const handleAddAllCourses = () => {
    setSelectedCourses(courses); // Select all courses
  };

  const handleAddToHome = () => {
    if (selectedCourses.length > 0) {
      const newMenuItems: MenuItem[] = selectedCourses.map((course) => ({
        id: course.id,
        name: course.name,
        course,
      }));
      setMenu((prevMenu) => ({ items: [...prevMenu.items, ...newMenuItems] }));
      console.log("Menu items updated:", menu);
    } else {
      alert('No selected courses');
    }
  };

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()} >
          <Text>Back</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Menu</Text>
      <FlatList
        data={courses}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>{item.name}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleSelectDish(item)} >
              <Text>Select</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()} // Ensure unique keys
      />

      <View style={styles.dishes}>
        <Text style={styles.sectionTitle}>Dishes</Text>
        <FlatList
          data={courses}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.dishItem} onPress={() => handleSelectDish(item)} >
              <Text>{item.name}</Text>
              <Text style={styles.categoryLabel}>{CourseType[item.type]}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddAllCourses}>
        <Text style={styles.buttonText}>Add all courses</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAddToHome}>
        <Text style={styles.buttonText}>Add to home</Text>
      </TouchableOpacity>

   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default HomeScreen;
