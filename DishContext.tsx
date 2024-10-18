import React, { createContext, useState, ReactNode } from 'react'
import DashboardChristoffel from './DashboardChristoffelScreen';
import {  NavigationContainer } from '@react-navigation/native';



interface Dish {
  id: string;
  name: string;
  price: number;
  description: string;
}


interface DishContextType {
  dishes: Dish[];
  addDish: (dish: Dish) => void;
  setDishes: React.Dispatch<React.SetStateAction<Dish[]>>;
}

export const DishContext = createContext<DishContextType | undefined>(undefined);

export const DishProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dishes, setDishes] = useState<Dish[]>([]);

  const addDish = (dish) =>  {
    setDishes([...dishes, dish]);
    };


  return (
    <DishContext.Provider value={{ dishes,  addDish, setDishes }}>
      {children}
    
    </DishContext.Provider>
  );
};
export  default DishProvider;

