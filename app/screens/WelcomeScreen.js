import React from "react";
import { Text, ImageBackground, StyleSheet, View,TouchableOpacity } from "react-native";



export default function WelcomeScreen({ navigation }) {
  return (
 

    <ImageBackground
      style={styles.background}
      source={require("../assets/backgound.jpg")}
    >
      <View style={styles.textCon}>
        <Text style={styles.text}>Welcome !!</Text>
      </View>
      <View style={styles.loginButton}>
        <TouchableOpacity onPress={() => navigation.navigate('Login', {type: 'login'})}><Text style={styles.buttontext}>Login</Text></TouchableOpacity>
      </View>
      <View style={styles.registerButton}>

        <TouchableOpacity onPress={() => navigation.navigate('Register', {type: 'register'})}><Text style={styles.buttontext}>Register</Text></TouchableOpacity>
      </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#151D3B",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  
    
  },
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#D82148",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    fontSize: 24,
    color: "#fff",
  },
  textCon: {
    position: "absolute",
    top: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttontext: {
      color: '#fff',
      fontSize:18
  }
});
