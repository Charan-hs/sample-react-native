import React,{useState ,useEffect} from "react";
import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Toast from 'react-native-toast-message';

import {AuthContext} from "./app/auth/context.js";
import Balance from "./app/screens/Balance.js";
import Home from "./app/screens/Home.js";
import Transactions from "./app/screens/Transactions.js";
import WelcomeScreen from "./app/screens/WelcomeScreen.js";
import AppNavigation from "./app/navigation/AppNavigation.js";
import AuthNavigation from "./app/navigation/AuthNavigation.js";
import  authStorage from "./app/auth/storage";
import { postApi } from "./app/api/api.js";

export default function App() {
  const [user , setUser] = useState()
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user1 = await authStorage.getUser();
    console.log( user1)
    const userDetails  = await postApi('api/getDetails');
    if(userDetails.data) setUser(userDetails.data)
   
  };

  useEffect(() => {

    restoreUser()
  },[])



 
  return (
 
   <AuthContext.Provider value={{ user, setUser }}>
     <NavigationContainer>
      {user ? <AppNavigation /> : <AuthNavigation/>} 
     </NavigationContainer>
     <Toast />
   </AuthContext.Provider>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
