import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { Animated } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,  useRoute } from '@react-navigation/native';


// Stack navigator setup
const Stack = createNativeStackNavigator();

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MenuItem" component={MenuItemScreen} />
        <Stack.Screen name="FilteredMenu" component={FilteredMenuScreen} />
        <Stack.Screen name="DashboardChristoffel" component={DashboardChristoffelScreen} />
        <Stack.Screen name="CreateDish" component={CreateDishScreen} />
        <Stack.Screen name="DishDetails" component={DishDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// FadeInView component for smooth animations
const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

// LoginScreen component

 const LoginScreen:  React.FC = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login attempted');

    if (username === 'Christoffel') {
      // Navigate to the chef's dashboard
      navigation.navigate('DashboardChristoffel');
    } else {
      // Navigate to the HomeScreen
      
      navigation.navigate('Home');
    
    }
   
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    
      <ScrollView>
        <SafeAreaView>
    <View style={styles.container}>
      <Image source={require('../assets/ChefSpark.png')} style={styles.logo} />
      <FadeInView style={styles.header}>
        <Text style={styles.title}>Login</Text>
      </FadeInView>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.footer} onPress={navigateToSignUp}>
        <Text style={styles.footerText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
    </ScrollView>
  );
};

// SignUpScreen component
const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const userDetails = { name, email, password };

    try {
      await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
      console.log('User signed up successfully', userDetails);
      navigation.navigate('Home');
    } catch (err) {
      console.log('Error saving user details:', err);
      setError('Failed to sign up. Please try again.');
    }
  };
  const  navigateToSignup = () => {
    navigation.navigate('SignUp');
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.footer} onPress={navigateToLogin}>
            <Text style={styles.footerText}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  forgotPassword: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: 'blue',
    textAlign: 'center',
  },
  footer: {
    marginTop: 10,
  },
  footerText: {
    color: 'blue',
    textAlign: 'center',
  },
});

export default LoginScreen;