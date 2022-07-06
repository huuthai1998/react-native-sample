// import { useNavigation } from "@react-navigation/native";
import Config from "react-native-config";
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
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { setSelectedToken } from "../store/reducers/tokenReducer";
import cryptoAxiosInstance from "../cryptoAxiosInstance";

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#1B1D24",
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
    backgroundColor: "#029973",
    borderWidth: 2,
    width: "100%",
    padding: 10,
    borderTopStartRadius: 20,
    borderTopRightRadius: 20,
  },
  detailWrapper: {
    padding: 10,
    flex: 0.2,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

const dateFormatter = (date) => {
  const formatDate = new Date(date);
  return `${formatDate.getDate()}/${formatDate.getMonth()}/${formatDate.getFullYear()} ${formatDate.getHours()}:${formatDate.getMinutes()}`;
};

function TokenDetailScreen() {
  const dispatch = useDispatch();
  const { selectedToken } = useSelector((state) => state.token);

  const [totalValue, setTotalValue] = useState(0);

  const fetchValue = async () => {
    const { data } = await cryptoAxiosInstance.get(
      `/price?fsym=${selectedToken.symbol}&tsyms=USD&api_key=${Config.CRYPTO_API_KEY}`,
    );
    setTotalValue(
      // eslint-disable-next-line operator-linebreak
      data.USD *
        selectedToken.positions.reduce(
          (prev, cur) => prev + parseFloat(cur.amount, 10),
          0,
        ),
    );
  };
  useEffect(() => {
    fetchValue();
  }, []);

  const handleDeletePosition = (id) => async () => {
    try {
      await axios.post(
        `/api/v1/wallet/2/${selectedToken.symbol}/position/delete`,
        {
          id,
        },
      );
      dispatch(
        setSelectedToken({
          selectedToken: {
            ...selectedToken,
            positions: selectedToken.positions.filter((pos) => pos.id !== id),
          },
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };
  function renderPosition() {
    return selectedToken.positions.map((pos) => (
      <View style={styles.card} key={pos.id}>
        <View>
          <Text>{`Amount: ${pos.amount}`}</Text>
          <Text>{`Bought on: ${dateFormatter(pos.createdAt)}`}</Text>
        </View>
        <TouchableOpacity onPress={handleDeletePosition(pos.id)}>
          <Text style={{ color: "red" }}>REMOVE</Text>
        </TouchableOpacity>
      </View>
    ));
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <View style={styles.detailWrapper}>
          <View>
            <Text style={styles.title}>Detail</Text>
            <Text style={styles.text}>{`Symbol: ${selectedToken.symbol}`}</Text>
            <Text style={styles.text}>{`Name: ${selectedToken.name}`}</Text>
            <Text style={styles.text}>
              {`Description: ${selectedToken.description}`}
            </Text>
          </View>
          <View>
            <Text style={styles.text}>
              {`Total Evaluation: ${totalValue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}`}
            </Text>
          </View>
        </View>
        <ScrollView style={styles.listWrapper}>{renderPosition()}</ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default TokenDetailScreen;
