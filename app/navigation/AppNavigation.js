import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from '../screens/Home';
import Balance from '../screens/Balance';
import Transactions from '../screens/Transactions';

const Tab = createBottomTabNavigator();

function AppNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} sceneContainerStyle={{paddingTop:0, marginTop:0}}>
    <Tab.Screen
      name="Home"
      component={Home}
      
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
        headerShown: false,
        headerStyle:{paddingTop:0, marginTop:0 , height:0},
        
        
      }}
    />
    <Tab.Screen
      name="Balance"
      component={Balance}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="currency-inr" color={color} size={size} />
        ),
        headerShown: false
        
      }}
    />
    <Tab.Screen
      name="Transactions"
      component={Transactions}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="transfer" color={color} size={size} />
        ),
        headerShown: false
        
      }}
    />
    </Tab.Navigator>
  )
}

export default AppNavigation