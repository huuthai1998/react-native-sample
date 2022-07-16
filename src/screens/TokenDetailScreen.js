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
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { setSelectedToken } from "../store/reducers/tokenReducer";
import cryptoAxiosInstance from "../cryptoAxiosInstance";
import Colors from "../constant/Colors";

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.background,
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
    backgroundColor: "black",
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
    backgroundColor: Colors.card,
    borderColor: Colors.borderCard,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  cardText: {
    color: "white",
  },
  cardButton: {
    padding: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  evaluation: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
});

const dateFormatter = (date) => {
  const formatDate = moment(date).format("DD/MM/YYYY, hh:mm");
  return formatDate;
};

function TokenDetailScreen() {
  const dispatch = useDispatch();
  const { selectedToken } = useSelector((state) => state.token);
  const { walletId } = useSelector((state) => state.auth);

  const [price, setPrice] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const fetchValue = async () => {
    const { data } = await cryptoAxiosInstance.get(
      `/price?fsym=${selectedToken.symbol}&tsyms=USD&api_key=${Config.CRYPTO_API_KEY}`,
    );
    setPrice(data.USD);
    //  prettier-ignore
    setTotalValue(
      price * selectedToken.positions.reduce(
        (prev, cur) => prev + parseFloat(cur.amount, 10),
        0,
      ),
    );
  };

  useEffect(() => {
    fetchValue();
  }, [selectedToken]);

  useEffect(() => {
    setTotalValue(
      price * selectedToken.positions.reduce((prev, cur) => prev + parseFloat(cur.amount, 10), 0),
    );
  }, [price]);

  const handleDeletePosition = (id) => async () => {
    try {
      await axios.post(`/api/v1/wallet/${walletId}/${selectedToken.symbol}/position/delete`, {
        id,
      });
      dispatch(
        setSelectedToken({
          selectedToken: {
            ...selectedToken,
            positions: selectedToken.positions.filter((pos) => pos.id !== id),
          },
        }),
      );
      // prettier-ignore
      setTotalValue(
        price * selectedToken.positions
          .filter((pos) => pos.id !== id)
          .reduce((prev, cur) => prev + parseFloat(cur.amount, 10), 0),
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTotalValue(
      price * selectedToken.positions.reduce((prev, cur) => prev + parseFloat(cur.amount, 10), 0),
    );
  }, [selectedToken]);

  const onDeletePosition = (id) => () => {
    Alert.alert("Warning", "Are your sure you want to delete this position?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: handleDeletePosition(id) },
    ]);
  };

  function renderPosition() {
    return selectedToken.positions.map((pos) => (
      <View style={styles.card} key={pos.id}>
        <View>
          <Text style={styles.cardText}>{`Amount: ${pos.amount}`}</Text>
          <Text style={styles.cardText}>{`Bought on: ${dateFormatter(pos.createdAt)}`}</Text>
        </View>
        <TouchableOpacity onPress={onDeletePosition(pos.id)} style={styles.cardButton}>
          <FontAwesomeIcon icon={faCircleXmark} color="#D2042D" size={20} />
        </TouchableOpacity>
      </View>
    ));
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.content}>
        <View style={styles.detailWrapper}>
          <View>
            <Text style={styles.text}>{`Symbol: ${selectedToken.symbol}`}</Text>
            <Text style={styles.text}>{`Name: ${selectedToken.name}`}</Text>
            <Text style={styles.text}>{`Description: ${selectedToken.description}`}</Text>
          </View>
          <View>
            <Text style={styles.evaluation}>
              {`${totalValue.toLocaleString("en-US", {
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
