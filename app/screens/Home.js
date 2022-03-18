import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { postApi } from "../api/api";
import AppTextInput from "../components/AppTextInput";
import Screen from "../components/Screen";
import { AuthContext } from "../auth/context";
import Toast from "react-native-toast-message";
import storage from "../auth/storage";

function Home() {
  const [details, setDetails] = useState({ reciverEmail: "", amount: "" });
  const { user, setUser } = useContext(AuthContext);
  const onChange = (name, value) => {
    setDetails((x) => ({ ...x, [name]: value }));
  };
  const logOut = () => {
    storage.removeToken();
    setUser();
  };
  const getUserDetails = async () => {
    const userDetails = await postApi("api/getDetails");
    if (userDetails.data) setUser(userDetails.data);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleSubmit = async () => {
    const senderEmail = user.userDetails.email;

    const data = { ...details, senderEmail };

    const resp = await postApi("api/transaction", data);

    console.log(resp.message);

    if (resp.message === "Successfully amount transfered ") {
      Toast.show({
        type: "success",
        text1: "Amount sent successfully",
      });
      setDetails({ reciverEmail: "", amount: "" });
      getUserDetails()
    } else {
      Toast.show({
        type: "error",
        text1: "somthing went wrong",
      });
    }
  };
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.mainCardView}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.subCardView}>
              <Image
                source={require("../assets/avatar.webp")}
                resizeMode="contain"
                style={{
                  borderRadius: 25,
                  height: 50,
                  width: 50,
                }}
              />
            </View>
            <View style={{ marginLeft: 12 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#000",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {"Hi, Welcome"}
              </Text>
              <View
                style={{
                  marginTop: 4,
                  borderWidth: 0,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "gray",
                    fontSize: 12,
                  }}
                >
                  {user?.userDetails?.email}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderWidth: 0,

              marginLeft: -26,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
            }}
          >
            <TouchableOpacity onPress={logOut}>
              <Text style={{ color: "blue" }}>{"Log out"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sendermain}>
          <View style={styles.senderContainer}>
            <Text>Send money to user</Text>
            <AppTextInput
              value={details.reciverEmail}
              onChangeText={(e) => onChange("reciverEmail", e)}
              keyboardtype={"email-address"}
              style={styles.input}
              icon="email"
              placeholder="Email"
            ></AppTextInput>
            <AppTextInput
              value={details.amount}
              onChangeText={(e) => onChange("amount", e)}
              keyboardtype={"numeric"}
              icon="currency-inr"
              placeholder="Enter Amount"
            ></AppTextInput>

            <View>
              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttontext}>Send</Text>
              </TouchableOpacity>
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
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,

    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
  },
  sendermain: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  senderContainer: {
    flex: 1,
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
  input: {},
});

export default Home;
