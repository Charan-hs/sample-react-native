import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import LoginScreen from '../screens/Login'
import RegisterScreen from '../screens/RegisterScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
const Stack = createStackNavigator()

function AuthNavigation() {
  return (
   <Stack.Navigator >
       <Stack.Screen  
       name="Welcome"
       component={WelcomeScreen}
       options={{ headerShown: false }}
       />
       <Stack.Screen name="Login" component={ LoginScreen}  options={{ headerShown: false }} />
       <Stack.Screen name="Register" component={RegisterScreen}   options={{ headerShown: false }}/>
   </Stack.Navigator>
  )
}

export default AuthNavigation