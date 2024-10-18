// First, import the necessary types from React Navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from  './RootStackParamList';
import { NavigationContainer} from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';


// importing the components


export import React from 'react';
 type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Settings: undefined;
};



// 1. LoginScreen
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}


  // Your component code here
  // Example navigation:
  // navigation.navigate('SignUp');


  //components
  import LoginScreen from './LoginScreen';
  import SignUpScreen from './SignUpScreen';
  import DashboardChristoffelScreen from './DashboardChristoffelScreen';
   import HomeScreen from '../screens/HomeScreen';
  import MenuItemsScreen from '../screens/MenuItemsScreen';
  import OrderSummaryScreen from '../screens/OderSummaryScreen';
  import FilteredMenuScreen from '../screens/FilteredMenuScreen';
  import CreateDishScreen from '../screens/CreateDishScreen';
  import DishDetailsScreen from '../screens/DishDetailsScreen';

  

// 2. SignUpScreen
type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
type SignUpScreenRouteProp = RouteProp<RootStackParamList, 'SignUp'>;

interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
  route: SignUpScreenRouteProp;
}



const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation, route }) => {
  // Your component code here
  // Example navigation:
  // navigation.navigate('DashboardChristoffel');
};

// 3. DashboardChristoffelScreen
type DashboardChristoffelScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DashboardChristoffel'>;
type DashboardChristoffelScreenRouteProp = RouteProp<RootStackParamList, 'DashboardChristoffel'>;

interface DashboardChristoffelScreenProps {
  navigation: DashboardChristoffelScreenNavigationProp;
  route: DashboardChristoffelScreenRouteProp;

}

// 4.HomeScreen
type HomeScreenProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;

interface HomelScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;

}


const DashboardChristoffelScreen: React.FC<DashboardChristoffelScreenProps> = ({ navigation, route }) => {
  // Your component code here
  // Example navigation:
  // navigation.navigate('EditMenu');
};




// 8. FilteredMenuScreen
type FilteredMenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FilteredMenu'>;
type FilteredMenuScreenRouteProp = RouteProp<RootStackParamList, 'FilteredMenu'>;

interface FilteredMenuScreenProps {
  navigation: FilteredMenuScreenNavigationProp;
  route: FilteredMenuScreenRouteProp;
}

const FilteredMenuScreen: React.FC<FilteredMenuScreenProps> = ({ navigation, route }) => {
  // Your component code here
  // Example navigation:
  // navigation.navigate('DishDetails', { dishId: '123' });
};



// 10. DishDetailsScreen
type DishDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DishDetails'>;
type DishDetailsScreenRouteProp = RouteProp<RootStackParamList, 'DishDetails'>;

interface DishDetailsScreenProps {
  navigation: DishDetailsScreenNavigationProp;
  route: DishDetailsScreenRouteProp;
}

const DishDetailsScreen: React.FC<DishDetailsScreenProps> = ({ navigation, route }) => {
  // Your component code here
  // Example of accessing route params:
  // const { dishId } = route.params;
  // Example navigation:
  // navigation.goBack();
};


