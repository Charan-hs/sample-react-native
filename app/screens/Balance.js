import React, { useContext, useState ,useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import PayuMoney, { HashGenerator } from "react-native-payumoney";

import { AuthContext } from "../auth/context";
import AppTextInput from "../components/AppTextInput";
import Screen from "../components/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import Paytm from '@philly25/react-native-paytm';
import { postApi } from "../api/api";


function Balance() {
  const { user , setUser} = useContext(AuthContext);
  const [balance, setBalance] = useState();


  const getUserDetails = async () => {
    const userDetails = await postApi("api/getDetails");
    if (userDetails.data) setUser(userDetails.data);
  };


  useEffect( () => {
    Paytm.addListener(Paytm.Events.PAYTM_RESPONSE, onPayTmResponse);

    return () => Paytm.removeListener(Paytm.Events.PAYTM_RESPONSE, onPayTmResponse);
  },[])

const onPayTmResponse = (data) => {
  console.log(data)
  if(data.status === 'Success') {
    Toast.show({
      type: "success",
      text1: "Added  successfully",
    });
updatebalance(data.TXNAMOUNT);
  }else {
    Toast.show( {type: "error",
    text1: "somthing went wrong"})
  }
}
 
// mode: 'Staging' | 'Production';
// MID: string;
// INDUSTRY_TYPE_ID: string;
// WEBSITE: string;
// CHANNEL_ID: string;
// TXN_AMOUNT: string;
// ORDER_ID: string;
// CUST_ID: string;
// CHECKSUMHASH: string;
// CALLBACK_URL: string;

const payTmOrderProcess = (data) => {
  console.log(data)
  const details = {
    mode: 'Staging', // 'Staging' or 'Production'
    MID: data.MID,
    INDUSTRY_TYPE_ID: data.INDUSTRY_TYPE_ID,
    WEBSITE: data.WEBSITE,
    CHANNEL_ID: data.CHANNEL_ID,
    TXN_AMOUNT: data.TXN_AMOUNT,
    ORDERID: data.ORDER_ID,
    ORDER_ID: data.ORDER_ID,
    CUST_ID: data.CUST_ID,
    CHECKSUMHASH: data.checksum,
    CALLBACK_URL: data.CALLBACK_URL,
  };
  Paytm.startPayment(details);
};

  // const payUMoney = async () => {
  //   let hashData = {
  //     key: "QylhKRVd",
  //     amount: "10.0",
  //     email: "charanengg08@gmail.com",
  //     txnId: "1594976828726",
  //     productName: "product_info",
  //     firstName: "firstname",
  //     salt: "seVTUgzrgE",
  //   };
  //   const payData = {
  //     amount: hashData.amount,
  //     txnId: hashData.txnId,
  //     productName: hashData.productName,
  //     firstName: hashData.firstName,
  //     email: hashData.email,
  //     phone:'8792306877',
  //     merchantId: '5960507',
  //     key: hashData.key,
  //     successUrl: "https://www.payumoney.com/mobileapp/payumoney/success.php",
  //     failedUrl: "https://www.payumoney.com/mobileapp/payumoney/failure.php",
  //     isDebug: true,
  //     hash: HashGenerator(hashData),
  //   };

  //   console.log(payData);
  //   PayuMoney(payData)
  //     .then((data) => {
  //       // Payment Success
  //       updatebalance(b);
  //       console.log("suuu", data);
  //     })
  //     .catch((err) => {
  //       // Payment Failed
  //       console.log("err", err);
  //       Toast.show({
  //         type: "error",
  //         text1: "payment Request Rejected",
  //       });
  //     });
  // };

  const updatebalance = async (b) => {
    const rsp = await postApi("api/updatebalance", { amount: b });
    if (rsp.message === "Accepeted") {
      getUserDetails()
      Toast.show({
        type: "success",
        text1: "Added  successfully",
      });

    } else {
      Toast.show({
        type: "error",
        text1: "somthing went wrong",
      });
    }
    setBalance();
  };

  const handleSubmit = async () => {
    // payUMoney();
    const resp = await postApi('api/createpaytm' , {amount : balance})
    if(resp.data) {

      payTmOrderProcess(resp.data)
    }
  };
  return (
    <Screen>
      <View style={styles.container}>
        <View>
          <View style={[styles.mainCardView, styles.height40]}>
            <View style={styles.balancecon}>
              <Text style={styles.text1}>Current Balace</Text>
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="currency-inr"
                  size={20}
                  color="gray"
                  style={styles.icon}
                />
                <Text style={styles.text1}>{user?.userDetails?.balance}</Text>
              </View>
            </View>
          </View>
          <View style={styles.mainCardView}>
            <Text>Update Balance</Text>
            <View style={{ flex: 1, justifyContent: "space-around" }}>
              <AppTextInput
                onChangeText={(e) => setBalance((x) => e)}
            
                icon="currency-inr"
                placeholder="Enter Amount"
                value={balance}
              ></AppTextInput>
              <View>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttontext}>Add To Wallet</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  mainCardView: {
    height: 250,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: "column",
    // justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
    paddingTop: 10,
  },
  balancecon: {
    flexDirection: "row",
    // backgroundColor: "green",

    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  text1: {
    fontSize: 20,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#151D3B",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    // padding: 15,
    width: "100%",
    marginVertical: 10,
    // elevation: 10,
  },
  buttontext: {
    fontSize: 16,
    color: "#fff",
  },
  height40: {
    height: 60,
  },
  icon: {
    marginTop: 4,
  },
});
export default Balance;
