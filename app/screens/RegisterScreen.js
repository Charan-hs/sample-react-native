import React , {useState ,useContext} from 'react'
import { Text,StyleSheet,View ,TouchableOpacity} from 'react-native'
import { postApi } from '../api/api'
import {useAuth} from '../auth/useAuth'
import Toast from 'react-native-toast-message';
import AppTextInput from '../components/AppTextInput'
import Screen from '../components/Screen'
import { AuthContext } from '../auth/context';

function RegisterScreen(props) {
  const [details , setDetails] = useState({email: "" , password: ""})
 const auth = useAuth()
 const {  setUser } = useContext(AuthContext);

 const getUserDetails = async () => {
   const userDetails = await postApi("api/getDetails");
   if (userDetails.data) setUser(userDetails.data);
 };

  const onChange = (name , value) => {
    setDetails(x => ({...x , [name]: value}))
  }
  const handleSubmit = async () => {

    const resp = await postApi('api/create', details)

    if(resp.data) {
auth.logIn(resp.data.jwt)
getUserDetails()
Toast.show({
  type: 'success',
  text1: 'registerd successfully',
});
    }else { 
      Toast.show({
        type: 'error',
        text1: 'somthing went wrong',
    
      });
    }
  }
  return (
    <Screen>
      <Text style={styles.text}>Register</Text>
      <AppTextInput onChangeText={(e) => onChange( 'email',e)} icon='email' placeholder="Email"></AppTextInput>
      <AppTextInput onChangeText={(e) => onChange( 'password',e)} secureTextEntry={true} icon='lock' type='password' placeholder="Password"></AppTextInput>

      <View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
<Text style={styles.buttontext}>Register</Text>
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

export default RegisterScreen