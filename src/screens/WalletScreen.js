// import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from "react-native";
import axios from "axios";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CardToken from "../components/CardToken";
import { setWalletId } from "../store/reducers/authReducer";
import { setSelectedToken } from "../store/reducers/tokenReducer";
import AppScreens from "../constant/AppScreens";

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#1B1D24",
    flex: 1,
  },
  title: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  errorTitle: {
    fontSize: 30,
    marginBottom: 10,
  },
  errorSubTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "700",
  },
});

function WalletScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [tokens, setTokens] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const selectTokenHandler = (item) => () => {
    dispatch(setSelectedToken({ selectedToken: item }));
    navigation.navigate(AppScreens.TOKEN_DETAIL_SCREEN);
  };

  const getWalletData = async () => {
    try {
      const { data } = await axios.get("/api/v1/wallet", {
        headers: { Accept: "application/json" },
      });
      setTokens(data.wallet.tokens);
      dispatch(setWalletId({ walletId: data.wallet.ID }));
    } catch (error) {
      setErrorMessage(`${error}`);
    }
  };

  useEffect(() => {
    getWalletData();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        {!errorMessage ? (
          <>
            {/* <Text style={styles.title}>Your Wallet</Text> */}
            {tokens && tokens.length > 0 ? (
              <ScrollView>
                {tokens.map((token) => (
                  <CardToken
                    onPress={selectTokenHandler(token)}
                    key={token.id}
                    id={token.id}
                    symbol={token.symbol}
                    name={token.name}
                    // src={tokenIcons[token.symbol]}
                  />
                ))}
              </ScrollView>
            ) : (
              <Text>There&apos;s no data available.</Text>
            )}
          </>
        ) : (
          <>
            <Text style={styles.errorTitle}>Oops!</Text>
            <Text style={styles.errorSubTitle}>There&apos;s an error.</Text>
            <Text>{errorMessage}</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

export default WalletScreen;
