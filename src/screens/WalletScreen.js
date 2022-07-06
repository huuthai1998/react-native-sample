import Config from "react-native-config";
import React, { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  // ScrollView,
  Text,
  View,
  Pressable,
} from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import SwipeableFlatList from "react-native-swipeable-list";
import CardToken from "../components/CardToken";
import Colors from "../constant/Colors";
import AppScreens from "../constant/AppScreens";
import { setWalletId } from "../store/reducers/authReducer";
import { setSelectedToken } from "../store/reducers/tokenReducer";
import cryptoAxiosInstance from "../cryptoAxiosInstance";

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  totalEvaluation: {
    marginBottom: 5,
    paddingLeft: 10,
  },
  totalTitle: {
    color: Colors.label,
    fontSize: 16,
    fontWeight: "600",
  },
  totalMoney: {
    color: "white",
    fontWeight: "500",
    fontSize: 25,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  errorTitle: {
    color: "white",
    fontSize: 30,
    marginBottom: 10,
  },
  errorSubTitle: {
    color: "white",
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "700",
  },
  qaContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    opacity: 0.87,
  },
  button1Text: {
    color: "#BB86FC",
  },
  button2Text: {
    color: "#03DAC6",
  },
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: Colors.background,
  },
  itemSeparator: {
    // height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.background,
    opacity: 0.67,
  },
});

const extractItemKey = (item) => {
  item.id.toString();
};

function renderItemSeparator() {
  return <View style={styles.itemSeparator} />;
}

function QuickActions(item, addPositionTokenHandler, deleteTokenHandler) {
  return (
    <View style={styles.qaContainer}>
      <View style={[styles.button]}>
        <Pressable onPress={addPositionTokenHandler(item)}>
          <Text style={[styles.buttonText, styles.button1Text]}>
            Add position
          </Text>
        </Pressable>
      </View>
      <View style={[styles.button]}>
        <Pressable onPress={deleteTokenHandler(item)}>
          <Text style={[styles.buttonText, styles.button2Text]}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

function WalletScreen() {
  const navigation = useNavigation();
  const { walletId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [tokens, setTokens] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [prices, setPrices] = useState({});
  const [totalMoney, setTotalMoney] = useState(0);

  const fetchPrices = async () => {
    const promises = tokens.map((token) => cryptoAxiosInstance.get(
      `/price?fsym=${token.symbol}&tsyms=USD&api_key=${Config.CRYPTO_API_KEY}`,
    ));
    const response = await Promise.all(promises);
    const data = {};
    response.forEach((res, i) => {
      data[tokens[i].symbol] = res.data.USD;
    });
    setPrices(data);
  };

  useEffect(() => {
    fetchPrices();
  }, [tokens]);

  useEffect(() => {
    let money = 0;
    tokens.forEach((token) => {
      money += prices[token.symbol] * token.positions.reduce(
        (prev, cur) => prev + parseFloat(cur.amount, 10),
        0,
      );
    });
    setTotalMoney(money);
  }, [prices]);

  const selectTokenHandler = (item) => () => {
    dispatch(setSelectedToken({ selectedToken: item }));
    navigation.navigate(AppScreens.TOKEN_DETAIL_SCREEN);
  };

  const deleteTokenHandler = (item) => async () => {
    const { data } = await axios.post(
      `/api/v1/wallet/${walletId}/token/delete`,
      { id: item.id },
    );
    console.log(data);
    setTokens(tokens.filter((token) => token.id !== item.id));
  };

  const addPositionTokenHandler = (item) => () => {
    dispatch(setSelectedToken({ selectedToken: item }));
    navigation.navigate(AppScreens.ADD_POSITION_SCREEN);
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

  //  prettier-ignore
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        {!errorMessage ? (
          <>
            <View style={styles.totalEvaluation}>
              <Text style={styles.totalTitle}>Total Evaluation:</Text>
              <Text style={styles.totalMoney}>
                {totalMoney ? totalMoney.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                }) : "$0.00"}
              </Text>
            </View>
            {tokens && tokens.length > 0 ? (
              <SwipeableFlatList
                keyExtractor={extractItemKey}
                data={tokens}
                renderItem={({ item }) => (
                  <Pressable onPress={selectTokenHandler(item)}>
                    <CardToken
                      key={item.id}
                      id={item.id}
                      symbol={item.symbol}
                      name={item.name}
                      amount={item.positions.reduce(
                        (prev, cur) => prev + parseFloat(cur.amount, 10),
                        0,
                      )}
                      // src={tokenIcons[token.symbol]}
                      src=""
                    />
                  </Pressable>
                )}
                maxSwipeDistance={160}
                renderQuickActions={({ item }) => QuickActions(
                  item,
                  addPositionTokenHandler,
                  deleteTokenHandler,
                )}
                contentContainerStyle={styles.contentContainerStyle}
                // shouldBounceOnMount={true}
                ItemSeparatorComponent={renderItemSeparator}
              />
            ) : (
              <Text>There&apos;s no data available.</Text>
            )}
          </>
        ) : (
          <>
            <Text style={styles.errorTitle}>Oops!</Text>
            <Text style={styles.errorSubTitle}>There&apos;s an error.</Text>
            <Text style={{ color: "#727A82" }}>{errorMessage}</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

export default WalletScreen;
