import { Picker, PickerIOS } from "@react-native-picker/picker";
import axios from "axios";
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Modal from "react-native-modal";
import tokenList from "../symbol.json";

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
  },
  text: {
    color: "white",
  },
  textInput: {
    padding: 5,
    paddingLeft: 20,
    height: 50,
    color: "white",
  },
  textInputWrapper: {
    marginTop: 20,
    backgroundColor: "rgba(116, 116, 128, 0.4)",
    height: 50,
    borderRadius: 8,
  },
  modalNavbar: {
    flex: 1,
    height: 40,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    padding: 20,
  },
  modalNavbarText: {
    fontSize: 19,
    color: "blue",
  },
});

function renderItems() {
  return tokenList.map((item) => (
    <PickerIOS.Item label={item.code} value={item.code} key={item.code} />
  ));
}

function AddPositionScreen() {
  const { walletId } = useSelector((state) => state.auth);
  const [showPicker, setShowPicker] = useState(false);
  const [amount, setAmount] = useState(0);
  const [symbol, setSymbol] = useState("");

  const onChangeHandler = () => (value) => {
    setAmount(parseInt(value, 10));
  };
  const handleChoose = () => {
    setShowPicker(false);
  };

  const handleAddToken = async () => {
    try {
      await axios.post(`/api/v1/wallet/${walletId}/${symbol}/position`, {
        amount,
      });
      // alert(`Successfully added ${token} to your wallet!`);
    } catch (err) {
      console.log(err.message);
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
      <TouchableOpacity
        onPress={handleShowPicker}
        style={styles.textInputWrapper}
      >
        <TextInput
          pointerEvents="none"
          value={symbol}
          style={styles.textInput}
          editable={false}
          selectTextOnFocus={false}
        />
      </TouchableOpacity>
      <View style={styles.textInputWrapper}>
        <TextInput
          keyboardType="number-pad"
          onChangeText={onChangeHandler("amount")}
          style={styles.textInput}
        />
      </View>
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={handleAddToken} style={styles.button}>
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
              backgroundColor: "#FFFFFF",
            }}
          >
            <View style={styles.modalNavbar}>
              <TouchableOpacity onPress={closePicker}>
                <Text style={styles.modalNavbarText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleChoose}>
                <Text style={styles.modalNavbarText}>Choose</Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={symbol}
              onValueChange={(itemValue) => setSymbol(itemValue)}
            >
              {renderItems()}
            </Picker>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default AddPositionScreen;
