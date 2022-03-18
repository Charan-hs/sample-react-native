import React , {useContext} from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

import Screen from "../components/Screen";
import { AuthContext } from "../auth/context";

// const DATA = [
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     title: "First Item",
//     email:'sample@sample.com',
//     type:'receive',
//     amount:122
//   },
//   {
//     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//     title: "Second Item",
//     email:'sample@sample.com',
//     type:'receive',
//     amount:122
//   },
//   {
//     id: "58694a0f-3da1-471f-bd96-145571e29d72",
//     title: "Third Item",
//     email:'sample@sample.com',
//     type:'sent',
//     amount:122
//   },
// ];


const Item = ({ email , type , amount }) => (
    <View style={styles.item}>
        <View>

        <Text>{type === 'receive' ? 'Received from': 'Sent to '}</Text>
      <Text >{email}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <MaterialCommunityIcons
          name='currency-inr'
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
            <Text>{amount}</Text>
        </View>
    </View>
  );


function Transactions() {
  const {user} = useContext(AuthContext)

    const renderItem = ({ item }) => (
        <Item email={item.email} type={item.type} amount={item.amount} />
      );


  return (
    <Screen>
        <View style={styles.container}>

    
<Text style={{fontSize:20,marginBottom:10}}>All Transactions</Text>
      <FlatList
        data={user?.userDetails?.transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
     
        </View>
    </Screen>
  );
}

const styles = StyleSheet.create({container: {
    // flex: 1,
     

    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
    paddingTop:10,
    paddingBottom:10
    
  },
  item: {
    flexDirection:'row',
    justifyContent: 'space-between',
    marginBottom:3,
    marginTop:10,
    borderBottomWidth:0.3,
    borderBottomColor:'gray',
    paddingBottom:10,
    


  
  },
  title: {
    fontSize: 18,
  },});
export default Transactions;
