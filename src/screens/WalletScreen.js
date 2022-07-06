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
import { useDispatch } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import SwipeableFlatList from "react-native-swipeable-list";
import CardToken from "../components/CardToken";
import Colors from "../constant/Colors";
import AppScreens from "../constant/AppScreens";
import { setWalletId } from "../store/reducers/authReducer";

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  totalEvaluation: {
    marginBottom: 5,
    paddingLeft: 10,
    // flexDirection: "row",
    // justifyContent: "space-between",
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

const deleteToken = (id) => {
  console.log("Delete ", id);
};

const addPositionScreen = (id) => {
  console.log("Add position ", id);
};

function QuickActions(index, { id }) {
  return (
    <View style={styles.qaContainer}>
      <View style={[styles.button]}>
        <Pressable onPress={() => addPositionScreen(id)}>
          <Text style={[styles.buttonText, styles.button1Text]}>Add position</Text>
        </Pressable>
      </View>
      <View style={[styles.button]}>
        <Pressable onPress={() => deleteToken(id)}>
          <Text style={[styles.buttonText, styles.button2Text]}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

function WalletScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [tokens, setTokens] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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

  const toDetails = () => {
    navigation.navigate(AppScreens.TOKEN_DETAIL_SCREEN);
  };

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
              <Text style={styles.totalMoney}>0.00 $</Text>
            </View>
            {tokens && tokens.length > 0 ? (
              <SwipeableFlatList
                keyExtractor={extractItemKey}
                data={tokens}
                renderItem={({ item }) => (
                  <Pressable onPress={toDetails}>
                    <CardToken
                      key={item.id}
                      id={item.id}
                      symbol={item.symbol}
                      name={item.name}
                      // src={tokenIcons[token.symbol]}
                      src=""
                    />
                  </Pressable>
                )}
                maxSwipeDistance={240}
                renderQuickActions={({ index, item }) => QuickActions(index, item)}
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
