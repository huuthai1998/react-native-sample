import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCoins, faExchange } from "@fortawesome/free-solid-svg-icons";
import Colors from "../constant/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderColor: Colors.borderCard,
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    padding: 10,
    paddingBottom: 5,
  },
  main: {
    flexDirection: "row",
  },
  amount: {
    color: "#FFDD00",
    marginRight: 10,
    textAlign: "right",
  },
  exchangeRate: {
    color: "#8AC135",
    marginRight: 10,
    textAlign: "right",
  },
  content: {
    flexDirection: "column",
    marginLeft: 10,
  },
  contentLine: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 5,
  },
  name: {
    color: Colors.subtitle,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "white",
  },
});

function CardToken({ id, symbol, name, amount, src = "", price = 0 }) {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Image source={src} style={styles.image} title={id} />
        <View style={styles.content}>
          <Text style={styles.title}>{symbol}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
      <View>
        <View style={styles.contentLine}>
          <Text style={styles.exchangeRate}>
            {price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Text>
          <FontAwesomeIcon icon={faExchange} color={Colors.label} size={13} />
        </View>
        <View style={[styles.contentLine, { paddingTop: 10 }]}>
          <Text style={styles.amount}>{amount % 1 === 0 ? amount : amount.toFixed(2)}</Text>
          <FontAwesomeIcon icon={faCoins} color={Colors.label} size={13} />
        </View>
        {/* <View style={styles.contentLine}>
          <Text style={styles.amountText}>Evaluation</Text>
          <Text style={styles.amount}>
            {(price * amount).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Text>
        </View> */}
      </View>
    </View>
  );
}

CardToken.propTypes = {
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  src: PropTypes.node.isRequired,
};

export default CardToken;
