import React, { useState } from 'react';
import { View, Text, Image, TextInput , TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import  { NavigationStackProp } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
import { PropsWithChildren } from 'react';
import { useNavigation,  useRoute } from '@react-navigation/native';



type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  Home: undefined;
  // Add other screen names here
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};
const SignUpScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    console.log('Sign up process initiated');
    // Implement sign up logic here
    // After successful sign up, navigate to the HomeScreen
    navigation.navigate('Home');
  
  };
// navigation.navigate('Login');
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/ChefSpark.png')}/>
      <ScrollView>
        <View style={styles.form}>
          <TextInput
            style={styles.header}
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
          <TouchableOpacity style={styles.footer} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={navigateToLogin}>
            <Text>Already have an account? Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  form: {
    marginBottom: 20,
  },
  header: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    fontSize: 18,
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
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});


export default SignUpScreen;
