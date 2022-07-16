import { Picker, PickerIOS } from "@react-native-picker/picker";
import axios from "axios";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, Alert, Platform, TextInput, TouchableOpacity } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import {  } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Modal from "react-native-modal";
import TokenCodes from "../constant/TokenCodes";
import Colors from "../constant/Colors";
import AppScreens from "../constant/AppScreens";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#1B1D24",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#029973",
    color: "white",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    height: 40,
  },
  text: {
    color: "white",
  },
  label: {
    color: Colors.label,
    fontSize: 15,
    fontWeight: "400",
    marginRight: 10,
    padding: 15,
  },
  textInput: {
    height: 50,
    color: "white",
  },
  textInputWrapper: {
    marginTop: 20,
    backgroundColor: Colors.input,
    height: 50,
    borderRadius: 8,
    flexDirection: "row",
  },
  modalNavbar: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
  modalNavbarText: {
    fontSize: 19,
    fontWeight: "500",
    color: "#16CEB9",
  },
});

function renderItems() {
  if (Platform.OS === "ios") {
    return TokenCodes.map((item) => (
      <PickerIOS.Item label={item.code} value={item.name} key={item.code} color="white" />
    ));
  }
  return TokenCodes.map((item) => (
    <Picker.Item label={item.code} value={item.name} key={item.code} />
  ));
}

function AddTokenScreen() {
  const { walletId } = useSelector((state) => state.auth);
  const [showPicker, setShowPicker] = useState(false);
  const [token, setToken] = useState("");
  const [symbol, setSymbol] = useState("");
  const navitgator = useNavigation();

  const handleChoose = () => {
    setShowPicker(false);
  };

  const handleAddToken = async () => {
    try {
      await axios.post(`/api/v1/wallet/${walletId}/token`, {
        name: token,
        symbol,
      });
      console.log("Add token!");
      return true;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  };

  const onAddToken = async () => {
    const message = await handleAddToken();
    if (message === false) {
      Alert.alert("Can not add!", [{ text: "OK", style: "cancel" }]);
    } else {
      Alert.alert("Success", "Successfully added token to your wallet", [
        { text: "OK", onPress: () => navitgator.navigate(AppScreens.WALLET_SCREEN) },
      ]);
    }
  };

  const handleShowPicker = () => {
    setShowPicker(true);
  };

  const closePicker = () => {
    setShowPicker(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Add new token to your wallet</Text>
      <TouchableOpacity onPress={handleShowPicker} style={styles.textInputWrapper}>
        <Text style={styles.label}>Code:</Text>
        <TextInput
          pointerEvents="none"
          value={symbol}
          style={styles.textInput}
          editable={false}
          selectTextOnFocus={false}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.textInputWrapper} disabled>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          pointerEvents="none"
          value={token}
          style={styles.textInput}
          editable={false}
          selectTextOnFocus={false}
        />
      </TouchableOpacity>

      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={onAddToken} style={styles.button}>
          <Text style={styles.text}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showPicker}
        style={{ justifyContent: "flex-end", margin: 0 }}
        onBackdropPress={closePicker}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              height: "35%",
              marginTop: "auto",
              backgroundColor: Colors.card,
            }}
          >
            <View style={styles.modalNavbar}>
              <TouchableOpacity onPress={closePicker}>
                <Text style={styles.modalNavbarText}> </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleChoose}>
                <Text style={styles.modalNavbarText}>Choose</Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={token}
              onValueChange={(itemValue) => {
                setToken(itemValue);
                setSymbol(
                  TokenCodes.find((i) => i.name === itemValue)
                    ? TokenCodes.find((i) => i.name === itemValue).code
                    : "",
                );
              }}
            >
              {Platform.OS === "ios" ? (
                <PickerIOS.Item label="" value="" key="null" color="white" />
              ) : (
                <Picker.Item label="" value="" key="null" />
              )}
              {renderItems()}
            </Picker>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default AddTokenScreen;
