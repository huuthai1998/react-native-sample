import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { Text, View, StyleSheet, Alert, TextInput, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../constant/Colors";
import { setSelectedToken } from "../store/reducers/tokenReducer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#1B1D24",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.button,
    color: "white",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    height: 40,
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
    marginTop: 10,
    backgroundColor: Colors.input,
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
  label: {
    color: Colors.label,
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
    marginTop: 20,
  },
});

function AddPositionScreen() {
  const { walletId } = useSelector((state) => state.auth);
  const { selectedToken } = useSelector((state) => state.token);
  const navigation = useNavigation();
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();

  const onChangeHandler = () => (value) => {
    setAmount(parseFloat(value, 10));
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleAddToken = async () => {
    try {
      const { data } = await axios.post(
        `/api/v1/wallet/${walletId}/${selectedToken.symbol}/position`,
        {
          amount,
        },
      );

      dispatch(
        setSelectedToken({
          selectedToken: {
            ...selectedToken,
            positions: [
              ...selectedToken.positions,
              { amount, id: data.data.ID, createdAt: data.data.CreatedAt },
            ],
          },
        }),
      );
      // alert(`Successfully added ${token} to your wallet!`);
      Alert.alert("Success", `Successfully added ${amount} tokens of ${selectedToken.symbol}!`, [
        { text: "OK", onPress: goBack },
      ]);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Add new token to your wallet</Text>
      <Text style={styles.label}>Token symbol</Text>
      <View style={styles.textInputWrapper}>
        <TextInput
          pointerEvents="none"
          value={selectedToken.symbol}
          editable={false}
          selectTextOnFocus={false}
          style={styles.textInput}
        />
      </View>
      <Text style={styles.label}>Amount</Text>
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
    </SafeAreaView>
  );
}

export default AddPositionScreen;
