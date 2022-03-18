import React from 'react'
import { Text,StyleSheet,View ,TouchableOpacity} from 'react-native'
import AppTextInput from '../components/AppTextInput'
import Screen from '../components/Screen'

function AuthScreen(props) {
  const {type} = props
  return (
    <Screen>
      <Text style={styles.text}>{type === 'login'? 'Login': 'Register'}</Text>
      <AppTextInput icon='email' placeholder="Email"></AppTextInput>
      <AppTextInput secureTextEntry={true} icon='lock' type='password' placeholder="Password"></AppTextInput>

      <View>
        <TouchableOpacity style={styles.button}>
<Text style={styles.buttontext}>{type === 'login'? 'Login': 'Register'}</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize:20,
    paddingLeft:10
  },
  button: {
    width: "100%",
    height: 60,
    backgroundColor: "#151D3B",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
    marginTop:100
  
    
  },
  buttontext: {
    fontSize: 20,
    color: "#fff",
  },
})

export default AuthScreen