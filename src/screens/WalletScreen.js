/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import Config from "react-native-config";
import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, StyleSheet, Text, View, Pressable, Alert } from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import SwipeableFlatList from "react-native-swipeable-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import CardToken from "../components/CardToken";
import Colors from "../constant/Colors";
import AppScreens from "../constant/AppScreens";
import { setWalletId } from "../store/reducers/authReducer";
import { setSelectedToken } from "../store/reducers/tokenReducer";
import cryptoAxiosInstance from "../cryptoAxiosInstance";
import TokenIcons from "../constant/TokenIcons";

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  header: {
    marginBottom: 5,
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalTitle: {
    color: Colors.label,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  totalMoney: {
    color: "white",
    fontWeight: "500",
    fontSize: 25,
  },
  updateTitle: {
    color: Colors.label,
    fontSize: 13,
    marginBottom: 5,
    textAlign: "right",
  },
  updateTime: {
    color: "white",
    fontSize: 15,
    textAlign: "right",
  },
  timeSection: {
    padding: 10,
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
  button1: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.borderCard,
    borderWidth: 1,
    marginVertical: 5,
  },
  button2: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.borderCard,
    borderWidth: 1,
    marginVertical: 5,
    marginRight: 5,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
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

function renderItemSeparator() {
  return <View style={styles.itemSeparator} />;
}

function QuickActions(item, addPositionTokenHandler, onDeleteToken) {
  return (
    <View style={styles.qaContainer}>
      <Pressable onPress={addPositionTokenHandler(item)} style={styles.button1}>
        <FontAwesomeIcon icon={faPlus} color="white" />
      </Pressable>
      <Pressable onPress={onDeleteToken(item)} style={styles.button2}>
        <FontAwesomeIcon icon={faTrashCan} color="white" />
      </Pressable>
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
    const promises = tokens.map((token) =>
      cryptoAxiosInstance.get(
        `/price?fsym=${token.symbol}&tsyms=USD&api_key=${Config.CRYPTO_API_KEY}`,
      ),
    );

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
      money +=
        prices[token.symbol] *
        token.positions.reduce((prev, cur) => prev + parseFloat(cur.amount, 10), 0);
    });
    setTotalMoney(money);
  }, [prices]);

  const selectTokenHandler = (item) => () => {
    dispatch(setSelectedToken({ selectedToken: item }));
    navigation.navigate(AppScreens.TOKEN_DETAIL_SCREEN);
  };

  const deleteTokenHandler = (item) => async () => {
    await axios.post(`/api/v1/wallet/${walletId}/token/delete`, { id: item.id });
    console.log("Delete token!");
    setTokens(tokens.filter((token) => token.id !== item.id));
  };

  const onDeleteToken = (item) => () => {
    Alert.alert("Warning", "Are your sure you want to delete this token?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: deleteTokenHandler(item) },
    ]);
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

  const getDate = () => {
    const datetime = moment().format("DD/MM/YYYY, hh:mm");
    return datetime;
  };

  //  prettier-ignore
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        {!errorMessage ? (
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.totalTitle}>Total Evaluation:</Text>
                <Text style={styles.totalMoney}>
                  {totalMoney ? totalMoney.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  }) : "$0.00"}
                </Text>
              </View>
              <View style={styles.timeSection}>
                <Text style={styles.updateTitle}>Updated at:</Text>
                <Text style={styles.updateTime}>{getDate()}</Text>
              </View>
            </View>
            {tokens && tokens.length > 0 ? (
              <SwipeableFlatList
                keyExtractor={(item) => item.id}
                data={tokens}
                renderItem={({ item }) => (
                  <Pressable onPress={selectTokenHandler(item)} key={item.id}>
                    <CardToken
                      id={item.id}
                      symbol={item.symbol}
                      name={item.name}
                      amount={item.positions.reduce(
                        (prev, cur) => prev + parseFloat(cur.amount, 10),
                        0,
                      )}
                      price={prices[item.symbol] ? prices[item.symbol] : 0}
                      src={TokenIcons[item.symbol]}
                    />
                  </Pressable>
                )}
                maxSwipeDistance={140}
                renderQuickActions={({ item }) => QuickActions(
                  item,
                  addPositionTokenHandler,
                  onDeleteToken,
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
